import React from 'react';

const Alert = ({ text }) => {
    return (
        <div>
            <p className='bg-yellow-300 p-2 mb-4'>
                {text}
            </p>
        </div>
    );
};

export default Alert;