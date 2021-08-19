const express = require('express');
const expressHbs = require('express-handlebars')
const path = require('path')
const fs = require('fs')

const pathUsers = path.join(__dirname, 'database', 'users.js')

const {PORT} = require('./configs/variables')
const users = require('./database/users')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const staticFolder = path.join(__dirname, 'static')

app.use(express.static(staticFolder))
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}))
app.set('views', staticFolder)


app.get('/', (req, res) => {
    res.render('index')
});

app.get('/users', (req, res) => {
    res.render('users', {users})
});

app.get('/users/:user_id', (req, res) => {
    const {user_id} = req.params;
    const currentUser = users[user_id];

    if (!currentUser) {
        res.status(404).end('User Not Found');
        return
    }
    res.json(currentUser)
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/registration', (req, res) => {
    res.render('register', {users})
});

app.post('/login', (req, res) => {
    const {name, age, gender, email, password} = req.body

    users.forEach(user => {
        if (user.email === email) {
            res.status(401).end('Email is registered');
            return
        }
        fs.appendFile(pathUsers, JSON.stringify({name, age, gender, email, password}), err => {
            if (err) {
                console.log(err)
                return
            }
            console.log('done')
        });
        res.render('login')
    })
});

app.post('/users', (req, res) => {
    const {email, password} = req.body

    users.forEach(user => {
        if (user.email === email && user.password === password) {
            res.render('users', {users})
            return
        }
        res.render('register')
    })
});

app.listen(PORT, () => {
    console.log('App listen', PORT)
})

for (let i = 0; i <4; i++) {
    users.push({name: 'Bsdad'})
}
