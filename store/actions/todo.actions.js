import { todoService } from "../../services/todo.service.js";
import { ADD_TODO, REMOVE_TODO, SET_TODOS, SET_IS_LOADING, UNDO_TODOS, UPDATE_TODO } from "../reducers/todo.reducer.js";
import { store } from "../store.js";
//car
export function loadTodos() {
    const filterBy = store.getState().todoModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            // console.log("todos:", todos)
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeTodoOptimistic(todoId) {
    store.dispatch({ type: REMOVE_TODO, todoId })
    return todoService.remove(todoId)
        .catch(err => {
            store.dispatch({ type: UNDO_TODOS })
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function removeTodo(todoID) {
    return todoService.remove(todoID)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoID })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}


export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    // console.log("saveTodo type",type)
    return todoService.save(todo)
        .then((savedTodo) => {
            store.dispatch({ type, savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}