import { crearDeck, pedirCarta, valorCarta, turnoComputadora, crearCarta } from './usecases';

const miModulo = (() => {
    'use strict'

    let deck = [],
        puntosJugadores = [];

    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'],
        btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo'),
        divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck(tipos, especiales);
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    const acumularPuntos = (carta, turno) => {
        let puntos = puntosJugadores[turno] + valorCarta(carta); // Suma el valor actual más el nuevo valor de la carta.

        if (carta.includes('A') && puntos > 21) { // Si sacas un As y te pasas de 21, lo rebaja a 1 para seguir jugando.
            puntos -= 10;
        }

        puntosJugadores[turno] = puntos;
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        requestAnimationFrame(() => {
            setTimeout(() => {
                if (puntosComputadora === puntosMinimos) {
                    alert('Nadie gana :(');
                } else if (puntosMinimos > 21) {
                    alert('Computadora gana');
                } else if (puntosComputadora > 21) {
                    alert('Jugador gana');
                } else {
                    alert('Computadora gana');
                }
            }, 100);
        });
    }

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta( deck ); // Saca una carta del mazo activo del juego.
        const puntosJugador = acumularPuntos(carta, 0); // Acumula la puntuación del jugador y actualiza el DOM.
        crearCarta(carta, 0, divCartasJugadores); // Dibuja la carta del jugador usando el contenedor de cartas del DOM.

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador, deck, puntosJugadores, acumularPuntos, crearCarta, determinarGanador, divCartasJugadores); // Le pasa el contenedor y el estado completo a la computadora para continuar con el juego.
        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0], deck, puntosJugadores, acumularPuntos, crearCarta, determinarGanador, divCartasJugadores); // Pasa también el contenedor para que la computadora pueda dibujar sus cartas.
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();