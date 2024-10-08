import './AuctionCard.css';
import { RiAuctionFill, RiHeartLine, RiEyeLine } from '@remixicon/react';
import BidButton from '../../Buttons/BidButton/BidButton';

interface Art {
  title: string;
  image: string;
  lot: string;
  currentMarketPrice: number;
}

type AuctionCardProps = {
  art: Art;
};

const AuctionCard = ({ art }: AuctionCardProps) => {
  return (
    <div className='auction-card'>
      <div className='auction-card-wrapper'>
        <a href='' className='card-image'>
          <img src={art?.image} alt='auc' />
        </a>
        <div className='batch'>
          <span className='live'>
            <RiAuctionFill size={16} /> Live
          </span>
          <div className='code-no'>
            <span className='code'>LOT #{art?.lot}</span>
          </div>
        </div>

        <ul className='view-and-favorite-area'>
          <li>
            <a href=''>
              <RiHeartLine size={18} />
            </a>
          </li>
          <li>
            <a href=''>
              <RiEyeLine size={18} />
            </a>
          </li>
        </ul>

        <div className='countdown-timer'>
          <ul data-countdown='2024-10-23 12:00:00'>
            <li className='times' data-days='0'>
              49<span>Days</span>
            </li>
            <li className='colon'>:</li>
            <li className='times' data-hours='0'>
              15<span>Hours</span>
            </li>
            <li className='colon'>:</li>
            <li className='times' data-minutes='0'>
              23<span>Min</span>
            </li>
            <li className='colon'>:</li>
            <li className='times' data-seconds='0'>
              58<span>Sec</span>
            </li>
          </ul>
        </div>
      </div>

      <div className='auction-card-content'>
        <h6>
          <a href=''>{art.title}</a>
        </h6>

        <div className='price-area'>
          <div className='price'>
            <span>Current Bid at:</span>
            <strong>${art.currentMarketPrice.toLocaleString()}</strong>
          </div>
          <BidButton text='Bid now' link='/' />
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
