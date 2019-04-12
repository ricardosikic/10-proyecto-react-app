import React from 'react';


export class FormTodo extends React.Component {
    constructor() {
        super();
        this.state = { text: '', items: [] };
    }


    componentDidMount() {
        this.getUsers();
    }

    postUser() {
        fetch('https://jsonplaceholder.typicode.com/users' , {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                name: this.state.text //post envio la data que se muestra con el recorrido
            })
        })
            .then(respuesta => {
                console.log(`respuesta del POST: ${respuesta.status}`);
                return respuesta.json();
            })

            .then(datos => {
                console.log(datos);
                this.setState({
                    items: this.state.items.concat(datos)
                });
            })
            console.log(this.state.users);      

    }

    
    getUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(resp => {
            console.log(resp.status);
            return resp.json();
        })
        .then(datos => {
            console.log(datos);
            this.setState({
                items: datos
            })
        })
    } 
    
    handleData(e) {
        this.setState({
            text: e.target.value
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        alert('llego el dato ' + this.state.text);
        if(!this.state.text.length) {
            alert('Agrega datos');
        } 

        this.postUser();
        // const newItem = {
        //     text: this.state.text
        // }
        // this.setState({
        //     items: this.state.items.concat(newItem)
        // });
    }

    removeItem(i, e) {
        //almaceno los elementos de los arrays actualizados en esta variable
        const itemes = this.state.items;
        itemes.splice(i, 1);
        this.setState(
            {itemes}
        );
    }

    render() {
         const listaItems = this.state.items.map( (valor, i) => {
             return <li key={i} onClick={e => this.removeItem(i, e)}>{valor.name}</li>
         })

        return(
            <div class="container">
                <h1>Todo List</h1>
               <div className="row" style={{marginLeft: '38%'}}> 
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label>Usuarios:</label>
                        <input className="form-control" style={{width: '200px'}} value={this.state.text} onChange={e => this.handleData(e)} placeholder="Cosas por hacer ..."></input>
                    </div>
                    <button className="btn btn-success">Agregar</button>
                </form>
               </div> 

                <h2>Lista de usuarios:</h2>
                {listaItems}
                <p>Usuarios: {this.state.items.length}</p>
            </div>
        );
    }
}