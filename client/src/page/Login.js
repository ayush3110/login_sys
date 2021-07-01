import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import InputField from '../other/InputField';
import SubmitButton from '../other/SubmitButton';
import UserStore from '../stores/UserStore';

const Login = (props) => {

    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setUserid('');
        setPassword('');
    }

    const doLogin = async () => {
        if (!userid || !password) {
            alert('Fill all field');
            return;
        }

        try {
            let res = await fetch('http://localhost:5000/user/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userid: userid,
                    password: password
                })
            });

            let result = await res.json();

            if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.userid = result.userid;
                console.log('Login Successfully');
                console.log(result.msg);
                props.history.push('/user/dashbord');
            }

            else if (result && result.success === false) {
                alert(result.msg);
                resetForm();
                props.history.push('/user/login');
            }
        }

        catch (e) {
            resetForm();
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
                        <div className="f">
                            <SubmitButton
                                text='Login'
                                onClick={() => doLogin()}
                            />
                        </div>
                    </div>

                    <div className="forgot">
                        <NavLink className='flink' to='/user/forgotpass'>
                            Forgot Password
                        </NavLink>
                    </div>

                </div>
            </>
        );
    }
};

export default Login;