import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { TodosContext } from '../../../contexts/TodosProvider';

const TodoItem = ({ data: { _id, title, description, deadline, status, file } }) => {
    const [className, setClassname] = useState('');

    const { setUpdatedId, setMode, deleteTodo, expireTodo } = useContext(TodosContext);

    // кастомный дедлайн
    const customDeadline = useMemo(() => {

        if (deadline.indexOf('T') !== -1) {
            return deadline.split('T')[0];
        }

        return deadline;

    }, [deadline]);

    // определим класс для статуса
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

    // определяем класс для бутога
    const buttonClassName = useMemo(() => {

        let className = 'p-3 text-primaryBg '
        if (status === 'expired' || status === 'done') {
            className += ' bg-gray-500'
        } else {
            className += ' bg-primaryText'
        }

        return className;
    }, [status])

    useEffect(() => {
        deadlineControl()
    }, [deadline, status])

    // посчитать сколько осталось дней до дедлайна
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

                <div className='w-[200px] h-[200px]'>
                    <img className='w-full h-full object-cover' src={file?.url || 'https://bit.ly/3AH0p2z'} alt="" />
                </div>

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
                        disabled={status === 'expired' || status === 'done'}
                        className={buttonClassName}>Редактировать</button>
                    <button onClick={() => deleteTodo(_id)} className='p-3 bg-primaryText text-primaryBg'>Удалить</button>
                </div>
            </div>
        </div>

    );
};

export default TodoItem;