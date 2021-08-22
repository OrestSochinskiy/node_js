const path = require('path');
const fs = require('fs/promises');

const pathUsers = path.join(__dirname, '../database', 'users.json');

module.exports = {
    getLogin: (req, res) => {
        res.render('login');
    },
    postLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const data = await fs.readFile(pathUsers, 'utf-8');
            const users = JSON.parse(data);
            const isUserLogin = users.some((user) => user.email === email && user.password === password);
            if (isUserLogin) {
                res.render('users', { users });
                return;
            }
            res.render('register');
        } catch (e) {
            console.log(e);
        }
    }
};
