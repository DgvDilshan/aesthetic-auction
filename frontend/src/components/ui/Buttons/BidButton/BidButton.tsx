import './bidButton.css';

type BidBtnProps = {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  link?: string;
  type?: 'button' | 'submit' | 'reset';
};

const BidButton = ({ text, onClick, link, type }: BidBtnProps) => {
  return (
    <>
      {link ? (
        <a className='bid-btn' href={link}>
          {text}
        </a>
      ) : (
        <button className='bid-btn' onClick={onClick} type={type}>
          {text}
        </button>
      )}
    </>
  );
};

export default BidButton;
