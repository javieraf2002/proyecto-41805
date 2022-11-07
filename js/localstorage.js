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

function eliminarLS(id){
    let carritoAux = [];
    leerLS(carritoAux);
    carritoAux.splice(id, 1);
    let returnTransactionArray = JSON.stringify(carritoAux);
    localStorage.setItem("carrito", returnTransactionArray);
}