import { useState , useEffect } from 'react'
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa"; 
import { MdOutlineDeleteSweep } from "react-icons/md";
function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)
  useEffect(() => {
  let todoString =localStorage.getItem("todos")
  if(todoString){
   let todos = JSON.parse(localStorage.getItem("todos"))
   setTodos(todos)
  }
 
  }, [])
  

  const saveToLS = (e) => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  }
  
  const toggleFinished= (e) => {
    setShowFinished(!showFinished)

  }
  

  const handleAdd = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), todo: newTodo, isCompleted: false }]);
      setNewTodo("");
    }
    saveToLS();
  }

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => item.id!== id);
    setTodos(newTodos);
    saveToLS();
  }

  const handleEdit = (id) => {
    let t = todos.find(i => i.id === id);
    if (t) {
      setNewTodo(t.todo);
      let newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveToLS();
    }
  }
  
  

  const handleCheckbox = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
    saveToLS();
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto bg-violet-100 my-5 rounded-xl p-5 min-h-[80vh] md:w-[45%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={newTodo} type="text" className="w-full rounded-full px-5 py-1" />
          <button onClick={handleAdd} disabled={newTodo.length<=3}className='bg-violet-800 hover:bg-violet-900 disabled:bg-violet-700 text-white p-4 py-2 text-sm font-bold rounded-full mx-2  '>Save</button>
        </div>
        </div>
        <input className="my-4"onChange={toggleFinished} type="checkbox" checked={showFinished} id='show' /><label htmlFor="show" className='mx-2'> Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl  font-bold'>Your Todos</h2>
        <div className="todos">
        {todos.length===0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {
            
            return ((showFinished)|| (!item.isCompleted)) &&  <div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5'>
              <input onChange={() => handleCheckbox(item.id)} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={()=>handleEdit(item.id)} className='bg-violet-800 hover:bg-violet-900 text-white p-2 py-1 text-sm font-bold rounded-md mx-3'><FaEdit/></button>
                <button onClick={()=>handleDelete(item.id)} className='bg-violet-800 hover:bg-violet-900 text-white p-2 py-1 text-sm font-bold rounded-md mx-1'><MdOutlineDeleteSweep /></button>
              </div>
            </div>
            })}
        </div>
      </div>
    </>
  )
}

export default App
 