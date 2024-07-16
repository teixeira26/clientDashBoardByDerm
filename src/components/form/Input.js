import React from 'react';

const Input = ({ title = 'Input Field', type = 'text', placeholder = 'Type Here', name, onClick, id, isRequired, value, onchange}) => {
    return (
        <div>
            <label className="label">
                <span className="label-text">{title}</span>
            </label>
            <input id={id} type={type} onCLick={onClick} placeholder={placeholder} className="input input-xs input-bordered w-full h-[38px] rounded-[4px] max-w-xs" name={name} required={isRequired} defaultValue={value} onChange={onchange} />
        </div>
    );
};

export default Input;