import { useRef } from 'react'
import Input from "./Input"
import Modal from './Modal'
export default ({ onAdd, onCancel }) => {

  const modal = useRef() 
  const title = useRef()
  const description = useRef()
  const dueDate = useRef()

  const handleSave = () => {
    const enteredTitle = title.current.value
    const enteredDescription = description.current.value
    const enteredDueDate = dueDate.current.value

    if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
      modal.current.open()
      return;
    }
    
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    })
  }

  return <>
    <Modal ref={modal} 
      buttonCaption="Okay"
    >
      <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Inputs</h2>
      <p className='text-stone-600 mb-4'>Oops ... looks like oyu fogot to enter values</p>
      <p className='text-stone-600 mb-4'>Please Make Sure you provide a valid input to all the fields</p>
    </Modal>
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950"
            onClick={onCancel}
          >
            Cancel
          </button>
        </li>
        <li>
          <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 "
            onClick={handleSave}
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input ref={title}
          type="text"
          label="Title"
        /> 
        <Input ref={description}
          label="Description"
          textarea
        />
        <Input ref={dueDate}
          type="date"
          label="Due Date"
        />

      </div>
    </div>
  </>
}