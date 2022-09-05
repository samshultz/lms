import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useField } from 'formik';

const PhoneField = (props) => {
    const [field, state, { setValue, setTouched }] = useField(props.field.name);
    const { options } = props
    const onChange = (value) => {
        setValue(value);
      };
    
      return <PhoneInput {...props} onChange={onChange} onBlur={setTouched} className="form-control"
        value={field.value}
      />;
}

export default PhoneField