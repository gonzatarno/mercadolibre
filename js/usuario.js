let usuario;
const usuarioLocalStorage = localStorage.getItem('usuario')
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
    })

    function cambiarPagina() {
        window.location.href = "home.html";
    }
}


