import express from 'express';

import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

import ProductosApi from "../api/ProductosApi.js";
const producto = new ProductosApi();

import ChatApi from '../api/ChatApi.js';
const chat = new ChatApi();

//--------------------------------------------
// instancio servidor, socket y api
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//--------------------------------------------
// agrego middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// configuro el socket
io.on('connection', socket => {
    console.log('Nuevo cliente conectado!');
    //productos
    const productos = producto.getAll();
    socket.emit('productos', productos);

    socket.on('newProduct', data => {
        producto.create(data)
        io.sockets.emit('productos', productos);
    });
    //mensajes
    const messages = chat.getAll();
    socket.emit('messages', messages)
    
    socket.on('newMessage', message => {
        chat.newMessage(message);
        io.sockets.emit('messages', messages);
    })
});

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))