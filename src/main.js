import express from 'express';
import { options } from './config.js';

import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

import ProductosApi from "../api/ContenedorSQL.js";
const producto = new ProductosApi(options.sqlite3, 'products');

import ChatApi from '../api/ChatApi.js';
const chat = new ChatApi(options.sqlite3, 'chat');

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
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');
    //productos
    const productos = await producto.getAll();
    socket.emit('productos', productos);

    socket.on('newProduct', async data => {
        producto.create(data);
        const productos = await producto.getAll();
        io.sockets.emit('productos', productos);
    });
    
    //mensajes
    const messages = await chat.getAll();
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