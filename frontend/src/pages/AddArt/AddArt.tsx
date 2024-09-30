import { Col, Container, Row } from 'react-bootstrap';
import { useDropzone, DropEvent, FileRejection } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';

import Form from '../../components/ui/Form/Form';
import Input from '../../components/ui/Input/Input';
import Textarea from '../../components/ui/Textarea/Textarea';
import Select from '../../components/ui/Select/Select';
import PrimaryButton from '../../components/ui/Buttons/PrimaryButton/PrimaryButton';
import Dropzone from '../../components/ui/Dropzone/Dropzone';
import { artPostAPI } from '../../services/ArtServices';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/shared/Breadcrumb/Breadcrumb';
import { getCategoriesApi } from '../../services/CategoryServices';
import { CategoryGet } from '../../models/Category';
import { useNavigate } from 'react-router-dom';

type Option = {
  value: string;
  label: string;
};

const AddArt = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [currentMarketPrice, setCurrentMarketPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [isFramed, setIsFramed] = useState('');
  const [toastShown, setToastShown] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [categories, setCategories] = useState<
    CategoryGet[] | null | undefined
  >(null);

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (typeof acceptedFiles[0] === 'undefined') return;

    const formData = new FormData();

    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'aesthetic-auction');
    formData.append('api_key', import.meta.env.VITE_CLOUDNARY_API_KEY);

    const result = await fetch(
      'https://api.cloudinary.com/v1_1/dsseoknzm/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((r) => r.json());

    const isFramedBool = isFramed === 'true';

    artPostAPI(
      title,
      result.secure_url,
      parseFloat(currentMarketPrice),
      condition,
      isFramedBool,
      parseFloat(height),
      parseFloat(width),
      parseInt(categoryValue)
    )
      .then((res) => {
        if (res) {
          toast.success('Art created successfully');
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      const file = new FileReader();

      file.onload = () => {
        setPreview(file.result);
      };
      file.readAsDataURL(acceptedFiles[0]);

      console.log(fileRejections, event);
    },
    []
  );
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  console.log(preview);

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

  const options = [
    {
      value: 'true',
      label: 'True',
    },
    { value: 'false', label: 'False' },
  ];

  const categoryOptions: Option[] = categories
    ? categories.map((category) => ({
        value: category.id.toString(),
        label: category.categoryName,
      }))
    : [];

  const hasStore = localStorage.getItem('hasStore');

  useEffect(() => {
    if (hasStore === '0' && !toastShown) {
      toast.warning('You must create a store first');
      navigate('/create-store');
      setToastShown(true);
    }
  }, [hasStore, toastShown, navigate]);

  return (
    <div>
      <Breadcrumb>
        <h1>Add Art</h1>

        <ul className='breadcrumb-list'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>Add art</li>
        </ul>
      </Breadcrumb>
      <Container>
        <Row style={{ justifyContent: 'center' }}>
          <Col lg={10}>
            <Form onSubmit={handleSubmit}>
              <Col md={12} className='mb-20'>
                <Input
                  type='text'
                  label='Title'
                  placeHolder='Image title'
                  id='title'
                  name='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
              <Col md={12}>
                <Dropzone
                  label='Image'
                  id='image'
                  name='image'
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                  isDragActive={isDragActive}
                />
              </Col>
              <Col md={6} className='mb-20'>
                <Input
                  type='text'
                  label='Current Market Price'
                  placeHolder='20000.00'
                  name='currentMarketPrice'
                  id='currentMarketPrice'
                  value={currentMarketPrice}
                  onChange={(e) => setCurrentMarketPrice(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Select
                  label='Is Framed'
                  id='isFramed'
                  name='isFramed'
                  options={options}
                  onChange={(e) => setIsFramed(e.target.value)}
                />
              </Col>
              <Col md={12}>
                <Textarea
                  label='Condition'
                  placeHolder='Condition'
                  name='condition'
                  id='condition'
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Input
                  type='text'
                  label='Width'
                  placeHolder='720.00'
                  name='width'
                  id='width'
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Input
                  type='text'
                  label='Height'
                  placeHolder='720.00'
                  name='width'
                  id='width'
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Select
                  label='Art Style'
                  id='artStyle'
                  name='artStyle'
                  options={categoryOptions}
                  onChange={(e) => setCategoryValue(e.target.value)}
                />
              </Col>
              <div className='auth-btn'>
                <PrimaryButton variant='white' text='Add Art' type='submit' />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddArt;
