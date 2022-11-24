
import { createContext, useContext, useEffect, useState } from "react";
import TodoApi from "../../api/todo.api";
import { AuthContext } from "./AuthProvider";

export const TodosContext = createContext();

const TodosProvider = ({ children }) => {


    const { auth } = useContext(AuthContext);

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [mode, setMode] = useState('create');
    const [updatedId, setUpdatedId] = useState('');


    // Специальный рендер
    const [renderForDependency, fakeRenderForDependency] = useState([]);

    // создать тудушку
    const createTodo = async (todo) => {
        try {
            const { data } = await TodoApi.createTodo(todo);
            fakeRenderForDependency(data);
            setErrorMessage('')
            setSuccessMessage('Успешно создано')

            return true;

        } catch (e) {
            setErrorMessage(e.response.data.message.split(":")[2]);
            setSuccessMessage('')

        }
    }

    // обновить тудушку
    const updateTodo = async (todo) => {
        try {
            const { data } = await TodoApi.updateTodo(todo, updatedId);

            fakeRenderForDependency(data.todo);
            setMode('create');

            setErrorMessage('')
            setSuccessMessage('Успешно обновлено')

            return true;
        } catch (e) {
            setErrorMessage(e.response.data.message.split(":")[2]);
            setSuccessMessage('')

        }
    }

    // удалить тудушку
    const deleteTodo = async (id) => {

        try {
            if (window.confirm('Вы уверены?')) {
                const { data } = await TodoApi.deleteTodo(id);

                setErrorMessage('')
                fakeRenderForDependency(data);
                setSuccessMessage('Успешно удалено')
            }


        } catch (e) {
            setErrorMessage(e.response.data.message.split(":")[2]);
            setSuccessMessage('')

        }
    }

    // делать тудушку просроченной
    const expireTodo = (id) => {
        try {
            TodoApi.expireTodo(id);

        } catch (e) {
            console.log(e);
        }

    }

    // когда монтируется компонент - получаем тудушки
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            (async function () {
                try {
                    const { data } = await TodoApi.todo();
                    setTodos(data.todos);
                    setLoading(false);

                } catch (error) {
                    setLoading(false);
                    setError(true);

                } finally {
                    setLoading(false);
                }
            }())
        }
    }, [auth, renderForDependency])


    // после 3 секунд убираем сообщение об статусе
    useEffect(() => {

        let timer;

        if (errorMessage || successMessage) {
            timer = setTimeout(() => {
                setErrorMessage('');
                setSuccessMessage('');
            }, 3000)
        }

        return () => clearTimeout(timer);

    }, [errorMessage, successMessage])

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
        expireTodo,
        errorMessage,
        successMessage
    };

    return (
        <TodosContext.Provider value={data}>
            {children}
        </TodosContext.Provider>
    );
};

export default TodosProvider;