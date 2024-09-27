import { Col, Container, Row } from 'react-bootstrap';
import Banner from '../../components/home/Banner/Banner';
import AuctionCard from '../../components/ui/Cards/AuctionCard/AuctionCard';
import { useEffect, useState } from 'react';
import { artGetAPI } from '../../services/ArtServices';
import { ArtGet } from '../../models/Art';

function Home() {
  const [arts, setArts] = useState<ArtGet[] | null | undefined>(null);

  useEffect(() => {
    getArts();
  }, []);

  const getArts = async () => {
    try {
      const res = await artGetAPI(); // Use the correct API function
      if (res?.data) {
        setArts(res?.data); // Ensure res.data is an array of ArtGet objects
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Banner />
      <Container>
        <Row>
          {arts?.map((art) => (
            <Col xl={3} lg={4} md={6} key={art.lot}>
              <AuctionCard art={art} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
