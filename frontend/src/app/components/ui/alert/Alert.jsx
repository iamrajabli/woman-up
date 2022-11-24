import React, { useMemo } from 'react';

const Alert = ({ type, text }) => {

    const classType = useMemo(() => {
        switch (type) {
            case 'danger':
                return 'bg-red-500';
            case 'success':
                return 'bg-green-500';
            default:
                return 'bg-yellow-500';
        }
    }, [type])

    return (
        <div>
            <p className={'p-2 mb-4 font-bold ' + classType}>
                {text}
            </p>
        </div>
    );
};

export default Alert;