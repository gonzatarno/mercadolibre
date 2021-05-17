let usuario;
const usuarioLocalStorage = localStorage.getItem('usuario')
const direccionUsuarioNombre = $('#direccion-nombre')
const usuarioNombre = $('#usuario-nombre')
const botonLogin = $('#botonLogin')
const formulario = $('form')
const nombre = $('#nombre')




if (usuarioLocalStorage) {
    usuario = usuarioLocalStorage

    window.location.href = "home.html"


} else {
    $(document).ready( function() {
        formulario.on('submit', (event)=>{
            event.preventDefault()
        
            const nombreLogin = nombre.val().trim()
        
            if ((nombreLogin.length > 2 && nombreLogin != '')) {
        
                usuario = nombreLogin
                localStorage.setItem('usuario', usuario)
                    
            } else {
                alert('Verifique que su nombre sea correcto')
            }
        })

        usuarioNombre.append(`${usuario}`)
        direccionUsuarioNombre.append(`Enviar a ${usuario}`)
    })

    function cambiarPagina() {
        window.location.href = "home.html";
    }

    usuarioNombre.append(`${usuario}`)
    direccionUsuarioNombre.append(`Enviar a ${usuario}`)
}


