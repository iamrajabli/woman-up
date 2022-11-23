import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import TodoApi from "../../../../api/todo.api";

const HomeScreen = () => {

    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/login')
        } else {

            (async function(){
                const { data } = await TodoApi.todo();

                setTodos(data);
            }())
            
        }
    }, [])



    return (
        <div className='container'>

            <div className="w-[1000px] border border-gray-300 mx-auto p-3 mb-10">
                <div>
                    <h1 className='text-2xl font-bold text-center mb-2'>
                        Добавление новой задачи
                    </h1>
                </div>
                <form className='flex flex-col gap-3'>
                    <input
                        type="text"
                        name="name"
                        className='py-2 px-2 outline-none border'
                        placeholder='Введите заголовок задачи' />

                    <textarea
                        name="description"
                        className='min-h-[150px] outline-none p-3'
                        placeholder='Введите описание задачи' />

                    <input
                        className='p-3 outline-none'
                        type="date"
                        name="deadline" />

                    <button
                        className='p-3 bg-primaryText text-primaryBg'
                        type='submit'>
                        Добавить задачу
                    </button>
                </form>
            </div>

            <div className="w-[1000px] border border-gray-300 mx-auto p-3">
                <h1 className='text-2xl font-bold text-center mb-2'>
                    Список задач
                </h1>
                <div className="flex items-center mb-5">
                    <div className="flex gap-3">
                        <button className='p-3 bg-primaryText text-primaryBg'>Все</button>
                        <button className='p-3 bg-primaryText text-primaryBg'>Выполненные</button>
                        <button className='p-3 bg-primaryText text-primaryBg'>Не выполненные</button>
                    </div>
                </div>

                <div className='flex flex-col gap-5'>

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center border border-gray-300 p-3">
                            <div className="flex flex-col gap-3">
                                <h3 className='text-xl'>Заголовок задачи</h3>
                                <p className='text-sm'>Описание задачи</p>

                                <div className="flex gap-3">
                                    <p className='text-sm'>Дата выполнения: 12.12.2021</p>
                                    <p className='text-sm'>Статус: Выполнено</p>

                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className='p-3 bg-primaryText text-primaryBg'>Редактировать</button>
                                <button className='p-3 bg-primaryText text-primaryBg'>Удалить</button>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    );
};

export default HomeScreen;