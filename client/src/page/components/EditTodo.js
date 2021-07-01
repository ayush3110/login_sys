import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const EditTodo = ({ t }) => {

    const [descripation, setDescripation] = useState(t.descripation);

    // Edit descripation

    const updateDescripation = async (e) => {
        e.preventDefault();
        try {
            const body = { descripation };
            // const {id} =t.todo_id;
            const response = await fetch(`http://localhost:5000/user/todo/${t.todo_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(body)
            });

            // window.location = '/';
            window.location.reload();
            console.log(response);
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <>
            <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${t.todo_id}`}>
                <EditIcon />
            </button>

            <div
                className="modal fade"
                id={`id${t.todo_id}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div
                    className="modal-dialog"
                    role="document">
                    <div
                        className="modal-content">
                        <div
                            className="modal-header">
                            <h5
                                className="modal-title"
                                id="exampleModalLabel">
                                Modal title</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => setDescripation(t.descripation)}
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">
                                    &times;</span>
                            </button>
                        </div>
                        <div
                            className="modal-body">
                            <input
                                type="text"
                                className='form-control'
                                onChange={(e) => setDescripation(e.target.value)}
                                value={descripation}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                onClick={(e) => updateDescripation(e)}
                                className="btn btn-warning">
                                Save changes</button>
                            <button type="button"
                                onClick={() => setDescripation(t.descripation)}
                                className="btn btn-danger"
                                data-dismiss="modal">
                                Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditTodo;