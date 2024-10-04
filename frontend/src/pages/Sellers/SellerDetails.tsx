import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/shared/Breadcrumb/Breadcrumb';
import { Col, Container } from 'react-bootstrap';
import SellerProfile from '../../components/store/SellerProfile/SellerProfile';
import { useEffect, useState } from 'react';
import { StoreGet } from '../../models/Store';
import { storeGetByIdApi } from '../../services/StoreServices';
import ProductWrapper from '../../components/ui/ProductWrapper/ProductWrapper';
import { artGetByStoreApi } from '../../services/ArtServices';
import { ArtGet } from '../../models/Art';
import AuctionCard from '../../components/ui/Cards/AuctionCard/AuctionCard';
import Filter from '../../components/ui/Filter/Filter';

const SellerDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [seller, setSeller] = useState<StoreGet[] | null | undefined>(null);
  const [arts, setArts] = useState<ArtGet[] | null | undefined>(null);

  useEffect(() => {
    if (id) {
      getSeller(id);
    }
  }, [id]);

  useEffect(() => {
    if (seller && seller[0]?.id) {
      getArts(seller[0].id);
    }
  }, [seller]);

  const getSeller = async (id: string) => {
    try {
      const res = await storeGetByIdApi(id);

      if (res?.data) {
        const sellerArray = Array.isArray(res.data) ? res.data : [res.data];
        setSeller(sellerArray);
      } else {
        setSeller(null);
      }
    } catch (error) {
      console.error(error);
      setSeller(null);
    }
  };

  const getArts = async (storeId: number) => {
    try {
      const res = await artGetByStoreApi(storeId);

      if (res?.data) {
        const artsArray = Array.isArray(res.data) ? res.data : [res.data];
        setArts(artsArray);
      } else {
        setArts(null);
      }
    } catch (error) {
      console.error(error);
      setArts(null);
    }
  };

  return (
    <div>
      <Breadcrumb>
        <h1>Seller Details</h1>

        <ul className='breadcrumb-list'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>Seller Details</li>
        </ul>
      </Breadcrumb>

      <Container>
        {seller?.map((sellerValues) => (
          <SellerProfile seller={sellerValues} key={sellerValues.id} />
        ))}

        <Filter />

        <ProductWrapper>
          {arts?.map((art) => (
            <Col xl={3} md={4}>
              <AuctionCard art={art} key={art.id} />
            </Col>
          ))}
        </ProductWrapper>
      </Container>
    </div>
  );
};

export default SellerDetails;
