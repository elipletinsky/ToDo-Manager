const { useState, useEffect, useRef } = React
import { debounce } from "../services/util.service.js"

export function TodoFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
    // const onSetToDoFilter = useRef(debounce(onSetFilter)).current
    onSetFilter = useRef(debounce(onSetFilter)).current
    useEffect(() => {
        // Notify parent
        onSetFilter(filterByToEdit)
        // onSetToDoFilter(filterByToEdit)
    }, [filterByToEdit])

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

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }
    // Add filter by <select>: All | Active | Done 
    const select =["All","Active","Done"]
    const { txt, importance, status } = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance {`>=`}: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />
                <label htmlFor="select">filter by</label>
                {/* language === "" ? 'choose language' : language */}
                <select value={status} onChange={handleChange} name="select" id="select">
                    {/* <option value="all"></option> */}
                    {select.map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}