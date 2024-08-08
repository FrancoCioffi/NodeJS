 /* https://clientes.api.greenborn.com.ar/public-random-word */
 export class GetWord {
    constructor() {
        this.word = '';
    }
    
    // Metodo estatico para llamar a la api y obtener la palabra.
    static generateWord() {
        return new Promise((resolve, reject) => {
            fetch('https://clientes.api.greenborn.com.ar/public-random-word')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error');
                    }
                    return response.json();
                })
                .then(data => {
                    let word = data[0].toUpperCase();
                    
                    // Si la palabra tiene mas de 12 letras generarla denuevo
                    if (word.length > 12) {
                        return this.generateWord(); 
                    }
                    
                    resolve(word); // Resuelve la promesa con la palabra válida
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    reject(error); // Rechaza la promesa en caso de error
                });
        });
    }
}
