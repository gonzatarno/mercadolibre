let stockProductos = []



const obtenerProductos = async () => {
    const res = await fetch('./stock.json')
    const data = await res.json()

    stockProductos = data
    mostrarProductos(stockProductos)    
}
obtenerProductos()


const contenedorProductos = document.getElementById('productos')
const contadorCarrito = document.getElementById('numero-carrito')
const contenedorCarrito = document.getElementById('carrito')
const precioTotal = document.getElementById('total-carrito')
const filtroCategorias = document.getElementById('categorias')
const filtroPrecios = document.getElementById('precios')




// TRAEMOS EL NOMBRE INGRESADO POR EL LOGIN Y LO INCERTAMOS CON DOM EN LA HOME
document.getElementById("usuario-nombre").innerHTML = localStorage.getItem("usuario");
document.getElementById("direccion-nombre").innerHTML = localStorage.getItem("usuario");


// Al clicker borrar o vaciar carrito, sigue en la misma pantalla
const cajaCarrito = document.getElementsByClassName('dropdown-menu')[0]

cajaCarrito.addEventListener('click', (event)=>{
    event.stopPropagation()
})


// CARRITO LOCAL STORAGE 
let ValorDelCarritoEnElStorage = localStorage.getItem("carrito"); 
let carrito = []

    if(ValorDelCarritoEnElStorage != null){
        console.log(ValorDelCarritoEnElStorage)
        console.log(JSON.parse(ValorDelCarritoEnElStorage))
        carrito = JSON.parse(ValorDelCarritoEnElStorage);

        actualizarCarrito();
    }



// CARDS PRODUCTOS

    function mostrarProductos(array) {

        contenedorProductos.innerHTML = ''

        array.forEach( (producto) => {
            const div = document.createElement('div')
            div.classList.add('producto')
            div.innerHTML = `
                <div class="card h-100 card-ml">
                    <a href="#"><img class="card-img-top" src="${producto.imagen}" alt=""></a>
                    <div class="card-body">
                        <h4 class="card-title">
                        <a href="#">${producto.nombre}</a>
                        </h4>
                        <h6 class="badge bg-primary">OFERTA DEL DÍA</h6>
                        <h5 class="precio-card"> $${producto.precio}</h5>
                        <p class="texto-envio">Envío gratis</p>
                    </div>
                    <div class="container-truck">
                        <div class="circle-truck">
                            <img class="truck" src="./images/truck_2.png" width="20px" height="20px" alt="truck">
                        </div>
                    </div>
                    <div class="card-footer-meli">
                        <button onclick='agregarAlCarrito(${producto.id})' class="btn btn-primary btn-meli">Agregar al carrito</button>
                    </div>
                </div>`
            
            contenedorProductos.appendChild(div)
        } )
    }







// Agregar al Carrito + sumar cuando haya objetos duplicados.
function agregarAlCarrito(itemId) {

    let itemEnCarrito = carrito.find( el => el.id == itemId )

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1
    } else {
        let {id, nombre, precio, imagen} = stockProductos.find( el => el.id == itemId )
        carrito.push({id: id, nombre: nombre, precio: precio, cantidad: 1, imagen: imagen})
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))

    console.log(carrito)


    actualizarCarrito()
}

// Quitar del carrito
function quitarDelCarrito(id) {

    let productoAEliminar = carrito.find( el => el.id == id )

    productoAEliminar.cantidad--

    if (productoAEliminar.cantidad == 0) {
        let indice = carrito.indexOf(productoAEliminar)
        carrito.splice(indice, 1)
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))
    console.log(carrito)
    actualizarCarrito()
}



// Vaciar el Carrito
function vaciarCarrito(){
    localStorage.removeItem("carrito")
    carrito = []
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = 'Total: $'+ carrito.reduce( (acc, el) => acc += el.precio, 0 ) 
    
    actualizarCarrito()
}



// Actualizar el carrito
function actualizarCarrito(){
    contenedorCarrito.innerHTML=''
    
        carrito.forEach( (producto) => {
    
            const div = document.createElement('div')
            div.classList.add('productoEnCarrito')
            div.innerHTML = `
            <div class="contenedor-carrito-producto-div">
                <div class="contenedor-carrito-producto">
                    <img src="${producto.imagen}" alt="">
                    <div class="contenedor-carrito-prducto-texto">
                        <h4>${producto.nombre}</h4>
                    <p class="texto-envio">Envío gratis</p>         
                    </div>
                        <div class="precio-cantidad">
                             <h2>$${producto.precio * producto.cantidad}</h2>
                            <p class="cantidad">${producto.cantidad}<p>
                        </div>              
                </div>
            </div>
            <div class="btn-eliminar-grupo">
                <div class="btn-eliminar" onclick="quitarDelCarrito(${producto.id})">Eliminar</div>
                <div class="btn-eliminar" onclick="vaciarCarrito(${producto.id})">Vaciar carrito</div>
            </div>
            <div class="contenedor-carrito-linea"></div></div>`
    
            contenedorCarrito.appendChild(div)        
        })

        // NUMERO CARRITO
        contadorCarrito.innerText = carrito.reduce( (acc, el) => acc + (el.cantidad), 0 );
        precioTotal.innerText = 'Total: $'+ carrito.reduce( (acc, el) => acc += (el.precio * el.cantidad), 0 )
    }




// Filtro por boton(select) de productos
function filtrarSelect() {
    let valorFiltroCategorias = filtroCategorias.value
    let valorFiltroPrecios = filtroPrecios.value

    let arrayFiltrado = []

    if (valorFiltroCategorias == 'all') {
        arrayFiltrado = stockProductos
    } else {
        arrayFiltrado = stockProductos.filter( el => el.categoria == filtroCategorias.value) 
    }

    if (valorFiltroPrecios == 1) {
        arrayFiltrado = arrayFiltrado.filter( el => el.precio <= 10000)
    } else if (valorFiltroPrecios == 2) {
        arrayFiltrado = arrayFiltrado.filter( el => el.precio >= 10000)
    }

    mostrarProductos(arrayFiltrado)

}

filtroCategorias.addEventListener('change', ()=>{
    filtrarSelect()
})

selectPrecios.addEventListener('change', ()=>{
    filtrarSelect()
})


// API MERCADO PAGO

async function finalizarCompra() {
    const productsToMP = carrito.map((element) => {
        let nuevoElemento = {
            title: element.nombre,
            description: "",
            picture_url: "",
            category_id: element.id,
            quantity: Number(element.cantidad),
            currency_id: "ARS",
            unit_price: Number(element.precio),
        };
        return nuevoElemento;
        });
        console.log(productsToMP);
        const response = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
            method: "POST",
            headers: {
            Authorization:
                "Bearer TEST-1966941681392569-052302-ccf496b9e74c185ed6ef40208aae39be-554850478",
            },
            body: JSON.stringify({
            items: productsToMP,
            }),
        }
        );
        const data = await response.json();
        window.open(data.init_point, "_blank");
    }


