import React, { Component } from 'react';
import './App.css';
import { FormTodo } from './componentes/formTodo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bienvenido a mis componentes</h1>
        <FormTodo />
      </div>
    );
  }
}

export default App;
