import React from 'react'

    const InputField = (props) => {

        return (
            <>
                <input
                    className='input'
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            </>
        );
};

export default InputField;
