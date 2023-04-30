import {$authHost, $host} from "./index";


export const getBoards = async (userId) => {
    const {data} = await $authHost.get('api/board', {params: {userId}})
    return data
}

export const getBoard = async (id) => {
    const {data} = await $authHost.get(`api/board/${id}`)
    return data
}

export const createBoard = async (userId, title) => {
    const {data} = await $authHost.post('api/board/', {userId, title})
    return data
}

export const updateBoard = async (id, title) => {
    const {data} = await $authHost.put('api/board', {id, title})
    return data
}

export const destroyBoard = async (id) => {
    const {data} = await $authHost.delete(`api/board/${id}`)
    return data
}
