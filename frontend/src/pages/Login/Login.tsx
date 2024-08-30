import PrimaryButton from '../../components/ui/Buttons/PrimaryButton/PrimaryButton';
import { Col } from 'react-bootstrap';
import Input from '../../components/ui/Input/Input';
import Form from '../../components/ui/Form/Form';

const Login = () => {
  return (
    <div className='auth-container'>
      <Form>
        <h2 className='auth-title'>Login</h2>
        <Col md={6} className='mb-20'>
          <Input
            label='Username'
            type='text'
            placeHolder='Themiya'
            id='username'
            name='username'
          />
        </Col>
        <Col md={6}>
          <Input
            label='Password'
            type='password'
            placeHolder='Password@123'
            id='password'
            name='password'
          />
        </Col>
        <div className='auth-btn'>
          <PrimaryButton variant='white' text='Login' />
        </div>
      </Form>
    </div>
  );
};

export default Login;
