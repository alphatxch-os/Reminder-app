

import React from 'react';
import TodoList from './ToDoList'; 

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TodoList />
      </header>
    </div>
  );
};

export default App;
