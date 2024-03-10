import { useState } from 'react'
export default ( { onAdd }) => {
  const [enteredTask, setEnteredTask] = useState('') 

  const handleClick= () => {
    if (enteredTask.trim() === '') {
      return;
    }
    setEnteredTask('')
    onAdd(enteredTask)
  }

  return <div className="flex items-center gap-4">
    <input type="text" 
    className="w-64 px-2 py-1 rounded-sm bg-stone-200" 
    value={enteredTask}
    onChange={e => setEnteredTask(prevValue => e.target.value)}
    />
    <button className="text-stone-700"
      onClick={handleClick}
    >
      Add Task
    </button>
  </div>
}