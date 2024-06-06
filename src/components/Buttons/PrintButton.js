import React from 'react';
import { BsPrinter } from 'react-icons/bs';

const PrintButton = ({ btnSize = 'btn-xs' }) => {
    return (
        <button 
        //onClick={() => window.print()} 
        className={`btn ${btnSize} gap-x-2  bg-[#E87722] border-[#E87722] text-white hover:bg-[#d76611] hover:border-[#d76611]`}>
            <BsPrinter className='text-md' />
            Imprimir
        </button>
    );
};

export default PrintButton;