type Basket = {
  items: BasketItem[];
};

type BasketItem = {
  itemID: string;
  programID: string;
  price: number;
  name: string;
  description: string;
  thumbnailURL: string;
  teacherName: string;
  rating: number;
  voter: number;
  totalTime: number;
  tag: string;
  level : string
};





export type { Basket, BasketItem };
