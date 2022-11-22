const catchAsyncErrors = require('../errors/async.error');

const ResponseService = require('../services/response.service');

const UserModel = require('../models/user.model');

const UserDto = require('../dtos/user.dto');

const HttpError = require('../errors/http.error');


class AuthController {

    register = catchAsyncErrors(async (req, res, next) => {
        try {

            // Проверка наличия пользователя в базе данных
            const user = await UserModel.findOne({ email: req.body.email });

            // Отправить ошибку если пользователь уже существует
            if (user) {
                throw new HttpError(404, 'Электронная почта уже есть в системе')
            }

            // Создаем, если такого пользователя нет в базе данных
            const newUser = await UserModel.create(req.body);

            // Фильтр пользовательских данных
            const userDto = new UserDto(newUser);

            // Отправка ответа пользователю
            ResponseService.createResponseAndCookie(res, {
                user: userDto,
            });

        } catch (e) {
            // Получаем возвращенную ошибку
            next(e);
        }
    })

    login = catchAsyncErrors(async (req, res, next) => {

        try {

            const { password, email } = req.body;

            // Проверяем, есть ли пользователь в базе
            const user = await UserModel.findOne({ email }).select('+password');

            // Возвращаем ошибку, если такого пользователя нет в базе данных
            if (!user) {
                throw new HttpError(404, 'Email is wrong.')
            }

            // Проверка хешированного пароля
            // const passMatch = await bcrypt.compare(password, user.password);
            const passMatch = password == user.password


            // Возвращаем ошибку, если пароль неверный
            if (!passMatch) {
                throw new HttpError(404, 'Pass is wrong.')
            }

            // Фильтр пользовательских данных
            const userDto = new UserDto(user)

            // Отправка ответа пользователю
            ResponseService.createResponseAndCookie(res, {
                user: userDto,
            });

        } catch (e) {
            // Получаем возвращенную ошибку
            next(e);
        }

    });


    tasks = catchAsyncErrors(async (req, res, next) => {
        res.send('salam')
    })


    logout = catchAsyncErrors(async (req, res, next) => {
        try {
            // Отправка ответа пользователю
            ResponseService.createResponseAndDeleteCookie(res, {
                message: "Вы успешно вышли из системы"
            });

        } catch (e) {
            // Получаем возвращенную ошибку
            next(e);
        }
    })
}



module.exports = new AuthController()