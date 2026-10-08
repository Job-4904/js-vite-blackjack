/**
 * 
 * @param {String} carta nombre de la carta, por ejemplo '10C'
 * @param {Number} turno índice del jugador o computadora
 * @param {NodeListOf<Element>} divCartasJugadores contenedores donde se dibujan las cartas
 * @returns {HTMLImageElement} imgCarta
 */

export const crearCarta = (carta, turno, divCartasJugadores) => {
        if (!carta) throw new Error('La carta es necesaria'); // Valida que la carta exista antes de crear la imagen.
        if (!divCartasJugadores || !divCartasJugadores[turno]) throw new Error('El contenedor de cartas es necesario'); // Asegura que el lugar donde se dibuja la carta exista.

        const imgCarta = document.createElement('img');
        imgCarta.src = new URL(`../../../assets/cartas/${carta}.png`, import.meta.url).href; // Corrige la ruta desde esta carpeta a la carpeta assets del proyecto.
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta); // Inserta la imagen en la columna correcta del tablero.
    }