import TodoItem from "./TodoItem";
import { useMemo, useContext } from "react";
import NotYet from './NotYet';
import { TodosContext } from "../../../contexts/TodosProvider";

const Todo = () => {

    const { loading, error, todos, } = useContext(TodosContext);


    const Content = useMemo(() => {
        if (todos.length > 0) {
            return todos.map((todo, index) => {
                return <TodoItem key={index} data={todo} />
            })
        } else {
            return <NotYet />
        }
    }, [todos])

    return (
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
                {/* {Load}
                {NotContent} */}
                {Content}
            </div>


        </div>
    );
};

export default Todo;

  // const NotContent = useMemo(() => {
    //     if (todos.length === 0) {
    //         return <NotYet />
    //     }
    // }, [todos])

    // const Load = useMemo(() => {
    //     if (loading) {
    //         return <div className="text-center">Загрузка...</div>
    //     }
    // }, [loading, todos])