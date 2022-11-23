
import { createContext, useEffect, useState } from "react";
import TodoApi from "../../api/todo.api";

export const TodosContext = createContext();

const TodosProvider = ({ children }) => {

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [mode, setMode] = useState('create');
    const [updatedId, setUpdatedId] = useState('');


    const createTodo = async (todo) => {
        try {
            await TodoApi.createTodo(todo);

        } catch (e) {
            console.log(e.response.data.message);
        }
    }


    const updateTodo = async (todo, newTodo) => {
        try {
            await TodoApi.updateTodo(todo, updatedId);

            setMode('create');
        } catch (e) {
            console.log(e);
        }
    }

    const deleteTodo = (id) => {
        try {
            TodoApi.deleteTodo(id);

        } catch (e) {
            console.log(e);
        }
    }

    const expireTodo = (id) => {
        try {
            TodoApi.expireTodo(id);

        } catch (e) {
            console.log(e);
        }

    }


    useEffect(() => {
        (async function () {
            try {
                const { data } = await TodoApi.todo();
                setTodos(data.todos);
                setLoading(false);

            } catch (error) {
                setLoading(false);
                setError(true);
                console.log(error);

            } finally {
                setLoading(false);
            }
        }())
    }, [createTodo, updateTodo, deleteTodo, expireTodo])

    const data = {
        loading,
        error,
        todos,
        mode,
        setMode,
        updatedId,
        setUpdatedId,
        createTodo,
        updateTodo,
        deleteTodo,
        expireTodo
    };

    return (
        <TodosContext.Provider value={data}>
            {children}
        </TodosContext.Provider>
    );
};

export default TodosProvider;