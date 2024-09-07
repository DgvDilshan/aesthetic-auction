import axios from 'axios';
import { handleError } from '../handlers/ErrorHandler';
import { Style } from '../models/Style';

const api = 'http://localhost:5256/backend/style';

export const getStyleAPI = async () => {
  try {
    const data = await axios.get<Style>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};
