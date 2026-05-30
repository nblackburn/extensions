import { List } from "@raycast/api";
import { withYNABAuth } from "~/oauth/ynab";
import { useCategories } from "./hooks/use-categories";
import { Category, CategoryGroup } from "~/components/category";

const Command = () => {
  const { isLoading, categoryGroups } = useCategories();

  return (
    <List isLoading={isLoading}>
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
            />
          ))}
        </CategoryGroup>
      ))}
    </List>
  );
};

export default withYNABAuth(Command);
