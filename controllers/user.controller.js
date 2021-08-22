const path = require('path');
const fs = require('fs/promises');

const pathUsers = path.join(__dirname, '../database', 'users.json');
const usersData = require('../database/users.json');

module.exports = {
    getAllUsers: async (req, res) => {
        const data = await fs.readFile(pathUsers, 'utf-8');
        const users = JSON.parse(data);
        res.render('users', { users });
    },
    getUserById: (req, res) => {
        const { user_id } = req.params;
        const currentUser = usersData[user_id];

        if (!currentUser) {
            res.status(404).end('User Not Found');
            return;
        }
        res.json(currentUser);
    },
    postAllUsers: async (req, res) => {
        try {
            const {
                // eslint-disable-next-line no-unused-vars
                name, age, gender, email, password
            } = req.body;
            const data = await fs.readFile(pathUsers, 'utf-8');
            const users = JSON.parse(data);

            const isUserFound = users.some((user) => user.email === email);

            if (isUserFound) {
                res.status(401).end('Error! User is already registered');
                return;
            }
            users.push(req.body);
            await fs.writeFile(pathUsers, JSON.stringify(users));
            res.render('users', { users });
        } catch
            (e) {
            console.log(e);
        }
    }
};
