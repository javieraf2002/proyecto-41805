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
let carrito = [];

const btnAgregar = document.querySelector("#btnAgregar");
const btnFinalizar = document.querySelector("#btnFinalizar");
const inputProducto = document.querySelector('#lproducto');
const inputCantidad = document.querySelector('#lCantidad');
const formulario = document.querySelector('form')

//funcion constructora carrito
function Fruta(fruta, precio) {
    this.fruta = fruta;
    this.precio = precio;
}

//buscar una fruta en el inventario
function buscarFruta(filtro) {
    const encontrada = inventario.find((f) => {
        return f.fruta === filtro;
    })
    return encontrada;
}

//restar fruta del inventario
function restarInventario(filtro, cantidad) {
    let encontrada = inventario.find((f) => {
        return f.fruta === filtro;
    })
    if (encontrada) encontrada.stock -= cantidad;
}

//verificar inventariode frutas
function hayCantidadInventario(filtro, cantidad) {
    const encontrada = inventario.find((f) => {
        return f.fruta === filtro;
    })
    if (encontrada) {
        return encontrada.stock >= cantidad;
    } else {
        return false;
    }
}

//agregar frutas al carrito
function agregarFrutaCarrito(filtro, cantidad, precio) {
    const encontrada = carrito.find((f) => {
        return f.fruta === filtro;
    })
    if (encontrada) {
        //Fruta ya existente en el carrito
        encontrada.precio += cantidad * precio;
        guardarLS(encontrada);
    } else {
        //Nueva Fruta al carrito
        const nuevaFruta = new Fruta(filtro, cantidad * precio);
        carrito.push(nuevaFruta);
        guardarLS(nuevaFruta);
    }
}

//sumar total de la compra
function sumarCompra() {
    const total = carrito.reduce((acc, f) => {
        return acc + parseFloat(f.precio);
    }, 0);
    return total;
}

//resumen del inventario
function resumenInventario() {
    let resumen = 'Detalle del inventario \n';
    inventario.forEach((fruta) => {
        resumen += `${fruta.fruta} ${fruta.stock}\n`;
    });
    console.clear()
    console.log(resumen);
}

//resumen parcial del carrito
function resumenParcialCarrito() {
    let resumen = 'Detalle parcial del carrito de compras \n';
    carrito.forEach((fruta) => {
        resumen += `${fruta.fruta} ${fruta.precio}\n`;
    });
    console.log(resumen);
}

//resumen del carrito
function resumenCarrito() {
    //fin de la compra
    let total = sumarCompra(carrito);

    if (total == 0) {
        Swal.fire(
            'Fin de la compra',
            'Carrito vacio',
            'error'
        )
    } else {
        //resumen de lo comprado
        let resultado = 'Detalle de la compra realizada\n';
        carrito.forEach((fruta) => {
            resultado += `${fruta.fruta} ${fruta.precio}$\n`;
        });
        resultado += `\nTotal por la compra ${total}$`;
        alert(resultado);
    }
}

const guardarLS = (fruta) => {
    let transactionArray = JSON.parse(localStorage.getItem("carrito")) || [];

    const encontrada = transactionArray.find((f) => {
        return f.fruta === fruta.fruta;
    })
    if (encontrada) {
        //Fruta ya existente en el carrito
        encontrada.precio = fruta.precio;
    } else {
        //Nueva Fruta al carrito
        transactionArray.push(fruta);
    }

    let returnTransactionArray = JSON.stringify(transactionArray);
    localStorage.setItem("carrito", returnTransactionArray);
    console.log('Guardado LS')
};

function leerLS(arr) {
    let transactionObjArr = JSON.parse(localStorage.getItem("carrito")) || [];

    transactionObjArr.forEach((fruta) => {
        arr.push(fruta);
    });
}

function hacerCompra(fruta, cantidad) {
    const frutaEncontrada = buscarFruta(fruta);
    if (cantidad > 0) {
        if (frutaEncontrada) {
            if (hayCantidadInventario(fruta, cantidad)) {
                agregarFrutaCarrito(fruta, cantidad, frutaEncontrada.precio);
                restarInventario(fruta, cantidad);
                resumenInventario();
                resumenParcialCarrito();
                return true;
            } else {
                Swal.fire(
                    'Error',
                    'La cantidad execede lo que hay en el inventario',
                    'error'
                )
                return false;
            }
        } else {
            Swal.fire(
                'Error',
                'No contamos con ese tipo de fruta',
                'error'
            )
            return false;
        }
    } else {
        Swal.fire(
            'Error',
            'La cantidad es incorrecta.',
            'error'
        )
        return false;
    }
}

//***************************************
//*** i n i c i a r  l a  c o m p r a ***
//***************************************

leerLS(carrito);

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let form = e.target;
    if (hacerCompra(form.children[1].value, form.children[3].value)) {
        form.children[1].value = '';
        form.children[3].value = '';
        form.children[1].focus();
        Toastify({
            text: 'Se agregó un producto al carrito',
            duration: 3000
        }).showToast();
    } else {
        form.children[1].focus();
    }
})

btnFinalizar.addEventListener('click', () => {
    resumenCarrito();
    carrito = [];
    localStorage.removeItem('carrito');
})












