import { sellerArtPills } from '../../../data/sellerArtPills';
import NavPills from '../../../components/ui/NavPills/NavPills';
import { useEffect, useState } from 'react';
import { Art } from '../../../models/Art';
import { artGetByStoreApi } from '../../../services/ArtServices';
import { Col, Row } from 'react-bootstrap';
import AuctionCard from '../../../components/ui/Cards/AuctionCard/AuctionCard';

const Arts = () => {
  const [arts, setArts] = useState<Art[] | null | undefined>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const storeId = localStorage.getItem('storeId');

  useEffect(() => {
    if (storeId) {
      getArts(parseInt(storeId), pageNumber, pageSize);
    }
  }, [storeId, pageNumber, pageSize]);

  const getArts = async (storeId: number, page: number, size: number) => {
    try {
      const res = await artGetByStoreApi(storeId, {
        pageNumber: page,
        pageSize: size,
      });

      if (res?.data) {
        const artsArray = Array.isArray(res.data.arts)
          ? res.data.arts
          : [res.data.arts];
        setArts(artsArray);
        setTotalPages(Math.ceil(res?.data.totalCount / size));
      } else {
        setArts(null);
      }
    } catch (error) {
      console.error(error);
      setArts(null);
    }
  };

  return (
    <div className='my-auction-wrap'>
      <NavPills navpills={sellerArtPills} />

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

export default Arts;
