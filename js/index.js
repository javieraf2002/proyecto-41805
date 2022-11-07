const btnAgregar = document.querySelector("#btnAgregar");
const btnFinalizar = document.querySelector("#btnFinalizar");
const btnVaciar = document.querySelector("#btnVaciar");
const inputProducto = document.querySelector('#lproducto');
const inputCantidad = document.querySelector('#lCantidad');
const formulario = document.querySelector('form');

// Pintar grilla de inventario
fetchAPI(PATH);

// Cargar carrito del local Storage
leerLS(carrito);

//Mostrar estado actual del carrito
resumenParcialCarrito();

//Funcion principla para agregar al carrito
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
                    'La cantidad excede lo que hay en el inventario',
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

//Agregar productos al carrito cuando es mas de uno
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

//Finalizar la compra
btnFinalizar.addEventListener('click', () => {
    resumenCarrito();
    carrito = [];
    localStorage.removeItem('carrito');
    resumenParcialCarrito();
})

//Eliminar todo el carrito
btnVaciar.addEventListener('click', ()=>{
    carrito = [];
    localStorage.removeItem('carrito');
    resumenParcialCarrito();
    Toastify({
        text: 'Carrito vacio.',
        duration: 3000,
        style: {
            background: "red",
        }
    }).showToast();
});