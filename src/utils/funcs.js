export const getDate = (date) => {
    const formattedDate = new Date(date)
    return formattedDate.toLocaleDateString()
}

export const compareDate = (date) => {
    return new Date(date).getTime() <= Date.now()
}