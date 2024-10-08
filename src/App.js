// App.js
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
