import React from 'react'
import Select from 'react-select';
import { useField } from 'formik';

const SelectField = (props) => {
    const [field, state, { setValue, setTouched }] = useField(props.field.name);
    const onChange = ({ value }) => {
        setValue(value);
      };
    
      return <Select {...props} onChange={onChange} onBlur={setTouched} className="form-control select2" />;
}

export default SelectField