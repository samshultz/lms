import React from 'react'
import CreatableSelect from 'react-select/creatable';
import { useField } from 'formik';


const CreatableSelectField = (props) => {
    const [field, state, { setValue, setTouched }] = useField(props.field.name);
    const onChange = ({ value }) => {
        setValue(value);
      };
    const { options } = props
      return <CreatableSelect {...props} onChange={onChange} onBlur={setTouched} className="form-control select2" 
        value={(options ? options.find(option => option.value === field.value) : '')}
      />;
}

export default CreatableSelectField