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

console.log(carrito.length);

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

//restar fruta del inventario
function restarInventario(arr, filtro, cantidad) {
    let encontrada = arr.find((f) => {
        return f.fruta === filtro;
    })
    if (encontrada) encontrada.stock -= cantidad;
}

//varificar inventariode frutas
function hayCantidadInventario(arr, filtro, cantidad) {
    const encontrada = arr.find((f) => {
        return f.fruta === filtro;
    })
    if (encontrada) {
        return encontrada.stock >= cantidad;
    } else {
        return false;
    }
}

//agregar primera fruta al carrito
function cargarFrutaNueva(arr, valor) {
    arr.push(valor);
}

//continuar agregando frutas al cariito
function cargarFruta(arr, filtro, cantidad) {
    const encontrada = arr.find((f) => {
        return f.fruta === filtro;
    })
    if (encontrada) {
        //Fruta ya existente en el carrito
        encontrada.precio += cantidad;
    } else {
        //Nueva Fruta al carrito
        const nuevaFruta = new Fruta(filtro, cantidad);
        arr.push(nuevaFruta);
    }
}

//sumar total de la compra
function sumarCompra(arr) {
    const total = arr.reduce((acc, f) => {
        return acc + parseFloat(f.precio);
    }, 0);
    return total;
}

//resumen del inventario
function resumenInventario(arr) {
    let resumen = 'Detalle del inventario \n';
    arr.forEach((fruta) => {
        resumen += `${fruta.fruta} ${fruta.stock}\n`;
    });
    console.clear()
    console.log(resumen);
}

//resumen del carrito
function resumenCarrito(){
    //fin de la compra
    let total = sumarCompra(carrito);
    
    if(total == 0){
        alert('¡¡ Carrito vacio !!');
    }else{
        //resumen de lo comprado
        let resultado = 'Detalle de la compra realizada\n';
        carrito.forEach((fruta) => {
            resultado += `${fruta.fruta} ${fruta.precio}$\n`;
        });
        resultado += `\nTotal por la compra ${total}$`;
        alert(resultado);
    }
}

//***************************************
//*** i n i c i a r  l a  c o m p r a ***
//***************************************

const fruta = prompt('¿Qué fruta desea comprar?');
const cantidad = prompt('¿Qué cantidad desea comprar comprar?');

const frutaEncontrada = buscarFruta(inventario, fruta);

//Primer ingrfeso al carrito
if (frutaEncontrada) {
    if (hayCantidadInventario(inventario, fruta, cantidad)) {
        const nuevafruta = new Fruta(fruta, frutaEncontrada.precio * cantidad);
        cargarFrutaNueva(carrito, nuevafruta);
        restarInventario(inventario, fruta, cantidad);
        resumenInventario(inventario);
    } else {
        alert('La cantidad execede lo que hay en el inventario.');
    }
} else {
    alert('No contamos con ese tipo de fruta');
}

//continuar con la compra
while (confirm('¿Desea agregar otra fruta al carrito?')) {
    let fruta = prompt('¿qué fruta desea comprar?');
    let cantidad = prompt('¿Qué cantidad desea comprar comprar?');
    let frutaEncontrada = buscarFruta(inventario, fruta);
    if (frutaEncontrada) {
        if (hayCantidadInventario(inventario, fruta, cantidad)) {
            cargarFruta(carrito, fruta, frutaEncontrada.precio * cantidad);
            restarInventario(inventario, fruta, cantidad);
            resumenInventario(inventario);
        } else {
            alert('La cantidad execede lo que hay en el inventario.');
        }
    } else {
        alert('No contamos con ese tipo de fruta');
    }
}

resumenCarrito();











