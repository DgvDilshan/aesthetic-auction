import Form from '../../components/ui/Form/Form';
import Col from 'react-bootstrap/Col';
import Input from '../../components/ui/Input/Input';
import PrimaryButton from '../../components/ui/Buttons/PrimaryButton/PrimaryButton';

const Signup = () => {
  return (
    <div className='auth-container'>
      <Form>
        <h2 className='auth-title'>Sign Up</h2>
        <Col md={12} className='mb-20'>
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
            label='Phone'
            type='text'
            placeHolder='+943483934'
            id='phone'
            name='phone'
          />
        </Col>
        <Col md={6}>
          <Input
            label='Email'
            type='email'
            placeHolder='example@gmail.com'
            id='email'
            name='email'
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
        <Col md={6}>
          <Input
            label='Confirm Password'
            type='password'
            placeHolder='Password@123'
            id='password'
            name='password'
          />
        </Col>
        <div className='auth-btn'>
          <PrimaryButton variant='white' text='Sign Up' />
        </div>
      </Form>
    </div>
  );
};

export default Signup;
