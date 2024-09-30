import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/shared/Breadcrumb/Breadcrumb';
import { Container } from 'react-bootstrap';
import SellerProfile from '../../components/store/SellerProfile/SellerProfile';
import { useEffect, useState } from 'react';
import { StoreGet } from '../../models/Store';
import { storeGetByIdApi } from '../../services/StoreServices';

const SellerDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  useEffect(() => {
    if (id) {
      getSeller(id);
    }
  }, [id]);

  const [seller, setSeller] = useState<StoreGet[] | null | undefined>(null);

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
      </Container>
    </div>
  );
};

export default SellerDetails;
