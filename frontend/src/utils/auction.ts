import { Dispatch, SetStateAction } from 'react';
import { Art } from '../models/Art';
import { artGetByIdApi } from '../services/ArtServices';
import { auctionGetByUserApi } from '../services/AuctionServices';

interface AuctionWithArt {
  id: number;
  status: string;
  art: Art;
  startDate: string;
  endDate: string;
}

export const getAuctionsByUser = async (
  userId: string,
  setAuctions: Dispatch<SetStateAction<AuctionWithArt[] | null | undefined>>
) => {
  try {
    const res = await auctionGetByUserApi(userId);

    if (res?.data) {
      const auctionArray = Array.isArray(res.data) ? res.data : [res.data];

      const artsData = await Promise.all(
        auctionArray.map(async (auction) => {
          try {
            const artRes = await artGetByIdApi(auction.artId);
            return { ...auction, art: artRes?.data || null };
          } catch (error) {
            console.error('Error fetching art data:', error);
            return { ...auction, art: null };
          }
        })
      );

      const validAuctions = artsData.filter(
        (item): item is AuctionWithArt & { art: Art } => item.art !== null
      );

      setAuctions(validAuctions);
    } else {
      setAuctions(null);
    }
  } catch (error) {
    console.error(error);
    setAuctions(null);
  }
};
