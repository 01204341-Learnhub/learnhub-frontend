import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../../hooks/useUser";
import {
  addItem,
  clearItem,
  setStatusFetchOnce,
  setStatusIsLoading,
} from "../../../slices/basketSlice";
import { RootState } from "../../../store";
import { fetchBasketItems } from "../services/purchase";

function useBasket() {
  const { user } = useUser();
  const { basket } = useSelector((state: RootState) => state.basket);
  const isFetchOnce = useSelector(
    (state: RootState) => state.basket.isFetchOnce
  );
  const dispatcher = useDispatch();

  useEffect(() => {
    async function fetchBasket() {
      if (!isFetchOnce && user && user.userID) {
        try {
          const BasketItems = await fetchBasketItems(user.userID);
          dispatcher(setStatusFetchOnce(true));
          dispatcher(clearItem());
          BasketItems.items.map((item) => {
            dispatcher(addItem(item));
          });

          setStatusIsLoading(true);
        } catch (error) {
          console.error("Error fetching basket:", error);
        }
      }
    }

    // Call fetchBasket when the component mounts
    fetchBasket();
  }, [dispatcher, isFetchOnce, user]);
  return basket;
}

export { useBasket };
