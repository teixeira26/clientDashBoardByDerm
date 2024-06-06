import React from 'react';

const ModalCloseButton = ({ modalId, onClick }) => {
    return (
        <label htmlFor={`${modalId}`} className="btn btn-sm btn-circle absolute right-2 bg-white border-white text-[#D76611] hover:bg-[#D76611] hover:text-white hover:border-white" onClick={()=>onClick()}>✕</label>
    );
};

export default ModalCloseButton;