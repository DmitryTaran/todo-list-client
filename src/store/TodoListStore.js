import {makeAutoObservable} from "mobx";

export default class TodoListStore{
    constructor() {
        this._todoList = []


        makeAutoObservable(this)
    }

    setTodoList(todoList){
        this._todoList = todoList
    }

    addTodo(todo){
        this._todoList.push(todo)
    }

    deleteTodo(id){
        this._todoList = this._todoList.filter(todo => todo.id !== id)
    }

    findTodoById(id){
      return this._todoList.find(todo => todo.id === id)
    }
    setTodoTitle(id, text){
        const index = this._todoList.findIndex(todo => todo.id === id)
        const todo = this.findTodoById(id)
        this.todoList[index] = {...todo, text}
    }

    updateTodo(id, todo){
        const index = this._todoList.findIndex(todo => parseInt(todo.id) === parseInt(id))
        this.todoList[index] = todo
    }

    get todoList(){
        return this._todoList
    }

}