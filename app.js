const express = require('express');
const expressHbs = require('express-handlebars')
const path = require('path')
const fs = require('fs/promises')

const {PORT} = require('./config/variables')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const staticFolder = path.join(__dirname, 'static')
const pathUsers = path.join(__dirname, 'db', 'users.json')

app.use(express.static(staticFolder))
app.set('view engine', '.hbs')
app.engine('.hbs', expressHbs({defaultLayout: false}))
app.set('views', staticFolder)

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/login', async (req, res) => {
    try {
        const {name, email, password} = req.body
        const data = await fs.readFile(pathUsers, 'utf-8');
        const users = JSON.parse(data);
        users.push({name, email, password})

        await fs.writeFile(pathUsers, JSON.stringify(users))
        res.render('login')
    } catch (e) {
        console.log(e)
    }
})

app.get('/calculator', (req, res) => {
    res.render('calc')
})

app.post('/calculator', async (req, res) => {
    try {
        const {email, password} = req.body
        const data = await fs.readFile(pathUsers, "utf-8")
        const users = JSON.parse(data)
        console.log(users)
        users.forEach(user => {
            if (user.email === email && user.password === password) {
                return res.render('calc')
            }
            return res.status(404).end('User Not Found')
        })
    } catch (e) {
        console.log(e)
    }
})


app.listen(PORT, () => {
    console.log('App listen', PORT)
})
