const totalpagar = document.querySelector('#totalpagar');
const container__carrito = document.querySelector('.container__carrito');

//carrito de compras
let carrito = [];

//funcion constructora carrito
function Fruta(fruta, precio) {
    this.fruta = fruta;
    this.precio = precio;
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
}

//resumen parcial del carrito
function resumenParcialCarrito() {
    let resumen = 'Detalle parcial del carrito de compras \n';
    let precio = 0;
    let frutas = '';
    container__carrito.innerHTML = '';
    carrito.forEach((fruta, index) => {
        precio += fruta.precio;
        resumen += `${fruta.fruta} ${fruta.precio}\n`;
        frutas += `
        <div class="container__carrito__fruta">
            <span>${fruta.fruta}</span>
            <span>${fruta.precio} $</span>
            <button class="container__carrito__fruta__btn" id=${index}>X</button>
        </div>
        `;
    });  
    container__carrito.innerHTML = '<h3>Carrito</h3>' + frutas;
    totalpagar.innerHTML = `Total haste el momento: ${precio}$`;
    let botones = document.querySelectorAll('.container__carrito__fruta__btn');
    botones.forEach(btn => {
        btn.addEventListener('click', eliminarfruta)   
    });
}

//Elimina un producto del carrito
function eliminarfruta(e){
    const id = e.srcElement.id;
    carrito.splice(id, 1);
    eliminarLS(id);
    resumenParcialCarrito();
    Toastify({
        text: 'Se elimino un producto del carrito',
        duration: 3000,
        style: {
            background: "red",
        }
        }).showToast();
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
        Swal.fire({
            icon: 'success',
            title: 'Compra Finalizada',
            text: `Total a pagar ${total}$` 
            }        
        );
    }
}