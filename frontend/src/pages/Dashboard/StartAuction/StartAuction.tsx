import { Col, Row } from 'react-bootstrap';

import Form from '../../../components/ui/Form/Form';
import Input from '../../../components/ui/Input/Input';
import { useEffect, useState } from 'react';
import { Art } from '../../../models/Art';
import { artGetByStoreApi } from '../../../services/ArtServices';
import Select from '../../../components/ui/Select/Select';
import { auctionPostApi } from '../../../services/AuctionServices';
import PrimaryButton from '../../../components/ui/Buttons/PrimaryButton/PrimaryButton';

type Option = {
  value: string;
  label: string;
};

const StartAuction = () => {
  const [arts, setArts] = useState<Art[] | undefined | null>(null);
  const [artValue, setArtValue] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
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

  const artOptions: Option[] = arts
    ? arts.map((art) => ({
        value: art.id.toString(),
        label: art.title,
      }))
    : [];

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (startDate && endDate) {
      console.log(startDate);
      auctionPostApi(startDate, endDate, parseInt(artValue));
    } else {
      console.error('Start Date or End Date is null');
    }
  };

  return (
    <Row style={{ width: '100%' }}>
      <Form onSubmit={handleSubmit}>
        <Col md={6} className='mb-20'>
          <Input
            label='Auction Start Date'
            type='date'
            id='startDate'
            name='startDate'
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </Col>
        <Col md={6} className='mb-20'>
          <Input
            label='Auction End Date'
            type='date'
            id='endDate'
            name='endDate'
            value={endDate ? endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </Col>
        <Col md={6} className='mb-20'>
          <Select
            label='Select the Art'
            id='art'
            name='art'
            options={artOptions}
            onChange={(e) => setArtValue(e.target.value)}
          />
        </Col>
        <div className='auth-btn'>
          <PrimaryButton variant='white' text='Start Auction' type='submit' />
        </div>
      </Form>
    </Row>
  );
};

export default StartAuction;
