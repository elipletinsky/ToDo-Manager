const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
const { useSelector, useDispatch } = ReactRedux
import { login, signup,logout } from '../store/actions/user.actions.js'

export function AppHeader() {
    const navigate = useNavigate()
    // const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const percentOfDone = useSelector((storeState) => storeState.todoModule.percentOfDone);
    // console.log("user",user)
    // console.log("AppHeader percentOfDone",percentOfDone)
    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
        
        // userService.logout()
        //     .then(() => {
        //         onSetUser(null)
        //     })
        //     .catch((err) => {
        //         showErrorMsg('OOPs try again')
        //     })
    }

    function onSetUser(user) {
        //setUser(user)
        //onLogin(user)
        navigate('/')
    }


    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
                {user ? (
                    < section  className='user-Info' style={{ backgroundColor: user.backgroundColor, color : user.txtColor }}>
                        <h2><Link to={`/user/${user._id}`}>Hello {user.fullname}</Link></h2>
                        <span>{percentOfDone}% of ToDos are Done </span>
                        <span> balance {user.balance}</span>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
            </section>
            <UserMsg />
        </header>
    )
}
