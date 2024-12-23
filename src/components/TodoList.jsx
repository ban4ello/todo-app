import TodoItem from './TodoItem';
import '../styles/TodoList.css'

/**
 * Свойства:
 * todos - массив задач
 * toggleTodo - функция для переключения (выполнено / не выполнено)
 * removeTodo - функция для удаления задачи
 * 
 * Функции toggleTodo и removeTodo нужно передать в
 * компонент TodoItem, так как они вызываются и используются в нём
 */

function TodoList({ todos, toggleTodo, removeTodo }) {

  return (
    <div className='todoList'>
      {/*
      Здесь мы вызываем метод map(), чтобы
      преобразовать каждый элемент из
      массива todos в компонент TodoItem
      */}
      {
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
        ))
      }
    </div>
  );
}


export default TodoList;