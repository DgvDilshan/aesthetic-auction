import axios from 'axios';
import { handleError } from '../handlers/ErrorHandler';
import { StorePost } from '../models/Store';

const api = 'http://localhost:5256/backend/store';

export const storePostApi = async (
  name: string,
  email: string,
  phoneNumber: string,
  address: string,
  coverPhoto: string,
  profilePhoto: string
) => {
  try {
    const token = localStorage.getItem('token');

    const data = await axios.post<StorePost>(
      api,
      {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        coverPhoto: coverPhoto,
        profilePhoto: profilePhoto,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};
