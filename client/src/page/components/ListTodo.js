import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const ListTodo = () => {

    const [todo, setTodo] = useState([]);

    // delete function

    const deleteTodo = async (id) => {
        try {
            const dTodo = await fetch(`http://localhost:5000/user/todo/${id}`, {
                method: 'DELETE'
            });

            setTodo(todo.filter((t) => t.todo_id !== id));
        } catch (err) {
            console.log(err.message);
        }
    }

    const getTodo = async () => {
        try {
            const response = await fetch('http://localhost:5000/user/todo');
            const jsonData = await response.json();

            setTodo(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodo();
    }, []);

    console.log(todo);

    return (
        <>
            <div className="listcontainer">
                {/* <div className="innerTable"> */}
                <div className="tableScrole">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Descripation</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                todo.map((t) => (
                                    <tr key={t.todo_id}>
                                        <td>{t.descripation}</td>
                                        <td>
                                            <Button>
                                                <EditTodo
                                                    t={t}
                                                />
                                            </Button>
                                        </td>
                                        <td>
                                            <Button className='btn-danger'
                                                onClick={() => deleteTodo(t.todo_id)} style={{ backgroundColor: 'red' }}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* </div> */}
            </div>
        </>
    )
}

export default ListTodo;