import React from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

const RefreshButton = ({ btnSize = 'btn-xs' }) => {

    return (
        <button onClick={()=>window.location.reload()} className={`btn ${btnSize} flex gap-x-2 bg-[#E87722] border-[#E87722] text-white hover:bg-[#d76611] hover:border-[#d76611]`} >
            <FiRefreshCcw className='text-md' />
            Recargar
        </button >
    );
};

export default RefreshButton;