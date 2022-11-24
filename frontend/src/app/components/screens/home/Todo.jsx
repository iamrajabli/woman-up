import TodoItem from "./TodoItem";
import { useMemo, useContext, useState } from "react";
import NotYet from './NotYet';
import { TodosContext } from "../../../contexts/TodosProvider";

const Todo = () => {

    const { todos } = useContext(TodosContext);

    const [filter, setFilter] = useState('all');

    // Фильтрация тудушек
    const Content = useMemo(() => {

        let filteredData = filter !== 'all' ? todos.filter(todo => todo.status === filter) : todos


        if (filteredData.length > 0) {
            return filteredData.map((todo, index) => {
                return <TodoItem key={index} data={todo} />
            })
        } else {
            return <NotYet />
        }
    }, [todos, filter])



    return (
        <div className="w-[1000px] border border-gray-300 mx-auto p-3">
            <h1 className='text-2xl font-bold text-center mb-2'>
                Список задач
            </h1>
            <div className="flex items-center mb-5">
                <div className="flex gap-3">
                    <button onClick={() => setFilter('all')} className='p-3 bg-primaryText text-primaryBg'>Все</button>
                    <button onClick={() => setFilter('done')} className='p-3 bg-primaryText text-primaryBg'>Выполненные</button>
                    <button onClick={() => setFilter('expired')} className='p-3 bg-primaryText text-primaryBg'>Не выполненные</button>
                </div>
            </div>

            <div className='flex flex-col gap-5'>
                {Content}
            </div>


        </div>
    );
};

export default Todo;
