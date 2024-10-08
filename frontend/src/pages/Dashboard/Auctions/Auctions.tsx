import { useEffect, useState } from 'react';
import NavPills from '../../../components/ui/NavPills/NavPills';
import { sellerAuctionsPills } from '../../../data/sellerAuctionsPills';
import { AuctionGet } from '../../../models/Auction';
import { auctionGetByUserApi } from '../../../services/AuctionServices';
import { Col, Row } from 'react-bootstrap';
import { artGetByIdApi } from '../../../services/ArtServices';
import { Art } from '../../../models/Art';
import AuctionCard from '../../../components/ui/Cards/AuctionCard/AuctionCard';

const Auctions = () => {
  const [auctions, setAuctions] = useState<AuctionGet[] | null | undefined>(
    null
  );
  const [arts, setArts] = useState<Art[] | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');

  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (userId) {
      getAuctions(userId);
    }
  }, [userId]);

  const getAuctions = async (userId: string) => {
    try {
      const res = await auctionGetByUserApi(userId);

      if (res?.data) {
        const auctionArray = Array.isArray(res.data) ? res.data : [res.data];
        setAuctions(auctionArray);

        const artsData = await Promise.all(
          auctionArray.map(async (auction) => {
            try {
              setStatus(auction.status);
              setStartDate(auction.startDate);
              setEndDate(auction.endDate);
              const artRes = await artGetByIdApi(auction.artId);
              return artRes?.data || null;
            } catch (error) {
              console.error('Error fetching art data:', error);
              return null;
            }
          })
        );
        const flatArts = artsData.filter((art): art is Art => art !== null);

        if (flatArts.length > 0) {
          setArts(flatArts);
        }
      } else {
        setAuctions(null);
      }
    } catch (error) {
      console.error(error);
      setAuctions(null);
    }
  };

  return (
    <div className='my-auction-wrap'>
      <NavPills navpills={sellerAuctionsPills} />

      <Row>
        {arts?.map((art) => (
          <Col xl={4} lg={6}>
            <AuctionCard
              art={art}
              status={status}
              startDate={startDate}
              endDate={endDate}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Auctions;
