import { useState } from 'react'
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), todo: newTodo, isCompleted: false }]);
      setNewTodo("");
    }
  }

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  }

  const handleCheckbox = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-100 my-5 rounded-xl p-5 min-h-[80vh]">
        <div className="addTodo">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={newTodo} type="text" className="w-1/2" />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-900 text-white p-2 py-1 text-sm font-bold rounded-md mx-5'>Add</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.map(item => (
            <div key={item.id} className="todo flex w-1/3 my-3 justify-between">
              <input
                onChange={() => handleCheckbox(item.id)}
                type="checkbox"
                checked={item.isCompleted}
              />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="button">
                <button className='bg-violet-800 hover:bg-violet-900 text-white p-2 py-1 text-sm font-bold rounded-md mx-3'>Edit</button>
                <button className='bg-violet-800 hover:bg-violet-900 text-white p-2 py-1 text-sm font-bold rounded-md mx-1'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
