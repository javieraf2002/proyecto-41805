const precioArticulo1 = 100;
const precioArticulo2 = 200;
const precioArticulo3 = 300;
const precioArticulo4 = 400;
const precioArticulo5 = 500;

let gastoTotal = 0;

const iniciar = prompt('Desea comenzar a comprar. s/n');

function menuArticulos() {
    return 'Lista de articulos\n1 Articulo 1\n2 Articulo 2\n3 Articulo 3\n4 Articulo 4\n5 Articulo 5\nx Terminar compra';
};

function menuCuotas() {
    return '1 Tres cuotas\n2 Seis cuotas\n3 Doce cuotas\n4 Cancelar compra';
}

if (iniciar == 's') {
    let opcion = prompt('Lista de articulos\n1 Articulo 1\n2 Articulo 2\n3 Articulo 3\n4 Articulo 4\n5 Articulo 5\nx Terminar compra');
    while (opcion.toLowerCase() !== 'x') {
        switch (opcion) {
            case '1':
                gastoTotal = gastoTotal + precioArticulo1;
                break;
            case '2':
                gastoTotal = gastoTotal + precioArticulo2;
                break;
            case '3':
                gastoTotal = gastoTotal + precioArticulo3;
                break;
            case '4':
                gastoTotal = gastoTotal + precioArticulo4;
                break;
            case '5':
                gastoTotal = gastoTotal + precioArticulo5;
                break;
            default:
                alert('Opcion incorrecta');
                break;
        }
        opcion = prompt('Lista de articulos\n1 Articulo 1\n2 Articulo 2\n3 Articulo 3\n4 Articulo 4\n5 Articulo 5\nx Terminar compra');
    }
    if (gastoTotal > 0) {

        const formaPago = prompt('El total de su compra fue de: ' + gastoTotal + '$' + '\nComo lo desea abonar?\n1 Efectivo \n2 Tarjeta de crédito \n3 Cancelar compra');

        switch (formaPago) {
            case '1':
                alert('El total abonado es de ' + gastoTotal + '$\nGracias por confiar en nsosotros...');
                break;
            case '2':
                const cantidadCuotas = prompt('1 Tres cuotas\n2 Seis cuotas\n3 Doce cuotas\n4 Cancelar compra');
                while (cantidadCuotas !== '4') {
                    switch (cantidadCuotas) {
                        case '1':
                            gastoTotal = gastoTotal / 3;
                            alert('El total abonado es de 3 cuotas de ' + gastoTotal.toFixed(2) + '$\nGracias por confiar en nosotros');
                            cantidadCuotas = 4;
                            break;
                        case '2':
                            gastoTotal = gastoTotal / 6;
                            alert('El total abonado es de 6 cuotas de ' + gastoTotal.toFixed(2) + '$\nGracias por confiar en nosotros');
                            cantidadCuotas = 4;
                            break;
                        case '3':
                            gastoTotal = gastoTotal / 12;
                            alert('El total abonado es de 12 cuotas de ' + gastoTotal.toFixed(2) + '$\nGracias por confiar en nosotros');
                            cantidadCuotas = 4;
                            break;
                        case '4':
                            alert('Gracias por su visita, lo esperamos en otro momento');
                            break;
                        default:
                            alert('Opcion incorrecta');
                            break;
                    }
                }
                break;
            case '3':
                alert('Gracias por su visita, lo esperamos en otro momento');
                break;
            default:
                alert('Opcion incorrecta');
                break;
        }
    }
} else {
    alert('Gracias por su visita, lo esperamos en otro momento');
};