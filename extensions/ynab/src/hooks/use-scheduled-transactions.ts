import { useCallback, useMemo } from "react";
import { useApi } from "./use-api";
import { PlanOptions, ScheduledTransactionsResponse } from "~/types";

export const useScheduledTransactions = (plan: PlanOptions = "default") => {
    const { isLoading, data } = useApi<ScheduledTransactionsResponse>(
        `plans/${plan}/scheduled_transactions`,
    );

    const scheduledTransactions = useMemo(() => {
        return data?.data?.scheduled_transactions;
    }, [data]);

    const getScheduledForCategory = useCallback(
        (categoryId: string) =>
            scheduledTransactions?.filter(
                (scheduleTransaction) =>
                    scheduleTransaction.category_id === categoryId,
            ),
        [scheduledTransactions],
    );

    return { isLoading, scheduledTransactions, getScheduledForCategory };
};
