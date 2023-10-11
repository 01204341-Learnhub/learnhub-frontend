import { useDispatch, useSelector } from "react-redux"
import { setStatusFetchOnce, addItem, setStatusIsLoading, clearItem } from "../../../slices/basketSlice"
import { RootState } from "../../../store"
import { fetchBasketItems } from "../services/purchase"
import { useEffect} from 'react'
import { useUser } from "../../../hooks/useUser"


function useBasket() {
    const { user } = useUser()
    const { basket } = useSelector((state: RootState) => state.basket)
    const isFetchOnce = useSelector((state: RootState) => state.basket.isFetchOnce)
    const dispatcher = useDispatch()

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
    
              setStatusIsLoading(true)
            } catch (error) {
              console.error("Error fetching basket:", error);
            }
          }
        }
    
        // Call fetchBasket when the component mounts
        fetchBasket();
      }, [isFetchOnce, dispatcher, user]);
    return basket
}

export { useBasket }