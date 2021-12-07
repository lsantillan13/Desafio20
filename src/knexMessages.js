/* funct = (async () => {
    try{
        await knex.schema.dropTableIfExists('messages')
        .then(() => {console.log('tabla borrada');})
        .catch(err => {console.log('Ocurrio un error al borrar:', err)});

        await knex.schema.createTable('messages', table => {
        //CREATE
        table.string('message'),
        table.string('mail'),
        table.string('fecha')})
        .then(() => {console.log('Tabla creada');})
        .catch(err => {console.log('Ocurrio un error al crear', err)});
        const myArr = [];
       socket.on('message:insert', async (data)  => {
        myArr.push({...data});
        await knex('messages').insert(data)
        .then(() => {console.log('Mensaje insertado') && knex.destroy()})
        .catch(e => {console.log('Ocurrio un error:', e) && knex.destroy();});
        io.sockets.emit('message:send', data);
       });

    let messageRead = async () => {
        //READ
     let mensajes = await knex.from('messages').select('*');
      console.log('Listando mensajes...')
       for(mensaje of mensajes){console.log(`Usuario: ${mensaje['mail']} | Fecha/Hora: ${mensaje['fecha']} - Mensaje: ${mensaje['message']}`);};
        //console.log(mensajes)
    }   
socket.on("message:read", (arg) => {arg === true ? messageRead() : console.log('Ocurrio un error en la lectura de mensajes')});

    let updateFunct = async () =>{
        //UPDATE
     await knex.from('messages').update('message', 'hola!')
      .then(()=> {console.log('Mensaje Actualizado!')})
       .catch(e => {console.log('Ha ocurrido un error al actualizar:', e)})
        let readFunct = () => {knex('messages').where('message', 'hola!').then(res => console.log(res));}; readFunct();
    }

socket.on("message:update", (arg) => {arg === true ? updateFunct() : console.log('Ocurrio un error en la función Actualizar')});    

    let deleteFunct = () => {
        //DELETE
     knex('messages')
      .where('message', 'hola!')
       .del()
        .then(res => console.log('Mensaje Borrado!') && console.log(res))
    }
socket.on("message:delete", (arg) => {arg === true ? deleteFunct() : console.log('Ocurrio un error en la función Borrar')});

    }
    catch(err){
    console.log('Ha ocurrido un error:', err);
     knex.destroy();
   }
});
*/