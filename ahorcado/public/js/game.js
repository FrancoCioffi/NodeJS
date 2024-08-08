import { GetWord } from './api.js';

export class gameStart {
    constructor() {
        this.trys = 4; // Número de intentos
        this.score = 1000; // Puntaje inicial
        this.word = ""; // Palabra a adivinar
    }

    async startGame() {
        try {
            // Genera una palabra hasta que esta tenga 8 letras.
            while (this.word.length !== 8) {
                this.word = await GetWord.generateWord();
            }
            console.log('Palabra:', this.word);

            // Espera a que se introduzca la palabra y se aprete enter.
            document.getElementById('guess').addEventListener('keydown', (event) => {
                if (event.code === 'Enter') {
                    if ( this.trys != 0) {
                        // Llama a la funcion checkGuess para verificar si le pego.
                        const gameWord = this.checkGuess();
                        this.correctLetters(gameWord);
                    }
                }
            });
        } catch (error) {
            console.error('Error', error);
        }
    }
    checkGuess() {
        // Sacamos el valor del input y lo pasamos a upperCase para comparar
        const userGuess = document.getElementById('guess').value.toUpperCase(); 
        if( userGuess.length > 8)
            {
                alert("Se necesita que la palabra tenga 8 o menos letras.")
                return
            }
        if (this.trys === 0){
                // TODO: El jugador perdio.
        }
        else if (this.word.includes(userGuess)){
                // TODO: El jugador gano.
        } else {
            this.trys -= 1
        }
        // Limpia el input para esperar a otro.
        document.getElementById('guess').value = ''; 
        // Cambia la barra de vida.
        const health = document.getElementById('healthBar')
        health.src = '../css/images/vida' + this.trys + '.png'
        return this.indexFinder(this.word,userGuess)
        
    }
    correctLetters(correctInfo)
    {
        const lettersIndex = [0,1,2,3,4,5,6,7]
        const gameWord = correctInfo[0]
        const userGuess = correctInfo[1]
        const lettersContainer = document.getElementById('container')
        
        if (this.trys === 3 || this.trys === 4){    
            // Selecciona cada recuadro dentro de .recuadros (letra)
            const letters = document.querySelectorAll('.letra')
            letters.forEach(function(letra,i){
                if (gameWord.includes(lettersIndex[i])){
                    alert("Funcas")
                }
                if (lettersIndex[i] === gameWord[i]){ // Compara si el index actual esta dentro de gameWord
                    letra.style.backgroundColor = '#0bc230' // Cambia el fondo a verde
                    letra.textContent = userGuess[i] // Añade la letra correcta
                }
                else { // El index actual no fue encontrando en gameWord
                    letra.style.backgroundColor = '#d81511' //Cambia a color rojo
                    letra.textContent = userGuess[i] // Añade la letra incorrecta
                }
                letra.style.width = '40px'
                letra.style.height = '40px'  
            })
        } else {
            // Crea una nueva fila para las nuevas letras
            const newRow = document.createElement('div');
            newRow.classList.add('recuadros'); 
            newRow.style.marginBottom = '10px'; // Cambia 10px al valor deseado
            lettersIndex.forEach((index) => {
                const letra = document.createElement('div');
                letra.classList.add('letra');
                letra.style.width = '40px';
                letra.style.height = '40px';

                if (lettersIndex[index] === gameWord[index]) {
                    letra.style.backgroundColor = '#0bc230';
                    letra.textContent = userGuess[index];
                } else {
                    letra.style.backgroundColor = '#d81511';
                    letra.textContent = userGuess[index];
                }

                newRow.appendChild(letra); // Agrega las letras a la nueva fila ya creada.
            });

            // Insertar la fila arriba de anteriores letas.
            lettersContainer.insertBefore(newRow, lettersContainer.firstChild);

        }
    }
    indexFinder(word,userGuess){
        const gameWord = []
        for ( var i=0;i<8;i++){
            if(word[i] === userGuess[i]){
                gameWord.push(i)
            }
        }
        const correctInfo = [gameWord,userGuess]
        return correctInfo
    } 
}
