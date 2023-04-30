import {$authHost, $host} from "./index";


export const getTodos = async (boardId) => {
    const {data} = await $authHost.get('api/todo', {params: {boardId}})
    return data
}

export const createTodo = async (text, description, boardId) => {
    const {data} = await $authHost.post('api/todo', {text, description, boardId})
    return data
}

export const destroyTodo = async (id) => {
    const {data} = await $authHost.delete('api/todo', {params:{id}})
    return data
}

export const updateTodo = async (updated) => {
    const {data} = await $authHost.put('api/todo', {id: updated.id, ...updated})
    return data
}
