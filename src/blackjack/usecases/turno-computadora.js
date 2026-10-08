import { pedirCarta } from './pedir-carta';

/**
 * 
 * @param {Number} puntosMinimos puntos minimos que la computadora necesita para ganar
 * @param {Array<String>} deck baraja disponible para seguir robando cartas
 * @param {Array<Number>} puntosJugadores estado global de los puntos de cada jugador
 * @param {Function} acumularPuntos función que suma puntos y actualiza el DOM
 * @param {Function} crearCarta función que inserta la imagen de la carta en el tablero
 * @param {Function} determinarGanador función que decide quién gana la partida
 */

export const turnoComputadora = (
  puntosMinimos,
  deck,
  puntosJugadores,
  acumularPuntos,
  crearCarta,
  determinarGanador,
  divCartasJugadores
) => {
  if (!puntosMinimos && puntosMinimos !== 0) throw new Error('Puntos minimos son necesarios'); // Valida que el jugador sí tenga un valor de puntos válido.
  if (!deck || deck.length === 0) throw new Error('No hay cartas en el deck'); // Evita sacar cartas si la baraja ya está vacía.
  if (!divCartasJugadores || !divCartasJugadores.length) throw new Error('El contenedor de cartas es necesario'); // Necesita saber dónde dibujar cada carta.
  
  let puntosComputadora = 0;

  do {
    const carta = pedirCarta(deck); // Toma la siguiente carta del mazo.
    puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1); // Suma puntos a la computadora y actualiza el DOM.
    crearCarta(carta, puntosJugadores.length - 1, divCartasJugadores); // Dibuja la carta en la zona de la computadora usando el contenedor que recibe.
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21); // La computadora sigue pidiendo hasta llegar al valor mínimo del jugador o pasarse de 21.

  determinarGanador(); // Evalúa el resultado final cuando termina el turno.
};
