import { Col } from 'react-bootstrap';
import { useDropzone, DropEvent, FileRejection } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';

import { getStyleAPI } from '../../services/StyleServices';
import Form from '../../components/ui/Form/Form';
import Input from '../../components/ui/Input/Input';
import Textarea from '../../components/ui/Textarea/Textarea';
import Select from '../../components/ui/Select/Select';
import PrimaryButton from '../../components/ui/Buttons/PrimaryButton/PrimaryButton';
import Dropzone from '../../components/ui/Dropzone/Dropzone';
import { Style } from '../../models/Style';
import { Medium } from '../../models/Medium';
import { getMediumAPI } from '../../services/MediumServices';
import { artPostAPI } from '../../services/ArtServices';
import { toast } from 'react-toastify';

type Option = {
  value: string;
  label: string;
};

const AddArt = () => {
  const [title, setTitle] = useState('');
  const [currentMarketPrice, setCurrentMarketPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [styleValue, setStyleValue] = useState('');
  const [mediumValue, setMediumValue] = useState('');
  const [isFramed, setIsFramed] = useState('');

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [styles, setStyles] = useState<Style[] | null | undefined>(null);
  const [mediums, setMediums] = useState<Medium[] | null | undefined>(null);

  useEffect(() => {
    getStyles();
    getMediums();
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
      parseInt(styleValue),
      parseInt(mediumValue)
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

  const getStyles = async () => {
    try {
      const res = await getStyleAPI();
      if (res?.data) {
        const stylesArray = Array.isArray(res.data) ? res.data : [res.data];
        setStyles(stylesArray);
      } else {
        setStyles(null);
      }
    } catch (error) {
      console.error('Error fetching styles:', error);
      setStyles(null);
    }
  };

  const getMediums = async () => {
    try {
      const res = await getMediumAPI();
      if (res?.data) {
        const mediumArray = Array.isArray(res.data) ? res.data : [res.data];
        setMediums(mediumArray);
      } else {
        setMediums(null);
      }
    } catch (error) {
      console.error('Error fetching styles:', error);
      setMediums(null);
    }
  };

  const options = [
    {
      value: 'true',
      label: 'True',
    },
    { value: 'false', label: 'False' },
  ];

  const styleOptions: Option[] = styles
    ? styles.map((style) => ({
        value: style.id.toString(),
        label: style.styleType,
      }))
    : [];

  const mediumOptions: Option[] = mediums
    ? mediums.map((medium) => ({
        value: medium.id.toString(),
        label: medium.mediumType,
      }))
    : [];

  return (
    <div className='auth-container'>
      <Form onSubmit={handleSubmit}>
        <h2 className='auth-title'>Add Product</h2>
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
            options={styleOptions}
            onChange={(e) => setStyleValue(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Select
            label='Art Medium'
            id='artMedium'
            name='artMedium'
            options={mediumOptions}
            onChange={(e) => setMediumValue(e.target.value)}
          />
        </Col>
        <div className='auth-btn'>
          <PrimaryButton variant='white' text='Add Art' type='submit' />
        </div>
      </Form>
    </div>
  );
};

export default AddArt;
