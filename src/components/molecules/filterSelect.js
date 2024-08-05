import React from 'react';
import Select, { components } from 'react-select';


const DropdownIndicator = (props
) => {
  return (
    <components.DropdownIndicator {...props}>
      🔎
    </components.DropdownIndicator>
  );
};
  

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
 


export default ({options, setSelectedFilters}) => {
        const handleChange = (selectedOptions) => {
          // Llamar a la función onChange pasada como prop

          if(setSelectedFilters){
            setSelectedFilters(selectedOptions.map(x=>x.value))

          }
        };

      
        return (
          <Select
            closeMenuOnSelect={true}
            defaultValue={[]}
            isMulti
            options={options.map(x => ({ value: x, label: x }))}
            styles={customStyles}
            onChange={handleChange}
          />
        );
      };
      