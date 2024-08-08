import { GetWord } from './api.js';

export class gameStart {
    constructor() {
        this.trys = 5; // Número de intentos
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
                    // Llama a la funcion checkGuess para verificar si le pego.
                    this.checkGuess();
                }
            });
        } catch (error) {
            console.error('Error', error);
        }
    }

    checkGuess() {
        // Sacamos el valor del input y lo pasamos a upperCase para comparar
        const userGuess = document.getElementById('guess').value.toUpperCase(); 
        if( userGuess.length < 8)
            {
                alert("Se necesita que la palabra tenga 8 letras.")
                return
            }
        if (this.word.includes(userGuess)){
            this.changeColor()
            /* this.updateLetters(userGuess) */
            alert("Hola")
        } else {
            this.trys -= 1
            alert('No contiene esa letra, te quedan ' + this.trys + ' intentos')
        }

        if (this.trys === 0){}

        // Limpia el input para esperar a otro.
        document.getElementById('guess').value = ''; 
    }
    changeColor(){
        let recuadros = document.querySelectorAll('.recuadro');
        alert("Npasd")
        recuadros.forEach(function(recuadro) {
            recuadro.style.backgroundColor = "green";
            recuadro.textContent = "a";
          });
    } 
}
