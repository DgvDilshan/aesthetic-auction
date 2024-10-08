import axios from 'axios';
import { AuctionGet, AuctionPost } from '../models/Auction';
import { handleError } from '../handlers/ErrorHandler';

const api = 'http://localhost:5256/backend/auction';

export const auctionPostApi = async (
  startDate: Date,
  endDate: Date,
  artId: number
) => {
  try {
    const token = localStorage.getItem('token');

    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();

    const data = await axios.post<AuctionPost>(
      api,
      {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        artId: artId,
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

export const auctionGetApi = async () => {
  try {
    const data = await axios.get<AuctionGet>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const auctionGetByUserApi = async (id: string) => {
  try {
    const data = await axios.get<AuctionGet>(`${api}/user/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
