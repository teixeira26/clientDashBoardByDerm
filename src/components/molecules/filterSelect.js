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
 


export default ({options, setSelectedFilters, setSearch}) => {
        const handleChange = (selectedOptions) => {
          // Llamar a la función onChange pasada como prop

          if(setSelectedFilters){
            setSelectedFilters(selectedOptions.map(x=>x.value))

          }
        };

        const handleInputChange = (inputValue) => {
          setSearch(inputValue); // Llama a setSearch con el valor de búsqueda
          return inputValue; // Retorna el valor para que react-select lo maneje
        };
      
        return (
          <Select
            closeMenuOnSelect={false}
            components={{ DropdownIndicator: null }} // Opcional: personalizar el dropdown
            defaultValue={[]}
            isMulti
            options={options?.map(x => ({ value: x, label: x }))}
            styles={customStyles}
            onChange={handleChange}
            onInputChange={handleInputChange} // Captura el cambio en el campo de búsqueda
          />
        );
      };
      