let Productos=[]
const contenedorProductos = document.getElementById('productos')
const contadorCarrito = document.getElementById('numero-carrito')
const contenedorCarrito = document.getElementById('carrito')
const precioTotal = document.getElementById('total-carrito')


let ValorDelCarritoEnElStorage = localStorage.carrito; 
let carrito = []

    if(ValorDelCarritoEnElStorage == null){
        carrito = [];
    }else{
        console.log(ValorDelCarritoEnElStorage)
        console.log(JSON.parse(ValorDelCarritoEnElStorage))
        carrito = JSON.parse(ValorDelCarritoEnElStorage);
    }


//MENSAJE - NOMBRE de USUARIO y Direccion
let usuario;
const usuarioLocalStorage = localStorage.getItem('usuario')

const direccionUsuarioNombre = document.getElementById('direccion-nombre')
const usuarioNombre = document.getElementById('usuario-nombre')

    if (usuarioLocalStorage) {
        usuario = usuarioLocalStorage
        
    } else {
        usuario = prompt('Hola, ingrese su nombre')
    }

    usuarioNombre.innerHTML = `${usuario}`
    direccionUsuarioNombre.innerHTML = `Enviar a ${usuario}`
    localStorage.setItem('usuario', usuario)


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
                            <img class="truck" src="/images/truck_2.png" width="20px" height="20px" alt="truck">
                        </div>
                    </div>
                    <div class="card-footer-meli">
                        <button onclick='agregarAlCarrito(${producto.id})' class="btn btn-primary btn-meli">Agregar al carrito</button>
                    </div>
                </div>`
            
            
            contenedorProductos.appendChild(div)
        } )
    }



//Agregar al Carrito
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
                    <img src="/images/${producto.imagen}" alt="">
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
        precioTotal.innerText = 'Total: $'+ carrito.reduce( (acc, el) => acc += (el.precio * el.cantidad), 0 )
    }



//Al clicker borrar o vaciar carrito, sigue en la misma pantalla
const cajaCarrito = document.getElementsByClassName('dropdown-menu')[0]

cajaCarrito.addEventListener('click', (event)=>{
    event.stopPropagation()
})




// Cosas a agregar:
// Cantidad de productos en el carrito
// filtro por boton de productos
