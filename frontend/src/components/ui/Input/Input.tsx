import './input.css';

type InputProps = {
  label?: string;
  type: string;
  id: string;
  placeHolder?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const Input = ({
  label,
  type,
  id,
  placeHolder,
  name,
  value,
  onChange,
  error,
}: InputProps) => {
  return (
    <div className='form-inner'>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        placeholder={placeHolder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className='error-message'>{error}</span>
    </div>
  );
};

export default Input;
