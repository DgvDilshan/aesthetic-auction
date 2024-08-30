import './primaryButton.css';

type PrimaryButtonProps = {
  variant: 'default' | 'white';
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  link?: string;
};

const PrimaryButton = ({
  variant,
  link,
  onClick,
  text,
}: PrimaryButtonProps) => {
  const buttonStyle = `primary-btn ${variant === 'white' ? 'color-white' : ''}`;
  return (
    <>
      {link ? (
        <a href={link} className={buttonStyle}>
          {text}
          <span></span>
        </a>
      ) : (
        <button className={buttonStyle} onClick={onClick}>
          {text}
          <span></span>
        </button>
      )}
    </>
  );
};

export default PrimaryButton;
