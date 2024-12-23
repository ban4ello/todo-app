import '../styles/TodoItem.css'

/**
 * Свойства:
 * todo - экземпляр задачи
 * toggleTodo - функция для переключения (выполнено / не выполнено)
 * removeTodo - функция для удаления задачи
 */

function TodoItem({ todo, toggleTodo, removeTodo }) {
  return (
    <div className="item">
      <div>
        <input
          type="checkbox"
          checked={ todo.completed }
          onChange={ () => toggleTodo(todo.id) }
        />

        <span> { todo.title } </span>
      </div>
      {/*
      Кнопка удаления задачи.
      При клике запускает функцию removeTodo,
      передавая id задачи.
      */}
      <button onClick={ ()=>removeTodo(todo.id) } className='removeButton'>
        Remove
      </button>

    </div>
  );
}

export default TodoItem;
