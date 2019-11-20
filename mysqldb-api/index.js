const express = require("express");
const mysql = require("mysql");
let app = express();
let bodyparser = require("body-parser");
const cors = require("cors");
let jwt = require('jsonwebtoken');
//const jwt = require("jsonwebtoken");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cors({ origin: "http://localhost:3000" }));

// To establish connection MySql Server
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "expenses_project"
});

// To check weather connection established or not
con.connect(function(error) {
    if(!error) {
        console.log("DB connection succeded.");
    } else {
        console.log("DB connection failed \n Error " + JSON.stringify(error, undefined, 2));
    }
});

app.listen(5000, () => console.log("Express server is running at port number: 5000"));

// Get all expenses from expenses table
app.get("/getAllExpenses", verifyToken, (req, res) => {
    con.query("SELECT * FROM expenses", (error, rows) => {
        if (!error) {
            res.send(rows);
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});

// Get an single expense from expenses table
app.get("/getSingleExpenses/:id", verifyToken, (req, res) => {
    con.query("SELECT * FROM expenses WHERE id = ?", [req.params.id], (error, rows, fields) => {
        if (!error) {
            // console.log(rows[0]);
            res.send(rows[0]);
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});

// Delete an expense from expenses table
app.delete("/deleteExpense/:id", verifyToken, (req, res) => {
    con.query("DELETE FROM expenses WHERE id = ?", [req.params.id], (error) => {
        if (!error) {
            res.send({ deleted: true });
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});

// Insert an expense into expeses table
app.post("/addExpense", verifyToken, (req, res) => {
    con.query("INSERT INTO expenses (task, amount, date, comment) VALUES(?, ?, ?, ?)", [req.body.task, req.body.amount, req.body.date, req.body.comment], (error) => {
        if (!error) {
            res.send({ inserted: true });
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});

// Update an expense in expenses table
app.put("/updateExpense/:id", verifyToken, (req, res) => {
    con.query("UPDATE expenses SET task = ?, amount = ?, date = ?, comment = ? WHERE id = ?", [req.body.task, req.body.amount, req.body.date, req.body.comment, req.params.id], (error) => {
        if (!error) {
            res.send({ updated: true });
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});

// Login function
app.post("/signin", (req, res) => {
    con.query("SELECT * FROM users WHERE username = ?", [req.body.uname], (error, rows, fields) => {
        if (!error) {
            if (rows.length > 0) {
                if (rows[0].password === req.body.password) {
                    // res.send({msg: "User logged in Successfully"});
                    let token = jwt.sign({username: rows[0].username}, 'secret');
                    return res.status(200).send({token: token});
                } else {
                    res.send({msg: "Invalid Password."});
                }
            } else {
                res.send({msg: "User does not exists."});
            }
        }
        else {
            console.log("Query failed \n Error " + JSON.stringify(error, undefined, 2));
        }
    });
});

// Function to verify the token
function verifyToken(req, res, next) {
    // console.log(req.headers);
    const header = req.headers['authorization'];
    
    if (typeof header !== "undefined") {
        const bearer = header.split(" ");
        const token = bearer[1];

        jwt.verify(token, "secret", (error) => {
            if (!error) {
                next();
            } else {
                return res.status(400).send({msg: "Unautherized request"});
            }
        });
    } else {
        res.status(403).send("Forbidden");
    }
}