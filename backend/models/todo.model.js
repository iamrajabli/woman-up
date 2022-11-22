const { Schema, model } = require('mongoose');


const todoSchema = new Schema({

    title: {
        type: String,
        minlength: [3, 'Заголовок должен быть не менее 3 символов.'],
        required: [true, "Пожалуйста, введите название задачи."]
    },

    description: {
        type: String,
        minlength: [10, 'Описание должен быть не менее 3 символов.'],
        required: [true, "Пожалуйста, введите сведения о задаче."]
    },

    deadline: {
        type: Date,
        required: [true, "Пожалуйста, укажите срок выполнения задания."]
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true, versionKey: false });


module.exports = model('todo', todoSchema);