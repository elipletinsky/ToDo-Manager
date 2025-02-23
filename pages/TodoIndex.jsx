import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";
import { DataTable } from "../cmps/data-table/DataTable.jsx";
import { todoService } from "../services/todo.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { loadTodos, removeTodo, removeTodoOptimistic, saveTodo, getCompletionPercentage} from "../store/actions/todo.actions.js";
import { getTruthyValues } from "../services/util.service.js";
import { SET_FILTER_BY, SET_TODOS } from "../store/reducers/todo.reducer.js";

const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;
const { useSelector, useDispatch } = ReactRedux;

export function TodoIndex() {
  // const [todos, setTodos] = useState(null)

  const todos = useSelector((storeState) => storeState.todoModule.todos);
  const toggledtodo = useSelector((storeState) => storeState.todoModule.todos.isDone);
  const filterBy = useSelector((storeState) => storeState.todoModule.filterBy);
  const isLoading = useSelector(
    (storeState) => storeState.todoModule.isLoading
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [srcParamsfilterBy, setSrcParamsfilterBy] = useState(
    todoService.getFilterFromSearchParams(searchParams)
  );
  // const [toggled, setToggled] = useState(false)
  const dispatch = useDispatch();

  // Special hook for accessing search-params:
  

  //const filterFromSearchParams = todoService.getFilterFromSearchParams(searchParams);

  // const [filterBy, setFilterBy] = useState(defaultFilter)

  useEffect(() => {
    // console.log("searchParams",searchParams)
    // console.log("srcParamsfilterBy",srcParamsfilterBy)
    // console.log("filterBy",filterBy)
    // setSrcParamsfilterBy(todoService.getFilterFromSearchParams(searchParams))
    setSearchParams(getTruthyValues(filterBy))
    loadTodos().catch(() => showErrorMsg("cannot load todos"));

    
    // todoService.query(filterBy)
    //     .then(todos => setTodos(todos))
    //     .catch(err => {
    //         console.log('err:', err)
    //         showErrorMsg('Cannot load todos')
    //     })
  }, [filterBy]);

  function onRemoveTodo(todoId, todotxt) {
    if(confirm(`delete ${todotxt}`)){
      removeTodoOptimistic(todoId)
      .then(() => {showSuccessMsg("ToDo removed")
        // getCompletionPercentage(todos)
      })
      .catch(() => showErrorMsg("Cannot remove ToDo"));
    }
  }

  function onToggleTodo(todo) {
    // console.log("onToggleTodo",todo.txt,todo.isDone)
    console.log("todo txt",todo.txt,"todo isDone",todo.isDone)
    const todoToSave = { ...todo, isDone: !todo.isDone };
    // console.log("todoToSave",todoToSave)
    saveTodo(todoToSave)
      .then(() => {showSuccessMsg("ToDo updated")
      // getCompletionPercentage(todos)
    })
    .catch(() => showErrorMsg("Cannot update ToDo"));
  }
  
  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy });
  }

  if (!todos) return <div>Loading...</div>;
  return (
    <section className="todo-index">
      <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <div>
        <Link to="/todo/edit" className="btn">
          Add Todo
        </Link>
      </div>

      {!isLoading ? (
        <div>
          <h2>Todos List</h2>
          <TodoList
            todos={todos}
            onRemoveTodo={onRemoveTodo}
            onToggleTodo={onToggleTodo}
            // onEditToDo={onEditToDo}
          />
          <hr />
          <h2>Todos Table</h2>
          <div style={{ width: "60%", margin: "auto" }}>
            <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
          </div>
        </div>
      ) : (
        <div>Loading..</div>
      )}

      {/* <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div> */}
    </section>
  );
}
