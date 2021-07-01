import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import UserStore from '../stores/UserStore';

const Dashbord = (props) => {

    const [user, setUser] = useState([]);

    // delete function

    const deleteUser = async (id) => {
        try {
            const dUser = await fetch(`http://localhost:5000/user/dashbord/${id}`, {
                method: 'DELETE'
            });

            let jsonData = await dUser.json();
            console.log(jsonData);

            if (jsonData.success === true) {
                alert(jsonData.msg);
                console.log('Delete user Successfully');
                props.history.push('/user/dashbord');
            }
            else {
                alert('Error occure');
                props.history.push('/user/login');
            }

            setUser(user.filter((u) => u.id !== id));
        } catch (err) {
            console.log(err.message);
        }
    }

    const getUser = async () => {
        try {
            const response = await fetch('http://localhost:5000/user/dashbord');
            const jsonData = await response.json();

            if (jsonData && jsonData.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = true;
            }
            else {
                UserStore.loading = false;
                // UserStore.isLoggedIn = false;
            }

            setUser(jsonData);
        } catch (err) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
            console.error(err.message);
        }
    };

    useEffect(() => {
        getUser();
        // UserStore.isLoggedIn = true;
    }, []);

    const logOut = async () => {
        let res = await fetch('http://localhost:5000/user/logout', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                logout: true
            })
        });

        try {
            let result = await res.json();

            if (result && result.success) {
                UserStore.isLoggedIn = false;
                UserStore.userid = '';
                console.log(result.msg);
                props.history.push('/user/home');
            }

        } catch (err) {
            alert(err.message);
            console.error(err.message);
            props.history.push('/user/login');
        }
    }

    if (UserStore.isLoggedIn) {
        return (
            <>
                <div className="tcontainer">

                    <div className='welcom'>
                        Welcom {UserStore.userid}
                    </div>
                    <div>
                        <Button onClick={logOut} style={{ backgroundColor: 'red' }}>Log Out</Button>
                    </div>
                    <div className="tableScrole">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>User Id</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user.map((u) => (
                                        <tr key={u.id}>
                                            <td>{u.name}</td>
                                            <td>{u.userid}</td>
                                            <td>{u.email}</td>
                                            <td>{u.password}</td>
                                            <td>
                                                <Button
                                                    onClick={() => deleteUser(u.id)} style={{ backgroundColor: 'skyblue' }}
                                                >
                                                    <DeleteIcon />
                                                </Button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </>
        )
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

export default Dashbord;