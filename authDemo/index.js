const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

app.use(flash());

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/authDemo');
}

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.successful = req.flash("Successful");
    res.locals.unsuccessful = req.flash("Unsuccessful");
    next();
})

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/register", (req, res) => {
    if (req.session.user_id) {
        req.flash("Successful", "You are already logged in")
        res.redirect("/")
    } else {
        res.render("register")
    }
})

app.get("/login", (req, res) => {
    if (req.session.user_id) {
        req.flash("Successful", "You are already logged in")
        res.redirect("/")
    } else {
        res.render("login")
    }
})

app.get("/zoo", async (req, res) => {
    if (req.session.user_id) {
        const user = await User.findById(req.session.user_id);
        const username = user.username
        const pandas = user.pandas
        res.render("zoo.ejs", { username, pandas })
    } else {
        req.flash("Unsuccessful", "Login is required")
        res.redirect("/login")
    }
})

app.get("/account", async (req, res) => {
    if (req.session.user_id) {
        const user = await User.findById(req.session.user_id);
        res.render("account.ejs", { user })
    } else {
        req.flash("Unsuccessful", "Login is required")
        res.redirect("/login")
    }
})

app.post('/zoo/add', async (req, res) => {
    if (req.session.user_id) {
        const user = await User.findById(req.session.user_id);
        user.pandas = user.pandas + 1;
        await user.save();
    }
    res.redirect("/zoo");
})

app.post('/zoo/kill', async (req, res) => {
    if (req.session.user_id) {
        const user = await User.findById(req.session.user_id);
        if (user.pandas > 0) {
            user.pandas = user.pandas - 1;
            await user.save();
        }
    }
    res.redirect("/zoo");
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username })
    if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            req.flash('Successful', "Successfully logged in!");
            req.session.user_id = user._id;
            res.redirect("/");
        } else {
            req.flash('Unsuccessful', 'Incorrect Username or Password!');
            res.redirect("/login")
        }
    } else {
        req.flash('Unsuccessful', 'Incorrect Username or Password!');
        res.redirect("/login")
    }
})

app.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect("/")
})

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const repeat = await User.exists({ username: username });
    if (repeat) {
        req.flash("Unsuccessful", "Username has been taken");
        res.redirect("/");
    } else {
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            password: hashPassword
        })
        const response = await user.save()
        console.log(response);
        req.flash('Successful', "Successfully registered!");
        res.redirect("/")
    }
})

app.get("/secret", (req, res) => {
    if (req.session.user_id) {
        res.send("This is the secret!")
    } else {
        req.flash("Unsuccessful", "Login is required")
        res.redirect("/login")
    }
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})

