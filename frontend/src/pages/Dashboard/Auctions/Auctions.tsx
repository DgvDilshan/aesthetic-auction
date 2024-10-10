import { useEffect, useState } from 'react';
import NavPills from '../../../components/ui/NavPills/NavPills';
import { sellerAuctionsPills } from '../../../data/sellerAuctionsPills';
import { Col, Row } from 'react-bootstrap';
import { Art } from '../../../models/Art';
import AuctionCard from '../../../components/ui/Cards/AuctionCard/AuctionCard';
import { getAuctionsByUser } from '../../../utils/auction';

interface AuctionWithArt {
  id: number;
  status: string;
  art: Art;
  startDate: string;
  endDate: string;
}

const Auctions = () => {
  const [auctions, setAuctions] = useState<AuctionWithArt[] | null | undefined>(
    null
  );

  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (userId) {
      getAuctionsByUser(userId, setAuctions);
    }
  }, [userId]);

  return (
    <div className='my-auction-wrap'>
      <NavPills navpills={sellerAuctionsPills} />

      <Row>
        {auctions?.map((auction) => (
          <Col xl={4} lg={6} key={auction.id}>
            <AuctionCard
              art={auction.art}
              status={auction.status}
              startDate={auction.startDate}
              endDate={auction.endDate}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Auctions;
