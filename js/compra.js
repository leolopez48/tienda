const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e)=>{compra.eliminarProducto(e)});

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e)=>{compra.obtenerEvento(e)});
    carrito.addEventListener('keyup', (e)=>{compra.obtenerEvento(e)});

    
}

        function login(){       
            if(document.getElementById('correo').value == 'pedrocastillo6@gmail.com' && document.getElementById('password').value == 'castillo1234'){
                window.location="Inicio.html";
            }else{
                          Swal.fire({
                type: 'info',
                title: '¡Bien hecho!',
                text: 'El producto se ha agregado',
                showConfirmButton: false,
                timer: 1000
            })
            }
        }

function procesarCompra(e){
    e.preventDefault();
    if(compra.obtenerProductosLocalStorage().length === 0){
        Swal.fire({
            type: 'error',
            title: '¡Error!',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: false,
            timer: 2000
        }).then(function(){
            window.location = "Inicio.html";
        })
    }
    else if(cliente.value === '' || correo.value === ''){
        Swal.fire({
            type: 'error',
            title: '¡Error!',
            text: 'Ingrese todos los campos requeridos',
            showConfirmButton: false,
            timer: 2000
        })
    }
    else {
        const cargandoGif = document.querySelector('#cargando');
        cargandoGif.style.display = 'block';

        const enviado = document.createElement('img');
        enviado.src = '../../tienda/img/mail.gif';
        enviado.style.display = 'block';
        enviado.width = '150';
        setTimeout(() => {
            cargandoGif.style.display = 'none';
            document.querySelector('#loaders').appendChild(enviado);
            setTimeout(() => {
                enviado.remove();
                compra.vaciarLocalStorage();
                window.location = "Inicio.html";
            }, 2000);
        }, 3000);
    }
}