import { todoService } from "../../services/todo.service.js"

//* todos
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const UNDO_TODOS = 'UNDO_TODOS'

//* Shopping cart
export const TOGGLE_CART_IS_SHOWN = 'TOGGLE_CART_IS_SHOWN'
export const ADD_CAR_TO_CART = 'ADD_CAR_TO_CART'
export const REMOVE_CAR_FROM_CART = 'REMOVE_CAR_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'

const initialState = {
    todos: [],
    lastTodos: [],
    filterBy: todoService.getDefaultFilter(),
    isLoading: false,
    shoppingCart: [],
    isCartShown: false,
}

export function todoReducer(state = initialState, cmd = {}) {
    
    switch (cmd.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: cmd.todos
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== cmd.todoId),
                lastTodos: [...state.todos]
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, cmd.todo]
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === cmd.todo.id ? cmd.todo : todo)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case UNDO_TODOS:
            return {
                ...state,
                todos: [...state.lastTodos]
            }

        //* Shopping cart
        case TOGGLE_CART_IS_SHOWN:
            return { ...state, isCartShown: !state.isCartShown }

        case ADD_CAR_TO_CART:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, cmd.todo]
            }

        case REMOVE_CAR_FROM_CART:
            const shoppingCart = state.shoppingCart.filter(todo => todo.id !== cmd.todoId)
            return { ...state, shoppingCart }


        case CLEAR_CART:
            return { ...state, shoppingCart: [] }

        default:
            return state

    }
}

