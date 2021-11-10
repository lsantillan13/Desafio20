//KNEX
        //Guardado de productos
        const newArr = [];
        socket.on('products:db', (data) => {
            
            newArr.push(data);
/*C*/   /*CREATE*/ 
            knex('productos').insert(newArr)
              .then( () => { console.log('Filas insertadas') && knex.destroy();})
              .catch(e => {console.log('Ocurrio un error:', e) && knex.destroy();});
            });

/*R*/   /*READ*/
        socket.on('products:send', function(){
            knex.select('*').from('productos')
            .then((rows) => console.log(rows) && socket.emit('products:receive', rows))
            .catch((err) => {console.log(err); throw err})
        });

/*U*/   /*UPDATE*/
             knex.from('productos').where('price', 0).update({price: 1})
             .then(() => {console.log('product updated')})
             .catch((err) => { console.log(err); throw err});
/*D*/    /*DELETE & TRUNCATE*/
        let borrar = () => {
            knex.from('productos').del()
            .then(() => console.log('products succesfully deleted'))
            .catch((err) => {console.log(err); throw err})
        }; //borrar();
      