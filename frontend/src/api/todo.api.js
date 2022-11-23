import { apiAuth } from "./api.config"

const TodoApi = {
    todo: () => {
        return apiAuth.get('/todo/tasks')
    },

    createTodo: (data) => {
        return apiAuth.post('/todo/create', data)
    },

    updateTodo: (data, id) => {
        return apiAuth.put('/todo/update/' + id, data)
    },

    deleteTodo: (id) => {
        return apiAuth.delete('/todo/remove/' + id)
    },

    expireTodo: (id) => {
        return apiAuth.put('/todo/expire/' + id)
    }
}

export default TodoApi