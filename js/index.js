
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
	           function login(){       
        if(document.getElementById('correo').value == '' && document.getElementById('password').value == ''){
            window.location="index.html";
        }else{
            alert('Intentalo de nuevo. Has ingresado datos erróneos.');
        }
        };
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        $('#btnLanzarAlerta').on('click', this.probarConexion);
        $('#conexion').on('click', this.sqlite3);
        $('#btnlogin').on('click', this.probarConexion);
    },

    probarConexion: function(){
        window.sqlitePlugin.echoTest(function(){
            alert('Conexión exitosa.');
        });
    },

    sqlite3: function(){
        var db = window.sqlitePlugin.openDatabase({name: 'dbproductos.db', location: 'default'});

        db.transaction(function(tx){
            tx.executeSql('create table if not exists productos(id, titulo, precio)');
            tx.executeSql('insert into productos values (?, ?, ?)', ['1', 'Aceite Valvoline', '33.00']);
        },
        function(error){
            alert('Transaction ERROR:'+error.message);
        },
        function(){
            alert('Proceso correcto');
        });

        db.transaction(function(tr){
            tr.executeSql('select id, titulo, precio from productos where id=?', ['1'], function(tr, rs){
                alert('El producto encontrado es: '+ rs.rows.item(0).id + ' '+rs.rows.item(0).titulo+' '+rs.rows.item(0).precio);
            });
        },
        function(error){
                        alert('Query ERROR:'+error.message);
        },
        function(){
            alert('Consulta correcta');
        });
    },//fin function sqlite3
};

app.initialize();