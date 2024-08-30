import './form.css';
import { Row } from 'react-bootstrap';

type FormProps = {
  children: React.ReactNode;
};

const Form: React.FC<FormProps> = ({ children }) => {
  return (
    <div className='form'>
      <form action=''>
        <Row>{children}</Row>
      </form>
    </div>
  );
};

export default Form;
