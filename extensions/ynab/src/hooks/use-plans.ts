import { useMemo } from "react";
import { useApi } from "./use-api";
import { PlansResponse } from "~/types";

export const usePlans = () => {
    const { isLoading, data } = useApi<PlansResponse>("plans");

    const plans = useMemo(() => {
        return data?.data?.plans;
    }, [data]);

    const defaultPlan = useMemo(() => {
        return data?.data?.default_plan;
    }, [data]);

    return { isLoading, plans, defaultPlan };
};
