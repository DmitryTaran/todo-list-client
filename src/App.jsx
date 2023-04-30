import {createContext} from 'react'
import './App.css'
import AppRouter from "./components/AppRouter/AppRouter.jsx";
import BoardStore from "./store/BoardStore.js";
import TodoListStore from "./store/TodoListStore.js";
import UserStore from "./store/UserStore.js";

export const Context = createContext(null)

function App() {

    return (
        <Context.Provider value={
            {
                boardStore: new BoardStore(),
                todoListStore: new TodoListStore(),
                userStore: new UserStore()
            }
        }>
            <AppRouter/>
        </Context.Provider>

    )
}

export default App
