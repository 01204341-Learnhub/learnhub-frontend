import axios from "axios"
type Todo = {
    id: number,
    todo: string,
    completed: boolean,
    userId: number

}

async function getSigleTodo() {
    const todo = (await axios.get<Todo>("https://dummyjson.com/todos/1")).data
    return todo
}

export { getSigleTodo }
