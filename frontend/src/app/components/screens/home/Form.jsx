import { useRef } from "react";
import { useMemo } from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { TodosContext } from "../../../contexts/TodosProvider";
import Alert from '../../ui/alert/Alert';
import Todo from "./Todo";


const Form = () => {
    const {
        todos,
        mode,
        updatedId,
        createTodo,
        updateTodo,
        errorMessage,
        successMessage } = useContext(TodosContext);
    const navigate = useNavigate();

    const [file, setFile] = useState('');

    const [form, setForm] = useState({ title: '', description: '', deadline: '', status: 'in_process', file: '' });

    const { title, description, deadline, status } = form;

    const fileRef = useRef(null);

    // Если не логин, то перенаправить на страницу логина
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/login')
        }
    }, [])

    // После того как мы обновили (и создать) тудушку, мы должны сбросить инпуты
    const emptyForm = () => {
        setForm({ title: '', description: '', deadline: '', status: 'in_process', file: '' });
        fileRef.current.value = '';
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

        if (file) {
            todo.file = file;
        }

        if (mode === 'create') {

            if (await createTodo(todo)) {
                emptyForm();
            }
        } else {
            if (await updateTodo(todo)) {
                emptyForm();
            }
        }

    }

    // получаем инпуты и сетим их в стейт
    const handleChange = (e) => {


        if (e.target.name === 'file') {

            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setFile(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }
    }



    // Если режим редактирования, то в инпуты подставляем данные из todo
    useEffect(() => {
        if (mode === 'edit') {
            try {
                const { title, description, deadline, status } = todos.filter(todo => todo._id === updatedId)[0];

                setForm({ title, description, deadline: deadline.split('T')[0], status })

            } catch (e) {
                console.log(e);
            }
        }
    }, [mode])

    // Ловить ошибки
    const errorHandler = useMemo(() => {
        if (errorMessage) {
            return <Alert type="danger" text={errorMessage} />
        }
    }, [errorMessage])

    // Ловить успех
    const successHandler = useMemo(() => {
        if (successMessage) {
            return <Alert type="success" text={successMessage} />
        }
    }, [successMessage])


    // класы для кнопки "Создать" или "Обновить"
    const buttonClassName = useMemo(() => {
        let className = 'p-3 text-primaryBg '
        if (title && description && deadline) {
            className += ' bg-primaryText'
        } else {
            className += ' bg-gray-500'
        }

        return className;
    }, [title, description, deadline])

    return (
        <>
            <div className="w-[1000px] border border-gray-300 mx-auto p-3 mb-10">
                <div>
                    {errorHandler}
                    {successHandler}
                    <h1 className='text-2xl font-bold text-center mb-2'>
                        Добавление новой задачи
                    </h1>
                </div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className='flex flex-col gap-3'>
                    <input
                        type="text"
                        name="title"
                        className='py-2 px-2 outline-none border'
                        placeholder='Введите заголовок задачи'
                        value={title}
                        onChange={handleChange} />

                    <textarea
                        value={description}
                        onChange={handleChange}
                        name="description"
                        className='min-h-[150px] outline-none p-3'
                        placeholder='Введите описание задачи' />

                    <input
                        value={deadline}
                        onChange={handleChange}
                        className='p-3 outline-none'
                        type="date"
                        name="deadline" />

                    <select
                        value={status}
                        onChange={handleChange}
                        disabled={mode == 'create'}
                        name="status"
                        className="p-3 outline-none cursor-pointer">
                        <option value="in_process">Не выполнено</option>
                        <option value="done">Выполнено</option>
                    </select>

                    <input
                        name="file"
                        type="file"
                        ref={fileRef}
                        accept="image/*"
                        onChange={handleChange}
                        className="bg-white p-3" />

                    <button
                        disabled={!(title && description && deadline)}
                        className={'p-3 text-primaryBg ' + buttonClassName}
                        type='submit'>
                        {mode === 'create' ? 'Добавить' : 'Изменить'}
                    </button>
                </form>
            </div>

            <Todo />
        </>
    );
};

export default Form;