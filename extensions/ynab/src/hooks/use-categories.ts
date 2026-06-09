import { useMemo } from "react";
import { useApi } from "./use-api";
import { CategoriesResponse, PlanOptions } from "~/types";

export const useCategories = (plan: PlanOptions = "default") => {
    const { isLoading, data } = useApi<CategoriesResponse>(
        `plans/${plan}/categories`,
    );

    const categoryGroups = useMemo(() => {
        return (
            data?.data?.category_groups.filter(
                (categoryGroup) =>
                    !categoryGroup.hidden &&
                    !categoryGroup.deleted &&
                    !categoryGroup.name.includes("Internal"),
            ) ?? []
        );
    }, [data]);

    return { isLoading, categoryGroups };
};
