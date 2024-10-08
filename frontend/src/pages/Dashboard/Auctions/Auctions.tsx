import { useEffect, useState } from 'react';
import NavPills from '../../../components/ui/NavPills/NavPills';
import { sellerAuctionsPills } from '../../../data/sellerAuctionsPills';
import { AuctionGet } from '../../../models/Auction';
import { auctionGetByUserApi } from '../../../services/AuctionServices';
import { Col, Row } from 'react-bootstrap';
import { artGetByIdApi } from '../../../services/ArtServices';
import { Art, ArtGet } from '../../../models/Art';
import AuctionCard from '../../../components/ui/Cards/AuctionCard/AuctionCard';

const Auctions = () => {
  const [auctions, setAuctions] = useState<AuctionGet[] | null | undefined>(
    null
  );
  const [arts, setArts] = useState<ArtGet[] | null>(null);

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
              const artRes = await artGetByIdApi(auction.artId);
              return artRes?.data || null;
            } catch (error) {
              console.error('Error fetching art data:', error);
              return null;
            }
          })
        );

        const flatArts = artsData.filter((art): art is ArtGet => art !== null);

        if (flatArts) {
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
  console.log(auctions);
  console.log(arts);
  return (
    <div className='my-auction-wrap'>
      <NavPills navpills={sellerAuctionsPills} />

      <Row>
        {arts?.map((art) => (
          <Col xl={4} lg={6}>
            <AuctionCard art={art} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Auctions;
