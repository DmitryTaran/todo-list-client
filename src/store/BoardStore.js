import {makeAutoObservable} from "mobx";

export default class BoardStore {

    constructor() {

        this._todoBoards = []

        makeAutoObservable(this)
    }

    setTodoBoards(todoBoards) {
        this._todoBoards = todoBoards
    }

    getCurrentTitle(id) {
        return this.findTodoBoardById(id)?.title
    }

    findTodoBoardById(id) {
        return this._todoBoards.find(board => parseInt(board.id) === parseInt(id))
    }

    addTodoBoard(todoBoard) {
        this._todoBoards.push(todoBoard)
    }

    deleteTodoBoard(id) {
        this._todoBoards = this._todoBoards.filter(board => board.id !== id)
    }

    updateTodoBoard(newBoard) {
        const index = this._todoBoards.findIndex(board => board.id === parseInt(newBoard.id))
        this._todoBoards[index] = newBoard
    }

    get todoBoards() {
        return this._todoBoards
    }
}