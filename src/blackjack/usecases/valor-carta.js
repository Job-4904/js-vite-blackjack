/**
 * Obtiene el valor de la carta
 * @param {Array<String>} carta es un arreglo de string
 * @returns {Number} retorna el valor de la carta
 */

export const valorCarta = (carta) => {
    
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}
