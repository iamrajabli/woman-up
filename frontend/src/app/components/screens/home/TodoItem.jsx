import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { TodosContext } from '../../../contexts/TodosProvider';

const TodoItem = ({ data: { _id, title, description, deadline, status } }) => {

    const [className, setClassname] = useState('');

    const { setUpdatedId, setMode, deleteTodo, expireTodo } = useContext(TodosContext);

    const customDeadline = useMemo(() => {

        if (deadline.indexOf('T') !== -1) {
            return deadline.split('T')[0];
        }

        return deadline;

    }, [deadline]);


    const customStatus = useMemo(() => {
        switch (status) {
            case 'done':
                setClassname('bg-green-500')
                return 'Выполнено';
            case 'expired':
                setClassname('bg-red-500')
                return 'Время вышло';
            default:
                setClassname('bg-yellow-500')
                return 'В процессе';
        }
    }, [deadline, status, setUpdatedId, setMode]);


    useEffect(() => {
        deadlineControl()
    }, [deadline, status])

    const deadlineControl = () => {
        const date = new Date(deadline);
        const now = new Date();

        if (date < now) {
            expireTodo(_id);
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center border border-gray-300 p-3">
                <div className="flex flex-col gap-3">
                    <h3 className='text-xl'>{title}</h3>
                    <p className='text-sm'>{description}</p>

                    <div className={"flex gap-3 " + className}>
                        <p className='text-sm'>Дата выполнения: {customDeadline}</p>
                        <p className='text-sm'>Статус: {customStatus}</p>

                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setUpdatedId(_id);
                            setMode('edit');
                        }}
                        disabled={status === 'expired'}
                        className={`p-3 text-primaryBg ${status === 'expired' ? 'bg-gray-500' : 'bg-primaryText'}`}>Редактировать</button>
                    <button onClick={() => deleteTodo(_id)} className='p-3 bg-primaryText text-primaryBg'>Удалить</button>
                </div>
            </div>
        </div>

    );
};

export default TodoItem;