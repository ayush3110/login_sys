import React, { useState } from 'react';
import InputField from '../other/InputField';
import SubmitButton from '../other/SubmitButton';
import UserStore from '../stores/UserStore';

const SignIn = (props) => {

    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const resetForm = () => {
        setUsername('');
        setUserid('');
        setEmail('');
        setPassword('');
        setCpassword('');
    }

    const ValidateEmail = (mail) => {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (mail.match(mailformat)) {
            return (true)
        }
        return (false)
    }

    const doSignin = async () => {
        if (!username || !userid || !email || !password || !cpassword) {
            console.log('Fill all field');
            alert('Fill all field');
            return;
        }

        if (password.length < 6) {
            console.log('Password should be at least 6 charactors');
            alert('Password should be at least 6 charactors');
            return;
        }

        if (password !== cpassword) {
            console.log('Password do not match');
            alert('Password do not match');
            return;
        }

        if (ValidateEmail(email) === false) {
            alert("You have entered an invalid email address!")
            return;
        }

        try {
            let res = await fetch('http://localhost:5000/user/signin', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    userid: userid,
                    username: username,
                    email: email,
                    password: password,
                })
            });

            let jsonData = await res.json();
            console.log(jsonData);

            if (jsonData.success === true) {
                alert(jsonData.msg);
                console.log('Success');
                props.history.push('/user/login');
            }
            else {
                alert(jsonData.msg);
                resetForm();
                props.history.push('/user/signin');
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    if (UserStore.isLoggedIn) {
        return (
            <>
                {
                    props.history.push('/user/dashbord')
                }
            </>
        )
    }
    else {
        return (
            <>
                <div className="sicontainer">
                    <div className="field">
                        <div className="t">
                            Name:
                        </div>
                        <div className="f">
                            <InputField
                                type='text'
                                placeholder="Enter your Name"
                                value={username}
                                onChange={setUsername}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="t">
                            User Id:
                        </div>
                        <div className="f">
                            <InputField
                                type='text'
                                placeholder='Enter your User Id'
                                value={userid}
                                onChange={setUserid}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="t">
                            Email:
                        </div>
                        <div className="f">
                            <InputField
                                type='email'
                                placeholder='Enter your Email'
                                value={email}
                                onChange={setEmail}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="t">
                            Password:
                        </div>
                        <div className="f">
                            <InputField
                                type='password'
                                placeholder='Enter your Password'
                                value={password}
                                onChange={setPassword}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="t">
                            Confirm Password:
                        </div>
                        <div className="f">
                            <InputField
                                type='password'
                                placeholder='Enter your Confirm Password'
                                value={cpassword}
                                onChange={setCpassword}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="f">
                            <SubmitButton
                                text='Signin'
                                onClick={() => doSignin()}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SignIn;