import './AuctionCard.css';
import {
  RiAuctionFill,
  RiHeartLine,
  RiEyeLine,
  RiCalendarTodoFill,
} from '@remixicon/react';
import BidButton from '../../Buttons/BidButton/BidButton';
import { useEffect, useState } from 'react';

interface Art {
  title: string;
  image: string;
  lot: string;
  currentMarketPrice: number;
}

type AuctionCardProps = {
  art: Art;
  startDate?: string;
  endDate?: string;
  status?: string;
};

const AuctionCard = ({ art, status, startDate, endDate }: AuctionCardProps) => {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [auctionDuration, setAuctionDuration] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!startDate || !endDate) return;

    const calculateAuctionDuration = () => {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      const timeDiff = end - start;

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setAuctionDuration({ days, hours, minutes, seconds });
      } else {
        setAuctionDuration({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateAuctionDuration();
  }, [startDate, endDate]);

  useEffect(() => {
    if (!startDate) return;

    const calculateRemainingTime = () => {
      const now = new Date().getTime();
      const end = new Date(startDate).getTime();
      const timeDiff = end - now;

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setRemainingTime({ days, hours, minutes, seconds });
      } else {
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [startDate]);

  return (
    <div className='auction-card'>
      <div className='auction-card-wrapper'>
        <a href='' className='card-image'>
          <img src={art?.image} alt='auc' />
        </a>
        <div className='batch'>
          {status === 'Active' ? (
            <span className='live'>
              <RiAuctionFill size={16} /> Live
            </span>
          ) : (
            <span className='upcoming'>
              <RiCalendarTodoFill size={16} /> Upcoming
            </span>
          )}

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
            {status === 'Active' && (
              <>
                <li className='times' data-days='0'>
                  {auctionDuration.days}
                  <span>Days</span>
                </li>
                <li className='colon'>:</li>
                <li className='times' data-hours='0'>
                  {auctionDuration.hours}
                  <span>Hours</span>
                </li>
                <li className='colon'>:</li>
                <li className='times' data-minutes='0'>
                  {auctionDuration.minutes}
                  <span>Min</span>
                </li>
                <li className='colon'>:</li>
                <li className='times' data-seconds='0'>
                  {auctionDuration.seconds}
                  <span>Sec</span>
                </li>
              </>
            )}

            {status === 'Pending' && (
              <>
                <li className='times' data-days='0'>
                  {remainingTime.days}
                  <span>Days</span>
                </li>
                <li className='colon'>:</li>
                <li className='times' data-hours='0'>
                  {remainingTime.hours}
                  <span>Hours</span>
                </li>
                <li className='colon'>:</li>
                <li className='times' data-minutes='0'>
                  {remainingTime.minutes}
                  <span>Min</span>
                </li>
                <li className='colon'>:</li>
                <li className='times' data-seconds='0'>
                  {remainingTime.seconds}
                  <span>Sec</span>
                </li>
              </>
            )}
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
          {status === 'Active' ? (
            <BidButton text='Bid now' link='/' />
          ) : status === 'Pending' ? (
            <BidButton text='Notify me' link='/' />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
