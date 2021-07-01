import React from 'react';
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';
import UserStore from '../stores/UserStore';

const Todo = (props) => {
    if (UserStore.isLoggedIn) {
        return (
            <>
                <div className="_container">
                    <InputTodo />
                    <ListTodo />
                </div>
            </>
        );
    }
    else {
        return (
            <>
                {
                    props.history.push('/user/login')
                }
            </>
        )
    }
}

export default Todo;