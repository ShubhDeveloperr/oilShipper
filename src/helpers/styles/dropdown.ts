import { StylesConfig } from "react-select";

interface PipelineOption {
    label: string;
    value: string;
}

export const colourStyles: StylesConfig<PipelineOption, true> = {
    control: (styles) => ({ ...styles, backgroundColor: '#1f2a36', color: '#fff' }),
    option: (styles, {  isDisabled }) => {
      return {
        ...styles,
        backgroundColor: '#1f2a36',
        color: '#fff',
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
          ...styles[':active'],
          backgroundColor: '#1f2a36',
        },
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: '#1f2a36',
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: '#fff',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: '#fff',
      ':hover': {
        backgroundColor: '#333',
        color: '#fff',
      },
    }),
    placeholder:(styles) => ({
      ...styles,
      color:'white'
    }),
    input:(styles) => ({
      ...styles,
      color:'white'
    }),
    dropdownIndicator:(styles) =>({
        ...styles,
        // padding:'10px',
        // boxSizing:'border-box'
    }),
    menu: (styles) => ({
      ...styles,
      zIndex: 10,
      backgroundColor: '#1f2a36',
    }),
    menuList: (styles) => ({
      ...styles,
      zIndex: 10, 
      padding: '0', 
    }),
  };