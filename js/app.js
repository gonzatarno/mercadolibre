const contenedorProductos = document.getElementById('productos')
const contadorCarrito = document.getElementById('numero-carrito')
const contenedorCarrito = document.getElementById('carrito')
const precioTotal = document.getElementById('total-carrito')
const FiltroCategorias = document.getElementById('categorias')


//TRAEMOS EL NOMBRE INGRESADO POR EL LOGIN Y LO INCERTAMOS CON DOM EN LA HOME
document.getElementById("usuario-nombre").innerHTML = localStorage.getItem("usuario");
document.getElementById("direccion-nombre").innerHTML = localStorage.getItem("usuario");



let ValorDelCarritoEnElStorage = localStorage.carrito; 
let carrito = []

    if(ValorDelCarritoEnElStorage == null){
        carrito = [];
    }else{
        console.log(ValorDelCarritoEnElStorage)
        console.log(JSON.parse(ValorDelCarritoEnElStorage))
        carrito = JSON.parse(ValorDelCarritoEnElStorage);
    }


//CARDS PRODUCTOS 
    mostrarProductos(stockProductos)

    function mostrarProductos(array) {

        contenedorProductos.innerHTML = ''

        array.forEach( (producto) => {
            const div = document.createElement('div')
            div.classList.add('producto')
            div.innerHTML = `
                <div class="card h-100 card-ml">
                    <a href="#"><img class="card-img-top" src="./images/${producto.imagen}" alt=""></a>
                    <div class="card-body">
                        <h4 class="card-title">
                        <a href="#">${producto.nombre}</a>
                        </h4>
                        <h6 class="badge bg-primary" id="ofertaDelDia">OFERTA DEL DÍA</h6>
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


//Agregar al Carrito + sumar cuando haya objetos duplicados.
function agregarAlCarrito(itemId) {

    let itemEnCarrito = carrito.find( el => el.id == itemId )

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1
        contadorCarrito.innerText = carrito.length += 1
    } else {
        let {id, nombre, precio, imagen} = stockProductos.find( el => el.id == itemId )
        carrito.push({id: id, nombre: nombre, precio: precio, cantidad: 1, imagen: imagen})
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))

    console.log(carrito)

    contadorCarrito.innerText = carrito.length
    actualizarCarrito()
}

//Quitar del carrito
function quitarDelCarrito(id) {

    let productoAEliminar = carrito.find( el => el.id == id )

    productoAEliminar.cantidad--

    if (productoAEliminar.cantidad == 0) {
        let indice = carrito.indexOf(productoAEliminar)
        carrito.splice(indice, 1)
    }

    console.log(carrito)
    actualizarCarrito()
}


//Vaciar el Carrito
function vaciarCarrito(){
    localStorage.clear()
    carrito = []
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = 'Total: $'+ carrito.reduce( (acc, el) => acc += el.precio, 0 ) 
    
    actualizarCarrito()
}



//Actualizar el carrito
function actualizarCarrito(){
    contenedorCarrito.innerHTML=''
    
        carrito.forEach( (producto) => {
    
            const div = document.createElement('div')
            div.classList.add('productoEnCarrito')
            div.innerHTML = `
            <div class="contenedor-carrito-producto-div">
                <div class="contenedor-carrito-producto">
                    <img src="./images/${producto.imagen}" alt="">
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

        //NUMERO CARRITO
        contadorCarrito.innerText = carrito.length
        precioTotal.innerText = 'Total: $'+ carrito.reduce( (acc, el) => acc += ((el.precio + el.precio * 0.21) * el.cantidad), 0 )
        
    }



//Al clicker borrar o vaciar carrito, sigue en la misma pantalla
const cajaCarrito = document.getElementsByClassName('dropdown-menu')[0]

cajaCarrito.addEventListener('click', (event)=>{
    event.stopPropagation()
})




// filtro por boton(select) de productos
function filtrarSelect() {
    let valorFiltroCategorias = FiltroCategorias.value
    
    let arrayFiltrado = []

    if (valorFiltroCategorias == 'all') {
        arrayFiltrado = stockProductos
    } else {
        arrayFiltrado = stockProductos.filter( el => el.categoria == FiltroCategorias.value) 
    }


    mostrarProductos(arrayFiltrado)

}

FiltroCategorias.addEventListener('change', ()=>{
    filtrarSelect()
})





/*
const contenedorProductos2 = document.getElementById('contenedor-productos')

mostrarProductos2(stockProductos)

function mostrarProductos2(array2) {

    contenedorProductos2.innerHTML = ''

    array2.forEach( (producto) => {
        const div2 = document.createElement('div2')
        div2.classList.add('producto2')
        div2.innerHTML = `
            <div class="card-ml-home">
            <a href="#"><img class="card-img-top" src="./images/${producto.imagen}" alt=""></a>
            <div class="card-body-home">
                <h5>$ ${producto.precio}</h5>
                <p class="texto-envio">Envío gratis</p>
                <p class="descripcion-card-home">${producto.desc}</p>
            </div>
        </div>
        `
        
        contenedorProductos2.appendChild(div2)
    } )
}
*/

