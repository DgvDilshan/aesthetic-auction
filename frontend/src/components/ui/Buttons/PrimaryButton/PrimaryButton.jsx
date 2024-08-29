import './primaryButton.css';
import PropTypes from 'prop-types';

const PrimaryButton = ({ variant, text, onClick, link }) => {
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

PrimaryButton.propTypes = {
  variant: PropTypes.oneOf(['default, white']).isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func,
};

export default PrimaryButton;
