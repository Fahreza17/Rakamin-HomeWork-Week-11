const TodoRepositorie = require("../repositories/todoRepositorie.js")

class TodoService {

    static create = async (params) => {
        try {

            const {title} = params
            const payload = {
                title
            }

            const data = await TodoRepositorie.create(payload)
            return data
            
        } catch (err) {
            throw err
        }
    }

    static findAll = async () => {
        try {

            const data = await TodoRepositorie.findAll()
            return data
            
        } catch (err) {
            throw err
        }
    }

    static findOne = async (params) => {``
        try {

            const {id} = params

            const data = await TodoRepositorie.findOne(id)
            return data
            
        } catch (err) {
            throw err
        }
    }

    static update = async (id, updateTodo) => {
        try {

            const {title} = updateTodo
            const payload = {
                title
            }

            const data = await TodoRepositorie.update(id, payload)
            return data
            
        } catch (err) {
            throw err
        }
    }

    static delete = async (params) => {
        try {

            const {id} = params

            await TodoRepositorie.delete(id)
            
        } catch (err) {
            throw err
        }
    }

}

module.exports = TodoService;