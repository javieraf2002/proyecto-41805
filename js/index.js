//inventario
inventario = [
    { fruta: 'banana', precio: 150, stock: 100 },
    { fruta: 'durazno', precio: 300, stock: 100 },
    { fruta: 'frutilla', precio: 600, stock: 100 },
    { fruta: 'mandarina', precio: 280, stock: 100 },
    { fruta: 'manzana', precio: 320, stock: 100 },
    { fruta: 'naranja', precio: 200, stock: 100 },
    { fruta: 'pera', precio: 300, stock: 100 },
    { fruta: 'pomelo', precio: 500, stock: 100 },
    { fruta: 'melon', precio: 200, stock: 100 },
    { fruta: 'sandia', precio: 100, stock: 100 }
];

//carrito de compras
const carrito = [];

//funcion constructora carrito
function Fruta(fruta, precio) {
    this.fruta = fruta;
    this.precio = precio;
}

//buscar una fruta en el inventario
function buscarFruta(arr, filtro) {
    const encontrada = arr.find((f) => {
        return f.fruta === filtro;
    })
    return encontrada;
}

//agregar fruta al carrito
function cargarFruta(arr, valor) {
    arr.push(valor);
}

//sumar total de la compra
function sumarCompra(arr) {
    const total = arr.reduce((acc, f) => {
        return acc + parseFloat(f.precio);
    }, 0);
    return total;
}

//iniciar la compra
const fruta = prompt('¿Qué fruta desea comprar?');
const cantidad = prompt('¿Qué cantidad desea comprar comprar?');

const frutaEncontrada = buscarFruta(inventario, fruta);

if (frutaEncontrada) {
    const nuevafruta = new Fruta(fruta, frutaEncontrada.precio * cantidad);
    cargarFruta(carrito, nuevafruta);
} else {
    alert('No contamos con ese tipo de fruta');
}

//continuar con la compra
while (confirm('¿Desea agregar otra fruta al carrito?')) {
    let fruta = prompt('¿qué fruta desea comprar?');
    let cantidad = prompt('¿Qué cantidad desea comprar comprar?');
    let frutaEncontrada = buscarFruta(inventario, fruta);
    if (frutaEncontrada) {
        const nuevaFruta = new Fruta(fruta, frutaEncontrada.precio * cantidad);
        cargarFruta(carrito, nuevaFruta);
    } else {
        alert('No contamos con ese tipo de fruta');
    }
}

//fin de la compra
let total = sumarCompra(carrito);

//resumen de lo comprado
let resultado = 'Detalle de la compra realizada\n';

carrito.forEach((fruta) => {
    resultado += `${fruta.fruta} ${fruta.precio}$\n`;
});

resultado += `\nTotal por la compra ${total}$`;
alert(resultado);













