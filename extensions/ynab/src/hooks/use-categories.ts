import { useMemo } from "react";
import { useApi } from "./use-api";
import { CategoryGroupResponse, PlanOptions } from "~/types";

export const useCategories = (plan: PlanOptions = "default") => {
  const { isLoading, data } = useApi<CategoryGroupResponse>(
    `plans/${plan}/categories`,
  );

  const categoryGroups = useMemo(() => {
    return (
      data?.data?.category_groups.filter(
        (categoryGroup) =>
          !categoryGroup.hidden &&
          !categoryGroup.deleted &&
          !categoryGroup.internal,
      ) ?? []
    );
  }, [data]);

  return { isLoading, categoryGroups };
};
