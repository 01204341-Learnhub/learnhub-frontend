import { useEffect, useState } from "react";
import { Income } from "../types/incomes.ts";
import { useUser } from "../../../hooks/useUser.ts";
import { listTeacherIncomes } from "../services/incomes";

export function useTeachIncomes() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isFetchingsIncomes, setIsFetchingIncomes] = useState<boolean>(true);
  const { user } = useUser();
  useEffect(() => {
    async function fetchIncomes() {
      const fetchedIncomes = await listTeacherIncomes(user.userID);
        setIncomes(fetchedIncomes);
      }
    setIsFetchingIncomes(true);
    fetchIncomes().then(() => {

        setIsFetchingIncomes(false);
    });
  }, [user.userID])

  return { incomes, isFetchingsIncomes}
}
