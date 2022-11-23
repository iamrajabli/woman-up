const catchAsyncErrors = require('../errors/async.error');

const ResponseService = require('../services/response.service');

const TodoModel = require('../models/todo.model');

const HttpError = require('../errors/http.error');


class TodoController {
    create = catchAsyncErrors(async (req, res, next) => {
        try {

            const { title, description, deadline } = req.body;

            const todo = await TodoModel.create({
                title,
                description,
                deadline,
                user: req.user.id
            });

            ResponseService.createResponse(res, { todo })

        } catch (e) {
            next(e)
        }
    })

    tasks = catchAsyncErrors(async (req, res, next) => {
        try {

            const todos = await TodoModel.find({ user: req.user.id });

            ResponseService.createResponse(res, { todos })

        } catch (e) {
            next(e)
        }
    })

    remove = catchAsyncErrors(async (req, res, next) => {
        try {

            const { id } = req.params;

            const todo = await TodoModel.findById(id);

            if (!todo) {
                return next(new HttpError('Задание не найдено', 404))
            }

            if (todo.user !== req.user.id) {
                return next(new HttpError('У вас нет прав на удаление этой задачи', 401))
            }

            await todo.remove();

            ResponseService.createResponse(res, { message: 'Задание успешно удалено' })


        } catch (e) {
            next(e);
        }
    })

    removeAll = catchAsyncErrors(async (req, res, next) => {
        try {

            await TodoModel.deleteMany({ user: req.user.id });

            ResponseService.createResponse(res, { message: 'Задания успешно удалены' })


        } catch (e) {
            next(e);
        }
    })

    update = catchAsyncErrors(async (req, res, next) => {

        try {

            const { id } = req.params;

            const todo = await TodoModel.findById(id);

            if (!todo) {
                return next(new HttpError('Задание не найдено', 404))
            }

            if (todo.user !== req.user.id) {
                return next(new HttpError('У вас нет прав на изменение этой задачи', 401))
            }

            const { title, description, deadline, status } = req.body;

            todo.title = title;
            todo.description = description;
            todo.deadline = deadline;
            todo.status = status;
            await todo.save();

            ResponseService.createResponse(res, { todo })

        } catch (e) {
            next(e);
        }

    })

    expire = catchAsyncErrors(async (req, res, next) => {

        try {

            const { id } = req.params;

            const todo = await TodoModel.findById(id);

            if (!todo) {
                return next(new HttpError('Задание не найдено', 404))
            }

            if (todo.user !== req.user.id) {
                return next(new HttpError('У вас нет прав на изменение этой задачи', 401))
            }

            todo.status = 'expired';
            await todo.save();

            ResponseService.createResponse(res, { todo })

        } catch (e) {
            next(e);
        }
    })

}


module.exports = new TodoController();