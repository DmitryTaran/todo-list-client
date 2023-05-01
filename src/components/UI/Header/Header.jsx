import React, {useContext} from 'react';
import cl from './header.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {Context} from "../../../App.jsx";
const Header = () => {

    const {userStore, boardStore, todoListStore} = useContext(Context)

    const navigate = useNavigate()

    const logOut = () => {
        localStorage.clear()
        userStore.setIsAuth(false)
        userStore.setUser({})
        boardStore.setTodoBoards([])
        todoListStore.setTodoList([])
        navigate('/')
    }

    return (
        <header className={cl.header}>
            <NavLink to='/' className={cl.link}>
                <h1>TodoList</h1>
            </NavLink>
            {userStore.isAuth &&
                <button onClick={logOut}>Выйти</button>
            }



        </header>
    );
};

export default Header;