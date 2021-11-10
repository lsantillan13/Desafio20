/*MY IO*/
const socket = io.connect('http://localhost:8080');
/*When document.ready*/
window.onload = function(){
    /*Creation*/
     const tb = document.createElement('tbody');
     const tdName = document.createElement('td');
     const tdPrice = document.createElement('td');
     const tdPicture= document.createElement('td');
     const tdId = document.createElement('td');
     const tdOptions = document.createElement('td');
    const div = document.getElementsByClassName('products-list');
    /*Update*/
     const updateBtn = document.createElement('p');
     const img2 = '<p class="parrafo"> <img class="update" src="https://svgsilh.com/svg_v2/1615049.svg"> </p>';
    /*Delete*/
     const deleteBtn = document.createElement('p'); deleteBtn.style.height = '100px';
     const img1 = '<p class="parrafo"> <img class="delete" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Remove_font_awesome.svg/512px-Remove_font_awesome.svg.png"> </p>';
    /* DOM Manipulation */
    const first = document.getElementById('titleGuardar');
    const second = document.getElementById('price');
    const third = document.getElementById('thumbnail');
    const btn = document.getElementById('btn');
    const table = document.getElementById('myTable');
    /*Delete*/let deleteFn = () => {deleteBtn.addEventListener('click', function (){alert('DELETE')})}; deleteBtn == undefined ? null : deleteFn();
    /*Update*/ let updateFn = () => {updateBtn.addEventListener('click', function (){alert('UPDATE')})}; updateBtn == undefined ? null : updateFn(); 
    /*Event Handler*/
        /*Push de productos al UI*/
            btn.addEventListener('click', function () {
                socket.emit('products:send', product = {
                    title: first.value,
                    price: second.value,
                    image: third.value,
                }) &&           
                /*Productos literales*/ socket.emit('products:db', product = {
                    title: first.value,
                    price: second.value,
                    image: third.value});
            });
    /*KNEX*/
    socket.on('products:receive', function (data){
        const mapped = data.map((e) => e);
    /*Inner*/
        for ( i = 0; i <= data.length -1; a = 0){
            tdName.innerHTML += `<p class="parrafo selected number-${i}"> ${mapped[i].title} </p>`
            tdPrice.innerHTML += `<p class="parrafo selected number-${i}"> ${mapped[i].price} </p´>`
            tdPicture.innerHTML += `<p class="parrafo selected number-${i}"> <img src="${mapped[i].image}" alt="image_of_${mapped[i].title}" class="product_image"/> </p>`;
            tdId.innerHTML += `<p class="parrafo selected $numer-${i}">${mapped[i].id}</p>`
            deleteBtn.innerHTML += `${img1}`;
            updateBtn.innerHTML += `${img2}`;
            tdOptions.innerHTML += `<p class="parrafo selected number-${i}"> ${deleteBtn} ${updateBtn} </p>`;
            i++;
            console.log(data.length);
        };
        //
        for (product in data){
            const tr = document.createElement('tr');
            /*Append*/
            tb.appendChild(tr);
            tr.appendChild(tdName);
            tr.appendChild(tdPrice);
            tr.appendChild(tdPicture);
            tr.appendChild(tdId);
            tr.appendChild(deleteBtn);
            tr.appendChild(updateBtn)
            table.appendChild(tb);
        }        
    });
     
/****************************************************************************************************************************************************************/
                                                                        /*Chat*/
    const output = document.getElementById('output');
    const actions = document.getElementById('actions');
    const username = document.getElementById('username');
    const message = document.getElementById('message');
    const myBtn = document.getElementById('button');
/*User: está escribiendo...*/
message.addEventListener('keypress', function () { socket.emit('chat:typing', username.value);});
    /*FECHA Y HORA*/
     const timeNow = new Date();
        function getHour(){
         const hours = timeNow.getHours().toString().length < 2 ? "0" + timeNow.getHours() : timeNow.getHours();
         const minutes = timeNow.getMinutes().toString().length < 2 ? "0" + timeNow.getMinutes() : timeNow.getMinutes();
         const secs =  timeNow.getSeconds().toString().length < 2 ? "0" + timeNow.getSeconds() :  timeNow.getSeconds();
         let mainTime = `${hours}:${minutes}:${secs}`;
        return mainTime;
     };
     function getDate(){
        const month = timeNow.getMonth();
        const days = timeNow.getDate();
        const year = timeNow.getFullYear();
        const mainDate = `${days}/${month}/${year}`;
     }
    /* Mensaje */
     let fechaActual  = new Date();
     const dateMsg = ` ${fechaActual.getDate()}/${fechaActual.getMonth()}/${fechaActual.getFullYear()}`;   
     socket.on('message:send', function (data){
        actions.innerHTML = ``;
        output.innerHTML += `<p> <strong>${data.mail}</strong> <i class="notItalic">[${dateMsg} ${getHour()}]</i> : <i>${data.message}</i> </p>`;
     });

    /*Primer formulario*/
    myBtn.addEventListener('click', function(){
    /*Message Insert*/
     socket.emit("message:insert", obj={
      message: message.value,
       mail: username.value,
        fecha: `[${dateMsg} ${getHour()}]`});
     /*Message Read*/
     socket.emit("message:read", true);
     /*Message Update*/
     socket.emit("message:update", true);
     /*Message Dlete*/
     socket.emit("message:delete", true);
    })
    /*User: está escribiendo...*/
    socket.on('chat:typing', (data) => {
        actions.innerHTML = `<p> <em>${data} está escribiendo...</em> </p>`
    });    
};