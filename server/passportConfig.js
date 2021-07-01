const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db');
const bcrypt = require('bcrypt');

function initialize(passport) {

    const authenticateUser = (userid, password, done) => {

        pool.query(
            `SELECT * FROM userdata WHERE userid = $1`, [userid], (err, results) => {
                if (err) {
                    throw err;
                }

                console.log(results.rows);

                if (results.rows.length > 0) {
                    const user = results.rows[0];

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err;
                        }

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password is not correct' });
                        }
                    });
                } else {
                    return done(null, false, { message: 'Userid is not registered' });
                }
            }
        );
    };

    passport.use(
        new LocalStrategy({
            usernameField: 'userid',
            passwordField: 'password'
        },
            authenticateUser
        )
    );

    passport.serializeUser((user, done) => { console.log('Enter into serializeUser'); console.log(user.id);done(null, user.id) });

    passport.deserializeUser((id, done) => {
        pool.query(
            `SELECT * FROM userdata WHERE id =$1`, [id], (err, results) => {
                if (err) {
                    throw err;
                }
                console.log('Enter deswrializUser');
                console.log(results.rows[0]);
                return done(null, results.rows[0]);
            }
        );
    });
};

module.exports = initialize;