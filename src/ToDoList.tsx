import React, { useState, useEffect } from 'react';
import './ToDoList.css';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: todos.length + 1,
        text: inputText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const handleCompleteTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    const completedTodo = todos.find(todo => todo.id === id);
    if (completedTodo && !completedTodo.completed) {
      setCompletedTodos([...completedTodos, { ...completedTodo, completed: true }]);
    }
  };

  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const updatedTodos = todos.filter(todo => !todo.completed);
      setTodos(updatedTodos);
    }, 10000); 
    return () => clearTimeout(timer);
  }, [todos]);

  const pendingTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todo-list-container">
      <h2>Reminder List</h2>
      <div className="todo-input-container">
        <input
          className="todo-input"
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Enter a new reminder"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <p>Total to do: {todos.length}</p>
      <p>Completed: {completedTodos.length}</p>
      <p>Pending: {pendingTodos.length}</p>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCompleteTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            {!todo.completed && (
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
      <div className="completed-todos">
        <h3>Completed Todos</h3>
        <ul>
          {completedTodos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
