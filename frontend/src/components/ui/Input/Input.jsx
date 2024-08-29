import './input.css';
import PropTypes from 'prop-types';

const Input = ({ type, label, placeHolder, id, name }) => {
  return (
    <div className='form-inner'>
      <label htmlFor={id}>{label}</label>
      <input type={type} placeholder={placeHolder} id={id} name={name} />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
