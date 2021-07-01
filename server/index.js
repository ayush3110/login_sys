const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db');
const session = require('express-session');
const PgSQLStore = require('express-pg-session')(session);

const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.use(session({
    store: new PgSQLStore({
        pool: pool,                // Connection pool
        expiration: (1825 * 86400 * 1000),
        endConnectionOnClose: false
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

//! Sigin In

app.post('/user/signin', async (req, res) => {

    let { username, userid, email, password } = req.body;

    //! hash password
    let hPassword = await bcrypt.hash(password, 10);

    let checkUserid = pool.query(`SELECT * FROM userdata WHERE userid = $1`, [userid], (err, resu) => {
        if (err) {
            res.json({
                success: false,
                msg: 'An error occured, please try again'
            })
            return;
        }
        if (resu.rows.length > 0) {
            res.json({
                success: false,
                userid: userid,
                msg: 'Userid all ready registered'
            })
        }
        else {
            pool.query(
                `SELECT * FROM userdata WHERE email = $1`, [email], (err, results) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'An error occured, please try again'
                        })
                        return;
                    }

                    if (results.rows.length > 0) {
                        res.json({
                            success: false,
                            email: email,
                            msg: 'Email all ready registered'
                        })
                        // console.log(results.rows);
                        return;
                    } else {
                        pool.query(
                            `INSERT INTO userdata (name, userid, email, password)
                        VALUES ($1, $2, $3, $4)
                        RETURNING id, password`,
                            [username, userid, email, hPassword],
                            (err, results) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: 'An error occured, please try again'
                                    })
                                    return;
                                }
                                else {
                                    res.json({
                                        success: true,
                                        msg: `${username} you Sign Up successfully`
                                    })
                                }
                            }
                        )
                    }
                }
            );
        }
    })
});

//! Login

app.post('/user/login', (req, res) => {
    let { userid, password } = req.body;

    pool.query('SELECT * FROM userdata WHERE userid = $1', [userid], (err, data, fields) => {
        if (err) {
            res.json({
                success: false,
                msg: 'An error occured, please try again'
            })
            return;
        }

        // Found 1 user with this username
        if (data && data.rows.length === 1) {

            // console.log('Data found');
            bcrypt.compare(password, data.rows[0].password, (bcryptErr, verified) => {
                if (verified) {

                    req.session.userID = data.rows[0].id;
                    res.json({
                        success: true,
                        msg: 'Session Start',
                        userid: data.rows[0].userid
                    })
                    return;
                }

                else {
                    res.json({
                        success: false,
                        msg: 'Invalid Password'
                    })
                }

            });

        }
        else {
            res.json({
                success: false,
                msg: 'User not found, please try again'
            })
        }
    });
});

//! Log Out

app.post('/user/logout', (req, res) => {
    let { logout } = req.body;

    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        if (logout === true) {
            res.json({
                success: true,
                msg: 'Logged Out Successfuly and session destroy'
            })
        }
    });
})

//! Forgot Password

app.post('/user/forgotpass', (req, res) => {
    let { userid, email } = req.body;

    pool.query('SELECT * FROM userdata WHERE userid = $1 AND email = $2', [userid, email], (err, data, fields) => {
        if (err) {
            res.json({
                success: false,
                msg: 'An error occured, please try again'
            })
            return;
        }

        // Found 1 user with this username
        if (data && data.rows.length === 1) {
            res.json({
                success: true,
                userid: data.rows[0].userid,
                msg: 'Data found'
            })
        }
        else {
            res.json({
                success: false,
                msg: 'User not found, please try again'
            })
        }
    });

});

//! Change Password

app.put('/user/changepass/:id', async (req, res) => {
    let { password } = req.body;
    const { id } = req.params;

    let hPassword = await bcrypt.hash(password, 10);

    pool.query('UPDATE userdata SET password = $1 WHERE userid = $2', [hPassword, id], (err, data, fields) => {
        if (err) {
            res.json({
                success: false,
                msg: 'An error occured, please try again'
            })
            return;
        }
        res.json({
            success: true,
            msg: 'Password Change successfuly'
        })
    });

});

//! Display all user

app.get('/user/dashbord', async (req, res) => {
    try {
        const allUser = await pool.query("SELECT * FROM userdata");
        res.json(allUser.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//! Delete User

app.delete('/user/dashbord/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query(`DELETE FROM userdata WHERE id = ${id}`);

        res.json({
            success: true,
            msg: 'Delete data successfuly'
        })
        return;
    } catch (err) {
        console.log(err.message);
    }
});

//! TODO APP

// ROUTES

//! create a todo

app.post('/user/todo', async (req, res) => {
    try {
        const { descripation } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (descripation) VALUES($1) RETURNING * ", [descripation]);

        res.json(newTodo.rows[0]);

    } catch (err) {
        console.log(err.message);
    }
});

//! get all todos

app.get('/user/todo', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//! get a todo

app.get('/user/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id}`);

        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

//! update a todo

app.put('/user/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { descripation } = req.body;
        const updateTodo = await pool.query('UPDATE todo SET descripation = $1 WHERE todo_id = $2 RETURNING *', [descripation, id]);

        res.json(updateTodo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

//! delete a todo

app.delete('/user/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(`DELETE FROM todo WHERE todo_id = ${id}`);

        res.json('Delete data successfuly');
    } catch (err) {
        console.log(err.message);
    }
})

app.listen(PORT, () => {
    console.log(`Server start on port no ${PORT}`);
});