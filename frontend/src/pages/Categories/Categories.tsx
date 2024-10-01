import { useEffect, useState } from 'react';
import { getCategoriesApi } from '../../services/CategoryServices';
import { CategoryGet } from '../../models/Category';
import { Col, Container, Row } from 'react-bootstrap';
import CategoryCard from '../../components/ui/Cards/CategoryCard/CategoryCard';
import Breadcrumb from '../../components/shared/Breadcrumb/Breadcrumb';

const Categories = () => {
  useEffect(() => {
    getCategories();
  }, []);

  const [categories, setCategories] = useState<
    CategoryGet[] | null | undefined
  >(null);

  const getCategories = async () => {
    try {
      const res = await getCategoriesApi();
      if (res?.data) {
        const categoriesArray = Array.isArray(res.data) ? res.data : [res.data];
        setCategories(categoriesArray);
      } else {
        setCategories(null);
      }
    } catch (error) {
      console.error('Error fetching styles:', error);
      setCategories(null);
    }
  };

  return (
    <div>
      <Breadcrumb>
        <h1>Categories</h1>

        <ul className='breadcrumb-list'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>Categories</li>
        </ul>
      </Breadcrumb>
      <div className='category-grid-section pt-60 mb-60'>
        <Container>
          <Row className='row gy-5 row-cols-xl-5 row-cols-md-4 row-cols-sm-3 row-cols-2'>
            {categories?.map((category) => (
              <Col>
                <CategoryCard category={category} key={category.id} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Categories;
