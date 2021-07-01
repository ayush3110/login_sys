import { React, useState } from "react";
import InputField from '../other/InputField';
import SubmitButton from '../other/SubmitButton';
import UserStore from '../stores/UserStore';

const Changepass = (props) => {

    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const resetForm = () => {

        setPassword('');
        setCpassword('');
    }

    const doCp = async () => {
        if (!cpassword || !password) {
            alert('Fill all field');
            return;
        }

        if (cpassword !== password) {
            alert('Password do not match');
            resetForm();
            return;
        }

        try {
            let id = UserStore.userid;
            console.log(id);
            let res = await fetch(`http://localhost:5000/user/changepass/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password
                })
            });

            let jsonData = await res.json();
            console.log(jsonData);

            if(jsonData.success === true){
                alert(jsonData.msg);
                props.history.push('/user/login');
            }
            else{
                alert(jsonData.msg);
                resetForm();
                props.history.push('/user/changepass');
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
                        New Password:
                    </div>
                    <div className="f">
                        <InputField
                            type='password'
                            placeholder='Enter your New Password'
                            value={password}
                            onChange={setPassword}
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="t">
                        Confirm New Password:
                    </div>
                    <div className="f">
                        <InputField
                            type='password'
                            placeholder='Enter your Confirm New Password'
                            value={cpassword}
                            onChange={setCpassword}
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="f">
                        <SubmitButton
                            text='Submit'
                            onClick={() => doCp()}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Changepass;