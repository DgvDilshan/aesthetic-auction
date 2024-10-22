import { Container } from 'react-bootstrap';
import Banner from '../../components/home/Banner/Banner';
import LatestAuctions from '../../components/home/LatestAuctions/LatestAuctions';
import Categories from '../../components/home/Categories/Categories';

function Home() {
  return (
    <>
      <Banner />
      <Container>
        <LatestAuctions />
      </Container>
      <Categories />
    </>
  );
}

export default Home;
