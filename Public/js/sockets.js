/*MY IO*/
const socket = io.connect('http://localhost:8080');
/*When document.ready*/
window.onload = function(){
    /*Login*/
    const button = document.getElementById('loginBtn');
    const userLogin = document.getElementById('login')
    button.addEventListener('click', () => {
        socket.emit('login:data', userLogin.value);
    })
    
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
    const name = document.getElementById('titleGuardar');
    const price = document.getElementById('price');
    const image = document.getElementById('thumbnail');
    const description = document.getElementById('description');
    const code = document.getElementById('Code');
    const stock =  document.getElementById('Stock');

    const btn = document.getElementById('btn');
    const table = document.getElementById('myTable');
    /*Delete*/let deleteFn = () => {deleteBtn.addEventListener('click', function (){alert('DELETE')})}; deleteBtn == undefined ? null : deleteFn();
    /*Update*/ let updateFn = () => {updateBtn.addEventListener('click', function (){alert('UPDATE')})}; updateBtn == undefined ? null : updateFn(); 
    /*Event Handler*/
        /*Push de productos al UI*/
        let productId = 0;
            btn.addEventListener('click', function () {
                productId++
                socket.emit('products:send', product = {
                    name: name.value,
                    description: description.value,
                    code: code.value,
                    stock: stock.value,
                    price: price.value,
                    image: image.value,
                    id: productId,
                });
                // /*Productos literales*/ socket.emit('products:db', product = {
                //     title: first.value,
                //     price: second.value,
                //     image: third.value});
            });
    /*KNEX*/
    socket.on('products:resend', (data, data1) => {
        const datos = data1;
    /*Inner*/
        tdName.innerHTML += `<p class="parrafo selected"> ${datos.name} </p>`
        tdPrice.innerHTML += `<p class="parrafo selected"> ${datos.price} </p´>`
        tdPicture.innerHTML += `<p class="parrafo selected"> <img src="${datos.image}" alt="image_of_${datos.name}" class="product_image"> </p>`;
        tdId.innerHTML += `<p class="parrafo selected">${datos.id}</p>`
        deleteBtn.innerHTML += `${img1}`;
        updateBtn.innerHTML += `${img2}`;
        tdOptions.innerHTML += `<p class="parrafo selected"> ${deleteBtn} ${updateBtn} </p>`;
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
     
/*****************************************************************************//*Chat*//************************************************************************/                              
    /*Message content*/
    const output = document.getElementById('output');                   // Msg output
    const actions = document.getElementById('actions');                 // @User is writing...
    /*User info*/
    const userEmail = document.getElementById('username');                  // Mensaje = {author:{ id: 'mail'}};
    const userUsername = document.getElementById('name');
    const userSurname = document.getElementById('surname');                   
    const userAge = document.getElementById('age');
    const userNick = document.getElementById('nick');
    const userAvatar = document.getElementById('avatar');
    const userMessage = document.getElementById('message');                 // Mensaje = {Text:{'mensaje'}}
    /*Send message button*/
    const myBtn = document.getElementById('button');
    /*User: está escribiendo...*/
userMessage.addEventListener('keypress', () => { socket.emit('chat:typing', userEmail.value);});
    let newDate = () => { return new Date();};
     /*FECHA Y HORA*/
     let getTheDate = () => {
         /*Time*/
        let hours = newDate().getHours().toString().length < 2 ? "0" + newDate().getHours() : newDate().getHours();
        let minutes = newDate().getMinutes().toString().length < 2 ? "0" + newDate().getMinutes() : newDate().getMinutes();
        let secs =  newDate().getSeconds().toString().length < 2 ? "0" + newDate().getSeconds() :  newDate().getSeconds();
        let mainTime = `${hours}:${minutes}:${secs}`;
         /*Date*/
        let month = newDate().getMonth();
        let days = newDate().getDate();
        let year = newDate().getFullYear();
        let mainDate = `${days}/${month}/${year}`;
        let theWholeThing = ` [${mainDate} ${mainTime}]: `
         return theWholeThing;
     };

/*Primer formulario*/
    myBtn.addEventListener('click', () => {
    /*Message Insert*/
     socket.emit("message:insert", obj={
      message: message.value,
       mail: username.value,
        fecha: `${getTheDate()}`});
    
    /*Message Read*/
     socket.emit("message:read", true);
    /*Message Update*/
     socket.emit("message:update", true);
    /*Message Dlete*/
     socket.emit("message:delete", true);

     socket.emit('datos', mensaje = {
        id: '1000',
        author: {
          id: userEmail.value,
          nombre: userUsername.value,
          apellido: userSurname.value,
          edad: userAge.value,
          alias: userNick.value,
          avatar: userAvatar.value,
        },
        text: userMessage.value},
        );
    });

    /* Mensaje */    
    socket.on('message:send', (data) => {
        actions.innerHTML = ``;
        output.innerHTML += `<p> <strong>${data.mail }</strong> <i class="notItalic"> ${ getTheDate() } </i>  <i> ${ data.message } </i> <img class="chat__avatar" src="${avatar}"></p>`;
     });
    
    /*User: está escribiendo...*/
    socket.on('chat:typeado', (data) => {
        data === '' ? data = 'Usuario' : data = data;
        actions.innerHTML = `<p> <em>${data} está escribiendo...</em> </p>`
    });

};