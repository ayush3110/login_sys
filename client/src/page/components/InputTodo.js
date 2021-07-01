import React, { useEffect, useState } from 'react';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import Button from '@material-ui/core/Button';
import InputField from '../../other/InputField';
import UserStore from '../../stores/UserStore';

const InputTodo = () => {

    const [descripation, setDescripation] = useState('');

    // useEffect(() => {
    //     UserStore.isLoggedIn = true;
    // }, []);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (!descripation) {
            alert('Please Enter data');
        }
        else {
            try {
                const body = { descripation };
                const response = await fetch('http://localhost:5000/user/todo', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                // UserStore.isLoggedIn = true;
                window.location.reload();
                // window.location = 'http://localhost:3000/user/todo';
                console.log(response);
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    return (
        <>
            <div className="todocontainer">

                <h1 className="tTitle">Todo List</h1>
                <div className='tInput'>
                    <InputField
                        type='text'
                        placeholder='Add here'
                        value={descripation}
                        onChange={setDescripation}
                    />
                    <Button className='btn btn-success' style={{ backgroundColor: 'green' }} onClick={onSubmitForm}><AddSharpIcon /></Button>
                </div>

            </div>
        </>
    )
}
export default InputTodo;