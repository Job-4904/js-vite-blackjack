/*
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

const miModulo = (() => {
    'use strict'

    let deck         = [],
        // puntosJugador = 0,
        // puntosComputadora = 0;
        puntosJugadores = [];

    
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'],
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo'),
          divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    // Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    const crearDeck = () => {   // Esta función crea un nuevo deck
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        // console.log(deck); 
        return _.shuffle(deck);;
    }

    // Esta función me permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
            // throw se usa para mostrar un error
        }
        return deck.pop() // .pop() me permite tomar la última carta del deck
    }

    const valorCarta = ( carta ) => {
        //Esta es una versión más corta de la función valorCarta, usando el operador ternario}
        // Y la explicación es que si la carta es un número, 
        // se multiplica por 1 para convertirla en número, 
        // y si no es un número, se evalúa si es un As o una figura, y se devuelve el valor correspondiente
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
        // substring me permite tomar una parte de la cadena,
        // en este caso, desde el índice 0 hasta el penúltimo índice de la cadena
        // let puntos = 0
        // 2 = 2, 10 = 10, 3 = 3
        // if( isNaN( valor ) ) {
            // puntos = ( valor === 'A' ) ? 11 : 10;
            //console.log('No es un número');
        // } else {
            //console.log('Es un número');
            // puntos = valor * 1; 
            // Se debe tener en cuenta que en javaScript, 
            // las cadenas de texto que contienen números, 
            // se pueden multiplicar por 1 para convertirlas en números
            // ya que las funciones como substring devuelven cadenas de texto, 
            // y no números
        // }
        // isNaN() me permite saber si el valor es un número o no
        // significa "is Not a Number" (no es un número)

    }

    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
    }

    const determinarGanador = () => {
            
        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        requestAnimationFrame(() => {
            setTimeout(() => {
                if ( puntosComputadora === puntosMinimos ) {
                    alert('Nadie gana :(');
                } else if ( puntosMinimos > 21 ) {
                    alert('Computadora gana');
                } else if ( puntosComputadora > 21 ) {
                    alert('Jugador gana');
                } else {
                    alert('Computadora gana');
                }
            }, 100);
        });
    }

    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora = 0;
    
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta ,puntosJugadores.length - 1);
            crearCarta( carta, puntosJugadores.length - 1 );
            /*puntosComputadora = puntosComputadora + valorCarta( carta );
            puntosHTML[1].innerText = puntosComputadora;*/
            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${ carta }.png`;
            // divCartasComputadora.append( imgCarta );
            // imgCarta.classList.add('carta')
        
        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
    }

    // const valor = valorCarta( pedirCarta() );
    // console.log({ valor });

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );
        crearCarta( carta, 0 );
        
        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugadores[0] );
        });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();