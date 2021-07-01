import { useState } from "react";
import { NavLink } from "react-router-dom";
import InputField from '../other/InputField';
import SubmitButton from '../other/SubmitButton';
import UserStore from '../stores/UserStore';

const Forgotpass = (props) => {

    const [userid, setUserid] = useState('');
    const [email, setEmail] = useState('');

    const resetForm = () => {
        setUserid('');
        setEmail('');
    }

    const ValidateEmail = (mail) => {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (mail.match(mailformat)) {
            return (true)
        }
        return (false)
    }

    const doFp= async () => {
        if (!userid || !email) {
            alert('Fill all field');
            return;
        }

        if(ValidateEmail(email) === false){
            alert("You have entered an invalid email address!")
            return;
        }

        try {
            let res = await fetch('http://localhost:5000/user/forgotpass', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userid: userid,
                    email: email
                })
            });

            let jsonData = await res.json();
            console.log(jsonData);

            if(jsonData.success === true){
                console.log('Success');
                UserStore.userid = jsonData.userid;
                console.log(UserStore.userid);
                props.history.push('/user/changepass');
            }
            else{
                alert(jsonData.msg);
                resetForm();
                props.history.push('/user/forgotpass');
            }
        }
        
        catch (e) {
            console.log(e);
            resetForm();
        }
    }

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
                    <div className="f">
                        <SubmitButton
                            text='Submit'
                            onClick={() => doFp()}
                        />
                    </div>
                </div>

            </div>
        </>
    );
};

export default Forgotpass;