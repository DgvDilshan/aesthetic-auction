import './form.css';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';

const Form = ({ children }) => {
  return (
    <div className='form'>
      <form action=''>
        <Row>{children}</Row>
      </form>
    </div>
  );
};

Form.propTypes = {
  children: PropTypes.any,
};

export default Form;
