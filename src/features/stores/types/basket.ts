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
};

export type { Basket, BasketItem };
