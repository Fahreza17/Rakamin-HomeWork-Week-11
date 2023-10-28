const app = require("../app.js")
const request = require("supertest")
const { sequelize } = require("../models")
const { queryInterface } = sequelize

beforeAll((done) => {

    queryInterface.bulkInsert("todos", [
        {
            id: 996,
            title: "Ngoding",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 997,
            title: "Workout",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 998,
            title: "Jogging",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 999,
            title: "Ngampus",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {})
    .then(_ => {
        done()
    })
    .catch (err => {
        done(err)
    })
})

afterAll((done) => {

    queryInterface.bulkDelete("todos", null, {})
    .then(_ => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe("GET /todos", () => {

    it("Get Todo List", (done) => {
        request(app)
            .get("/todos")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {data} = res.body;
                expect (data.length).toBe(4)
                const firstData = data[0]

                expect(firstData.title).toEqual("Ngoding")
                expect(firstData.id).toEqual(996)
                done()
            })
            .catch (err => {
                done(err)
            })
    })
})

describe("GET /todos/:id", () => {

    it("Get Todo List Detail", (done) => {

        request(app)
            .get(`/todos/${999}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {data} = res.body
                expect (data.id).toEqual(999)
                expect (data.title).toEqual("Ngampus")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("Error Not Found", (done) => {

        request(app)
            .get(`/todos/${1000}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                const {message} = res.body;

                expect(message).toEqual("Error Not Found")
                done();
            })
            .catch(err => {
                done(err);
            })
    })

})

describe("POST /todos", () => {

    it("New Todo List Created Successfully", (done) => {

        request(app)
            .post("/todos")
            .send({
                title: "Ngopi"
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((res) => {
                const { message, data } = res.body
                expect(message).toEqual("New Todo List Created Successfully")
                expect(data.title).toEqual("Ngopi")
                done()
            })
            .catch(err => {
                done(err)
            })

    })

})

describe("PUT /todos/:id", () => {

    it("Todo List Update Successfully", (done) => {

        request(app)
            .put(`/todos/${998}`)
            .send({
                title: "Push Rank Valo"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const { message, data } = res.body

                expect(message).toEqual("Todo List Update Successfully")
                expect(data.title).toEqual("Push Rank Valo")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("Error Not Found", (done) => {

        request(app)
            .get(`/todos/${1000}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                const {message} = res.body;

                expect(message).toEqual("Error Not Found")
                done();
            })
            .catch(err => {
                done(err);
            })
    })

})

describe("DELETE /todos/:id", () => {

    it("Delete Todo List Successfully", (done) => {
        request(app)
            .delete(`/todos/${997}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {message} = res.body

                expect(message).toEqual("Delete Todo List Successfully")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("Error Not Found", (done) => {

        request(app)
            .get(`/todos/${1000}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                const {message} = res.body;

                expect(message).toEqual("Error Not Found")
                done();
            })
            .catch(err => {
                done(err);
            })
    })
})