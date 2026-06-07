import { Action, ActionPanel, Icon } from "@raycast/api";

interface CategoryActionsProps {
  id: string;
  title: string;
}

export const CategoryActions = ({ id, title }: CategoryActionsProps) => {
  return (
    <ActionPanel title={title}>
      <Action
        title="Show Details"
        icon={Icon.Sidebar}
        onAction={() => console.log("Not implemented")}
      />
      <Action
        title="View Transactions"
        icon={Icon.CreditCard}
        onAction={() => console.log("Not implemented")}
      />
    </ActionPanel>
  );
};
