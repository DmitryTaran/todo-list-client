import {$authHost, $host} from "./index";


export const getTodos = async (boardId) => {
    const {data} = await $authHost.get('api/todo', {params: {boardId}})
    return data
}

export const createTodo = async (text, description, boardId, deadline) => {
    const {data} = await $authHost.post('api/todo', {text, description, boardId, deadline})
    return data
}

export const destroyTodo = async (id) => {
    const {data} = await $authHost.delete('api/todo', {params: {id}})
    return data
}

export const updateTodo = async (updated) => {
    const {data} = await $authHost.put('api/todo', {id: updated.id, ...updated})
    return data
}

export const swapTodos = async (todo1, todo2) => {
    const {data} = await $authHost.put('api/todo/swap', {todo1, todo2})
    return data
}

