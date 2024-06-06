import React from 'react';
import { BsSave2 } from 'react-icons/bs';

const SaveButton = ({ btnSize = 'btn-xs', extraClass }) => {
    return (
        <button className={`btn ${btnSize} flex items-center gap-x-2 ${extraClass} bg-[#D76611] border-white text-white hover:bg-[#c65500] hover:border-white`}>
            Guardar
        </button>
    );
};

export default SaveButton;