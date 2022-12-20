const socket = io.connect();

//------------------------------------------------------------------------------------
function renderProducts(data){
    const html = data.map(p =>{
        return (`<div class='row mt-1 mb-1 d-flex align-items-around justify-content-evenly'>
                <div class='col mt-1 mb-1 d-flex justify-content-start'>${p.producto}</div>
                <div class='col mt-1 mb-1 d-flex justify-content-start'>$ ${p.precio}</div>
                <div class='col mt-1 mb-1 d-flex justify-content-start'>
                    <img class='img-fluid' width='25%' src='${p.foto}'>
                </div>
                </div>
                <hr>`)
    }).join(' ');

    document.getElementById('tableProducts').innerHTML = html;
}

function addProduct(){
    const producto = document.getElementById('producto').value;
    const precio = document.getElementById('precio').value;
    const foto = document.getElementById('foto').value;

    const newProduct = {
        producto: producto,
        precio: precio,
        foto: foto
    }

    socket.emit('newProduct', newProduct);

    return false
}

socket.on('productos', data => {
    renderProducts(data)
})

//------------------------------------------------------------------------------------
function renderChat(data){
    const html = data.map(item => {
        return (`<div>
                    <strong>${item.author}</strong> [at ${item.time}]: <em>${item.text}</em>
                </div>
                <hr>`)
    }).join(' ')

    document.getElementById('message').innerHTML = html;
}

function addMessage() {
    const authorName = document.getElementById('author').value;
    const textMsn = document.getElementById('text').value;
    const time = new Date();

    const message = {
        author: authorName,
        text: textMsn,
        time: time
    }

    document.getElementById('text').value = '';

    socket.emit('newMessage', message);

    return false;
}

socket.on('messages', data => {
    renderChat(data);
})