const PATH = "./db/inventario.json";
const container__inventario = document.querySelector('.container__inventario');
let inventario = [];

function pintarInventario(arr) {
    let html = '';
    
    arr.forEach(f => {
        const {id, fruta , precio, stock, imagen}= f;
        
        html = `
        <div class="card">
            <span class="card__fruta">${fruta}</span>
            <img src="./imagenes/${imagen}" alt="Fruta" class="card__img">
            <button class="card__fruta__btn" id=${id}>Agregar al carrito</button>
            <span class="card__precio">Precio por Kilo ${precio}$</span>
        </div>
        `;

        container__inventario.innerHTML += html;
    });
    let botones = document.querySelectorAll('.card__fruta__btn');
    botones.forEach(btn => {
        btn.addEventListener('click', agregarPorKilo)   
    });
};

function agregarPorKilo(e) {
    const id = e.srcElement.id;
    const fruta = inventario[id].fruta;
    hacerCompra(fruta, 1);
    Toastify({
        text: 'Se agregó un producto al carrito',
        duration: 3000
    }).showToast();
}

const fetchAPI = async (PATH) => {
    const respuesta = await fetch(PATH);
    inventario = await respuesta.json();
    pintarInventario(inventario);
  };

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

//resumen del inventario
function resumenInventario() {
    let resumen = 'Detalle del inventario \n';
    inventario.forEach((fruta) => {
        resumen += `${fruta.fruta} ${fruta.stock}\n`;
    });
}