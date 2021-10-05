export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  accessories: {
    id: string;
    name: string;
    type: string;
  }[];
  photos: {
    id: string;
    photo: string;
  }[];
}
