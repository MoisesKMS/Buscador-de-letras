import * as UI from './interfaz.js';

class API {
    constructor(artista, cancion) {
        this.artista = artista;
        this.cancion = cancion;
    }

    consultarAPI() {
        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;
        const Spinner = document.createElement('div');
        Spinner.classList.add('spinner');
        Spinner.innerHTML = `
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        `;

        UI.headingResultado.appendChild(Spinner);

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => {
                if (resultado.lyrics) {

                    const { lyrics } = resultado;
                    UI.divResultado.textContent = lyrics;
                    UI.headingResultado.textContent = `Letra de la cancion: ${this.cancion} de ${this.artista}`;
                } else {
                    UI.headingResultado.innerHTML = '';
                    UI.divMensajes.textContent = 'La cancion no se pudo encontrar';
                    UI.divMensajes.classList.add('error');
                    setTimeout(() => {
                        UI.divMensajes.textContent = '';
                        UI.divMensajes.classList.remove('error');
                    }, 3000);
                }
            })
    }
}

export default API;