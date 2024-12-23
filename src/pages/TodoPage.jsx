import { useState } from 'react';
import { Link } from 'react-router-dom';
import TodoList from '../components/TodoList';
import '../styles/App.css'

function App() {

  const [todos, setTodos] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  // Функция для переключения состояния задачи
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  };

  // Функция для добавления задачии
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  // Функция для удаления задачи
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  
  // Параметры для селекта с фильтрами
  const options = [
    {value: 'all', name: 'All tasks'},
    {value: 'finished', name: 'Only finished'},
    {value: 'unfinished', name: 'Only unfinished'},
  ]
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Функция, возвращающая уже отфильтрованный список задач
  const displayedTodos = () => 
    selectedFilter === 'all' ? todos
    : todos.filter(todo => selectedFilter === 'finished' ? todo.completed === true : todo.completed === false )

  return (
    <div className='todosApp'>
      <h1>My To-Do List</h1>
      <form onSubmit={addTodo} className='todosForm'>
        
        {/*
        В React вместо <input type="select"> используют
        встроенный компонент <select>. 
        */}
        <select value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)}>
        {
          options.map((option, index) => (
            <option key={index} value={option.value}>{option.name}</option>
          ))
        }
        </select>
        <div>
          <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
          />
          <button type="submit">Add</button>
        </div>
      </form>
      <TodoList todos={displayedTodos()} toggleTodo={toggleTodo} removeTodo={removeTodo} />
      <Link to="/dnd" >To columns</Link>
    </div>
  );
}

export default App;