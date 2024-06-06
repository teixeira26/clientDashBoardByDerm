import React from 'react';
import Select from 'react-select';


const SelectData = ({ title = 'Select Field', name, isRequired, id, onchange, value, handleClear, options = ['Option 1', 'Option 2'] }) => {


    return (
        <div className="div">
            <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet"/>

            
            <label className="label">
                <span className="label-text">{title}</span>
            </label>
            <Select options={options.map((option)=>{return {value: option, label: option}})} isSearchable id={id} value={value} placeholder={'Elija una opción'} className=" bg-red w-full" name={name} required={isRequired} onChange={(e)=>{
                onchange(e)
                }}>
            </Select>
        </div>
    );
};

export default SelectData;
