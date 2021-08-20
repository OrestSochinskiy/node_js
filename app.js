const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs/promises');

const pathUsers = path.join(__dirname, 'database', 'users.json');

const {PORT} = require('./config/variables');
const users = require('./database/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const staticFolder = path.join(__dirname, 'static');

app.use(express.static(staticFolder));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', staticFolder);


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
    res.render('register')
});


app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const data = await fs.readFile(pathUsers, "utf-8");
        const users = JSON.parse(data);
        users.some(user => {

            if (user.email === email && user.password === password) {
                res.render('users', {users});
                return
            }
            return res.render('register');

        })
    } catch (e) {
        console.log(e)
    }
});

app.post('/users', async (req, res) => {
    try {
        const {name, age, gender, email, password} = req.body;
        const data = await fs.readFile(pathUsers, 'utf-8');
        const users = JSON.parse(data);

        users.some(user => {

            if (user.email === email) {
                res.status(401).end('Error! User is already registered');
                return
            }
            return users.push({name, age, gender, email, password});
        })

        await fs.writeFile(pathUsers, JSON.stringify(users));
        res.render('users', {users});
    } catch (e) {
        console.log(e);
    }
});

app.listen(PORT, () => {
    console.log('App listen', PORT)
})

