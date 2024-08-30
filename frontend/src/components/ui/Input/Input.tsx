import './input.css';

type InputProps = {
  label?: string;
  type: string;
  id: string;
  placeHolder?: string;
  name: string;
};

const Input = ({ label, type, id, placeHolder, name }: InputProps) => {
  return (
    <div className='form-inner'>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} placeholder={placeHolder} id={id} name={name} />
    </div>
  );
};

export default Input;
