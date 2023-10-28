const TodoService = require("../services/todoService.js")

class TodoController {

    static create = async (req, res, next) => {
        try {

            const data = await TodoService.create(req.body)
            res.status(201).json({message: "New Todo List Created Successfully",
            data})
            
        } catch (err) {
            next(err)
        }
    }

    static findAll = async (req, res, next) => {
        try {

            const data = await TodoService.findAll()
            res.status(200).json({data})
            
        } catch (err) {
            next(err)
        }
    }

    static findOne = async (req, res, next) => {
        try {

            const data = await TodoService.findOne(req.params)
            res.status(200).json({data})
            
        } catch (err) {
            next(err)
        }
    }

    static update = async (req, res, next) => {
        try {

            const {id} = req.params
            const updateTodo = req.body

            const data = await TodoService.update(id, updateTodo)
            res.status(200).json({message : "Todo List Update Successfully", data})
            
        } catch (err) {
            next(err)
        }
    }

    static delete = async (req, res, next) => {
        try {

            const data = await TodoService.delete(req.params)
            res.status(200).json({message : "Delete Todo List Successfully"})
            
        } catch (err) {
            next(err)
        }
    }

}

module.exports = TodoController;