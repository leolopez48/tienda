class Carrito {

    //Añadir producto al carrito
    comprarProducto(e){
        e.preventDefault();
        //Delegado para agregar al carrito
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            //Enviamos el producto seleccionado para tomar sus datos
            this.leerDatosProducto(producto);
        }
    }

    //Leer datos del producto
    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: document.getElementById('cantidad').value
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });

        if(productosLS === infoProducto.id){
            Swal.fire({
                type: 'info',
                title: '',
                text: 'El producto ya está agregado',
                showConfirmButton: false,
                timer: 1000
            })
        }
        else {
            this.insertarCarrito(infoProducto);
        }
        
    }

    //muestra producto seleccionado en carrito
    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td width="10%">
                <img src="${producto.imagen}" width=60px style="border-radius: 15%">
            </td>
                <td style="color: #FFF; font-size: 13px; width=90%"><p style="color: #FFF; height: 5px">${producto.titulo}</p><p style="color: #FFF; height: 5px">Precio: $${producto.precio}</p><p style="color: #FFF; height: 5px">Cantidad: ${producto.cantidad}</p><p class="py-0" style="color: #FFF; padding: 0%; height: 0px">Subtotal: $${producto.precio*producto.cantidad}</td>
                <!--<td style="color: #FFF; font-size: 13px">$${producto.precio}</td>-->
                <!--<td styl    e="color: #FFF; font-size: 13px">${producto.cantidad}</td>-->
                <!--<td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>-->
        `;
            Swal.fire({
                type: 'info',
                title: '¡Bien hecho!',
                text: 'El producto se ha agregado',
                showConfirmButton: false,
                timer: 1000
            })
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
        document.getElementById('cantidad').value = 1;
    }

    //Eliminar el producto del carrito en el DOM
    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
            Swal.fire({
                type: 'info',
                title: '',
                text: 'El producto se ha eliminado',
                showConfirmButton: false,
                timer: 1000
            })
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();

    }

    //Elimina todos los productos
    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
            Swal.fire({
                type: 'info',
                title: '',
                text: 'Se ha vaciado el carrito.',
                showConfirmButton: false,
                timer: 1000
            })
        this.vaciarLocalStorage();

        return false;
    }

    //Almacenar en el LS
    guardarProductosLocalStorage(producto){
        let productos;
        //Toma valor de un arreglo con datos del LS
        productos = this.obtenerProductosLocalStorage();
        //Agregar el producto al carrito
        productos.push(producto);
        //Agregamos al LS
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //Comprobar que hay elementos en el LS
    obtenerProductosLocalStorage(){
        let productoLS;

        //Comprobar si hay algo en LS
        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    //Mostrar los productos guardados en el LS
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            //Construir plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td width="10%">
                <img src="${producto.imagen}" width=60px style="border-radius: 15%">
            </td>
                <td style="color: #FFF; font-size: 13px; width=90%"><p style="color: #FFF; height: 5px">${producto.titulo}</p><p style="color: #FFF; height: 5px">Precio: $${producto.precio}</p><p style="color: #FFF; height: 5px">Cantidad: ${producto.cantidad}</p><p class="py-0" style="color: #FFF; padding: 0%; height: 0px">Subtotal: $${producto.precio*producto.cantidad}</td>
                <!--<td style="color: #FFF; font-size: 13px">$${producto.precio}</td>-->
                <!--<td style="color: #FFF; font-size: 13px">${producto.cantidad}</td>-->
                <!--<td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>-->
            `;
            listaProductos.appendChild(row);
        });
    }

    //Mostrar los productos guardados en el LS en compra.html
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=50>
                </td>
                <td style="color: #FFF; font-size: 11px">${producto.titulo} <p class="font-weight-bold" style="font-size: 15px; color:yellow">$${producto.precio}</p></td>
                <!--<td style="color: #FFF;"">${producto.precio}</td>-->
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales' style="color: #FFF;font-size: 12px">$${producto.precio*producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style=";font-size:35px; background-color: #FFF;border-radius: 100%;" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    //Eliminar producto por ID del LS
    eliminarProductoLocalStorage(productoID){
        let productosLS;
        //Obtenemos el arreglo de productos
        productosLS = this.obtenerProductosLocalStorage();
        //Comparar el id del producto borrado con LS
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        //Añadimos el arreglo actual al LS
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //Eliminar todos los datos del LS
    vaciarLocalStorage(){
        localStorage.clear();
    }

    //Procesar pedido
    procesarPedido(e){
        e.preventDefault();

        if(this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                type: 'error',
                title: '¡Error!',
                text: 'El carrito está vacío, agrega algún producto',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else {
            location.href = "compra.html";
        }
    }

    //Calcular montos
    calcularTotal(){
        let productosLS;
        let total = 0, igv = 0, subtotal = 0;
        productosLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productosLS.length; i++){
            let element = Number(productosLS[i].precio * productosLS[i].cantidad);
            total = total + element;
            
        }
        
        igv = parseFloat(total * 0.13).toFixed(2);
        subtotal = parseFloat(total-igv).toFixed(2);

        //document.getElementById('subtotal').innerHTML = "$ " + subtotal;
        //document.getElementById('igv').innerHTML = "$ " + igv;
        document.getElementById('total').innerHTML = "$" + total.toFixed(2);
    }

    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
            
        }
        else {
            console.log("click afuera");
        }
    }
}