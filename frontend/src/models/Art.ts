export type ArtPost = {
  Title: string;
  Image: string;
  CurrentMarketPrice: number;
  Condition: string;
  isFramed: boolean;
  Height: number;
  Width: number;
  StyleId: number;
  MediumId: number;
};

export type ArtGet = {
  Lot: string;
  Title: string;
  Image: string;
  CurrentMarketPrice: number;
  Condition: string;
  isFramed: boolean;
  Height: number;
  Width: number;
  StyleId: number;
  MediumId: number;
  CreatedBy: number;
};
