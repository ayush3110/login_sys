import React from 'react'

const SubmitButton = (props) => {

        return (
            <>
                <button
                    className='_button'
                    onClick={() => props.onClick()}
                >
                    {props.text}
                </button>
            </>
        );

};

export default SubmitButton;
