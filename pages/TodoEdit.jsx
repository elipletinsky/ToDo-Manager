import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveTodo } from "../store/actions/todo.actions.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const [loaded,setLoaded] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    console.log("todoToEdit",todoToEdit)
    useEffect(() => {
        if (params.todoId){
             loadTodo()//.then(()=>setLoaded(loaded=>!loaded))
             
            }else{
                setLoaded(true)
            }
    }, [])

    function loadTodo() {
        todoService.get(params.todoId)
            .then((todo)=>{
                setTodoToEdit(todo)
                setLoaded(true)
            })
            .catch(err => console.log('err:', err))
            
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        console.log("todoToEdit",todoToEdit)
        saveTodo(todoToEdit)
            .then(() => {
                showSuccessMsg('ToDo Saved!')
                navigate('/todo')
            })
            .catch(err => {
                console.log('Had issues saving ToDo', err)
                showErrorMsg('Had issues saving ToDo')
            })
        // todoService.save(todoToEdit)
        //     .then((savedTodo) => {
        //         navigate('/todo')
        //         showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
        //     })
        //     .catch(err => {
        //         showErrorMsg('Cannot save todo')
        //         console.log('err:', err)
        //     })
    }

    const { txt, importance, isDone, backgroundColor, txtColor } = todoToEdit
    console.log("backgroundColor",backgroundColor)
    if (!loaded) return <div>Loading...</div>;
    return (
        <section className="todo-edit">
            <form onSubmit={onSaveTodo} style={{ backgroundColor: backgroundColor, color : txtColor }}>
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input onChange={handleChange} value={importance} type="number" name="importance" id="importance" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={handleChange} value={isDone} type="checkbox" name="isDone" id="isDone" />

                <label htmlFor="backgroundColor">Background Color:</label>
                <input onChange={handleChange} value={backgroundColor} type="color" name="backgroundColor" id="backgroundColor" />

                <label htmlFor="txtColor">Text Color:</label>
                <input onChange={handleChange} value={txtColor} type="color" name="txtColor" id="txtColor" />


                <button>Save</button>
            </form>
        </section>
    )
}