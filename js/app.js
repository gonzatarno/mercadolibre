let acumulador = ``;
let Productos=[]

let ValorDelCarritoEnElStorage = localStorage.carrito; 
let carrito = []
    if(ValorDelCarritoEnElStorage == null){
        carrito = [];
    }else{
        console.log(ValorDelCarritoEnElStorage)
        console.log(JSON.parse(ValorDelCarritoEnElStorage))
        carrito = JSON.parse(ValorDelCarritoEnElStorage);
    }



    class Producto {
        constructor(nombre, precio, imagen, stock, oferta, tipo) {
            this.nombre = nombre;
            this.precio = precio;
            this.imagen = imagen;
            this.stock = stock;
            this.oferta = oferta;
            this.tipo = tipo
    
            const quitarStock = (cantidad) =>{
                this.stock -= cantidad
            }
        }
    }
    
    Productos.push(new Producto('HyperX Cloud Flight', 14799, 'hyperx.jpg', 4, 'OFERTA DEL DÍA', 'Consola'))
    Productos.push(new Producto('Joystick inalámbrico PlayStation', 10000, 'joystick_ps5.jpg', 1, 'OFERTA DEL DÍA', 'Consola'))
    Productos.push(new Producto('Smart TV Tedge Led 50', 25000, 'tedge.jpg', 3, 'OFERTA DEL DÍA', 'Televisor'))
    Productos.push(new Producto('Smart TV Samsung', 31900, 'samsung.jpg', 1, 'OFERTA DEL DÍA', 'Televisor'))
    Productos.push(new Producto('Mouse Logitech G305', 4000, 'mouse_g305.jpg', 3, 'OFERTA DEL DÍA', 'Computacion'))
    Productos.push(new Producto('Tablet Samsung', 16100, 'tab_a.jpg', 5, 'OFERTA DEL DÍA', 'Computacion'))
    





function agregarCarrito(objetoCarrito) {

    carrito.push(objetoCarrito)
    cargarCarrito()
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


function quitarDelCarrito(indice) {

    carrito.splice(indice, 1)
    cargarCarrito()

}

function vaciarCarrito(){
    localStorage.clear()
    carrito = []
    numeroCarrito = ""
    totalCarrito = 0
    document.getElementById ('carrito').innerHTML = carrito;
    document.getElementById('numero-carrito').innerHTML = numeroCarrito
    document.getElementById('total-carrito').innerHTML = `Total: $${totalCarrito}`
}




function cargarCarrito(){
    let productosEnCarrito = ''
    let numeroCarrito = 0
    let totalCarrito = 0

    for (let i = 0; i < carrito.length; i++) {
        productosEnCarrito += `<div class="contenedor-carrito-producto-div">
        <div class="contenedor-carrito-producto">
            <img src="/images/${carrito[i].imagen}" alt="">
            <div class="contenedor-carrito-prducto-texto">
                <h4>${carrito[i].nombre}</h4>
            <p class="texto-envio">Envío gratis</p>
            </div>
            <h2>$${carrito[i].precio}</h2>
        </div>
    </div>
    <div class="btn-eliminar-grupo">
    <div class="btn-eliminar" onclick="quitarDelCarrito(${[i]})">Eliminar</div>
    <div class="btn-eliminar" onclick="vaciarCarrito(${[i]})">Vaciar carrito</div>
    </div>
    <div class="contenedor-carrito-linea"></div></div>`

    totalCarrito += carrito[i].precio + carrito[i].precio * 0.21
    numeroCarrito += 1
        
    }

    document.getElementById('carrito').innerHTML = productosEnCarrito
    document.getElementById('numero-carrito').innerHTML = numeroCarrito
    document.getElementById('total-carrito').innerHTML = `Total: $${totalCarrito}`
}




//ORDENAR DE MAYOR A MENOR - .Sort
Productos.sort((a, b) => b.precio - a.precio);




//CARDS PRODUCTOS
for (let i = 0; i < Productos.length; i++) {
    
    acumulador += `
    <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 card-ml">
            <a href="#"><img class="card-img-top" src="./images/${Productos[i].imagen}" alt=""></a>
            <div class="card-body">
                <h4 class="card-title">
                <a href="#">${Productos[i].nombre}</a>
                </h4>
                <h6 class="badge bg-primary">${Productos[i].oferta}</h6>
                <h5 class="precio-card"> $${Productos[i].precio}</h5>
                <p class="texto-envio">Envío gratis</p>
            </div>
            <div class="container-truck">
                <div class="circle-truck">
                    <img class="truck" src="/images/truck_2.png" width="20px" height="20px" alt="truck">
                </div>
            </div>
            <div class="card-footer-meli">
                <button onclick='agregarCarrito(${JSON.stringify(Productos[i])})' class="btn btn-primary btn-meli">Agregar al carrito</button>
            </div>
        </div>
    </div>`;
    
}

document.getElementById("productos").innerHTML = acumulador;




// Cosas a agregar:
// Cantidad de productos en el carrito
// filtro por boton de productos