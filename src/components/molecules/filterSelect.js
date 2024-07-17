import React from 'react';
import Select, { components } from 'react-select';


const DropdownIndicator = (props
) => {
  return (
    <components.DropdownIndicator {...props}>
      dsadas
    </components.DropdownIndicator>
  );
};

const colourOptions = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
  ];
  

  const customStyles = {
    singleValue: (provided, state) => ({
      ...provided,
      backgroundColor: 'red',
      color: 'white', 
      padding: '4px 8px', 
      borderRadius: '4px', 
      fontWeight: 'bold', 
    }),
  };


export default ({options}) => (
  <Select
    closeMenuOnSelect={false}
    components={{ DropdownIndicator }}
    defaultValue={[]}
    isMulti
    options={colourOptions}
    styles={customStyles}
  />
);