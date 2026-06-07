import { useCallback, useMemo, useState } from "react";
import { List } from "@raycast/api";
import { withYNABAuth } from "~/oauth/ynab";
import { useCategories } from "./hooks/use-categories";
import { PlanDropdown } from "./components/plan/dropdown";
import { Category, CategoryGroup } from "~/components/category";

const Command = () => {
  const [selectedPlan, setSelectedPlan] = useState("default");
  const { isLoading, categoryGroups } = useCategories(selectedPlan);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );

  const isShowingDetail = useMemo(() => !!selectedCategory, [selectedCategory]);

  const handleSelect = useCallback(
    (categoryId: string) => {
      if (categoryId === selectedCategory) {
        setSelectedCategory(undefined);

        return;
      }

      setSelectedCategory(categoryId);
    },
    [selectedCategory],
  );

  return (
    <List
      isLoading={isLoading}
      searchBarAccessory={<PlanDropdown onSelect={setSelectedPlan} />}
      isShowingDetail={isShowingDetail}
    >
      {categoryGroups.map((categoryGroup) => (
        <CategoryGroup
          key={categoryGroup.id}
          id={categoryGroup.id}
          title={categoryGroup.name}
        >
          {categoryGroup.categories.map((category) => (
            <Category
              id={category.id}
              key={category.id}
              title={category.name}
              goalType={category.goal_type}
              assigned={category.budgeted}
              assignedFormatted={category.budgeted_formatted}
              activity={category.activity}
              activityFormatted={category.activity_formatted}
              available={category.balance}
              availableFormatted={category.balance_formatted}
              percentageComplete={category.goal_percentage_complete}
              snoozedAt={category.goal_snoozed_at}
              underfunded={category.goal_under_funded}
              underfundedFormatted={category.goal_under_funded_formatted}
              onSelect={() => handleSelect(category.id)}
              isShowingDetail={isShowingDetail}
            />
          ))}
        </CategoryGroup>
      ))}
    </List>
  );
};

export default withYNABAuth(Command);
