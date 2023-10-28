const {todo} = require("../models")

class TodoRepositorie {

    static create = async (payload) => {
        try {

            const data = await todo.create(payload, {
                returning : true
            })

            return data
            
        } catch (err) {
            throw err
        }
    }

    static findAll = async () => {
        try {

            const data = await todo.findAll()
            return data;
            
        } catch (err) {
            throw err
        }
    }

    static findOne = async (id) => {
        try {

            const data = await todo.findOne({
                where : {
                    id
                }
            })

            if (!data) {
                throw {name : "ErrorNotFound"}
            }

            return data
            
        } catch (err) {
            throw err
        }
    }

    static update = async (id, payload) => {
        try {

            const foundTodo = await todo.findOne({
                where : {
                    id
                }
            })

            if (!foundTodo) {
                throw {name : "ErrorNotFound"}
            }

            const data = await foundTodo.update({
                title : payload.title || foundTodo.title
            }, {returning : true})

            return data
            
        } catch (err) {
            throw err
        }
    }

    static delete = async (id) => {
        try {

            const foundTodo = await todo.findOne({
                where : {
                    id
                }
            })
            
            if (!foundTodo) {
                throw {name : "ErrorNotFound"}
            }

            await foundTodo.destroy()
            
        } catch (err) {
            throw err
        }
    }

}

module.exports = TodoRepositorie;