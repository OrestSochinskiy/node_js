const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    appRouter,
    userRouter,
    loginRouter,
    registerRouter
} = require('./routes');

const staticFolder = path.join(__dirname, 'static');

app.use(express.static(staticFolder));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticFolder);

app.use('/', appRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/registration', registerRouter);

app.listen(PORT, () => {
    console.log('App listen', PORT);
});
