import React from 'react';
import { BsFillArrowUpRightSquareFill } from 'react-icons/bs';

const AddModal = ({ name = '' }) => {
    return (
        <div className="p-2 rounded-lg flex items-center gap-x-3">
            <p className='text-center text-black'>{name} Agregado 🙌.</p>
        </div>
    );
};

export default AddModal;