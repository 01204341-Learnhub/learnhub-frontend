type Wishlist = {
  items: WishlistItem[];
};

type WishlistItem = {
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





export type { Wishlist, WishlistItem };
