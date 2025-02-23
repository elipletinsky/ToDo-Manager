import { todoService } from "../../services/todo.service.js";
import { ADD_TODO, REMOVE_TODO, SET_TODOS, SET_IS_LOADING, UNDO_TODOS, UPDATE_TODO,SET_PRECENT_OF_DONE } from "../reducers/todo.reducer.js";
import { store } from "../store.js";
//car
export function loadTodos() {
    const filterBy = store.getState().todoModule.filterBy
    getCompletionPercentage()
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            // console.log("todos:", todos)
            // getCompletionPercentage(todos)
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
    getCompletionPercentage()
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
            getCompletionPercentage()
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}


export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    // console.log("todo txt",todo.txt,"todo isDone",todo.isDone)
    
    return todoService.save(todo)
        .then((savedTodo) => {
            // console.log("savedTodo txt",savedTodo.txt,"savedTodo isDone",savedTodo.isDone)
            store.dispatch({ type, todo: savedTodo })
            getCompletionPercentage()
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}

export function getCompletionPercentage() {
    const todos = store.getState().todoModule.todos
    if (todos.length === 0){
        return
    } 
    const doneCount = todos.filter(todo => todo.isDone).length;
    
    const percentOfDone = (((doneCount / todos.length) * 100)).toFixed(2);
    // console.log("percentOfDone",percentOfDone)
    // console.log("todos.length/doneCount",todos.length,doneCount )
    store.dispatch({ type: SET_PRECENT_OF_DONE, percentOfDone })
}