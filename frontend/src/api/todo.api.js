import { api, apiAuth } from "./api.config"

const TodoApi = {
    todo: () => {
        return apiAuth.get('/todo/tasks')
    }
}

export default TodoApi