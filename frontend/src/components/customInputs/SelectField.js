import React from 'react'
import Select from 'react-select';
import { useField } from 'formik';

const SelectField = (props) => {
    const [field, state, { setValue, setTouched }] = useField(props.field.name);
    const { options } = props

    const onChange = ({ value }) => {
        setValue(value);
      };
    
      return (
        <Select {...props} onChange={onChange} onBlur={setTouched} className="form-control select2" value={(options ? options.find(option => option.value === field.value) : '')}
      
      />
    )
}

export default SelectField