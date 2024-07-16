import React from 'react';

const Select = ({ title = 'Select Field', name, isRequired, id, onchange, options = ['Option 1', 'Option 2'] }) => {
    return (
        <div className="div">
            <label className="label">
                <span className="label-text">{title}</span>
            </label>
            <select id={id} className="select select-bordered select-xs h-[38px] rounded-[4px]  w-full max-w-xs" name={name} required={isRequired} onChange={onchange}>
                <option disabled selected>Elija una opción</option>

                {
                    options.map((option, index) => <option key={index}>{option}</option>)
                }
            </select>
        </div>
    );
};

export default Select;

