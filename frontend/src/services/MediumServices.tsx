import axios from 'axios';
import { handleError } from '../handlers/ErrorHandler';
import { Medium } from '../models/Medium';

const api = 'http://localhost:5256/backend/medium';

export const getMediumAPI = async () => {
  try {
    const data = await axios.get<Medium>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};
