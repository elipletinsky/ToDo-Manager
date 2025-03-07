const { useState, useEffect } = React;
import { getBaseUrl } from "../services/util.service.js";


export function TodoPreview({ todo, onToggleTodo }) {
    const [toggled, setToggled] = useState(todo.isDone)

    useEffect(() => {
        
    }, [toggled])

    function onToggleTodoclicked(){
        setToggled(prevToggled => !prevToggled)
        onToggleTodo(todo)
    }

    return (
        <article className="todo-preview" style={{ backgroundColor: todo.backgroundColor, color : todo.txtColor }}>
            <h2 className={(toggled)? 'done' : ''} onClick={onToggleTodoclicked}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            <img src={`${getBaseUrl()}/assets/img/${'todo'}.png`} alt="" />
        </article>
    )
}
