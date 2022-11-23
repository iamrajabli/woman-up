import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { TodosContext } from "../../../contexts/TodosProvider";

import Todo from "./Todo";

const HomeScreen = () => {

    const { todos, mode, updatedId, createTodo, updateTodo } = useContext(TodosContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('in_process');


    // Если не логин, то перенаправить на страницу логина
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/login')
        }
    }, [])

    // После того как мы обновили (и создать) тудушку, мы должны сбросить инпуты
    const emptyForm = () => {
        setTitle('');
        setDescription('');
        setDeadline('');
        setStatus('in_progress');
    }

    // когда мы нажимаем на кнопку "Создать" или "Обновить"
    const handleSubmit = async (e) => {
        e.preventDefault();

        const todo = {
            title,
            description,
            deadline,
            status
        }

        if (mode === 'create') {
            createTodo(todo)
            emptyForm()
        } else {
            updateTodo(todo, { title, description, deadline, status })
            emptyForm()
        }

        
    }

    // Если режим редактирования, то в инпуты подставляем данные из todo
    useEffect(() => {
        if (mode === 'edit') {
            try {
                const { title, description, deadline, status } = todos.filter(todo => todo._id === updatedId)[0];

                setTitle(title);
                setDescription(description);
                setDeadline(deadline.split('T')[0]);
                setStatus(status);

            } catch (e) {
                console.log(e);
            }
        }
    }, [mode])




    return (
        <div className='container'>

            <div className="w-[1000px] border border-gray-300 mx-auto p-3 mb-10">
                <div>
                    <h1 className='text-2xl font-bold text-center mb-2'>
                        Добавление новой задачи
                    </h1>
                </div>
                <form
                    onSubmit={(e) => { handleSubmit(e) }}
                    className='flex flex-col gap-3'>
                    <input
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        type="text"
                        name="name"
                        className='py-2 px-2 outline-none border'
                        placeholder='Введите заголовок задачи' />

                    <textarea
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        name="description"
                        className='min-h-[150px] outline-none p-3'
                        placeholder='Введите описание задачи' />

                    <input
                        value={deadline}
                        onChange={(e) => { setDeadline(e.target.value) }}
                        className='p-3 outline-none'
                        type="date"
                        name="deadline" />

                    <select
                        value={status}
                        onChange={(e) => { setStatus(e.target.value) }}
                        disabled={mode == 'create'}
                        name="deadline"
                        className="p-3 outline-none cursor-pointer">
                        <option value="in_process">Не выполнено</option>
                        <option value="done">Выполнено</option>
                    </select>

                    <input type="file" className="bg-white p-3" />

                    <button
                        className='p-3 bg-primaryText text-primaryBg'
                        type='submit'>
                        {mode === 'create' ? 'Добавить' : 'Изменить'}
                    </button>
                </form>
            </div>

            <Todo />
        </div>
    );
};




export default HomeScreen;