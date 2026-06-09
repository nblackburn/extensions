import { Action, ActionPanel, Icon } from "@raycast/api";

interface CategoryActionsProps {
    id: string;
    title: string;
    onSelect?: () => void;
}

export const CategoryActions = ({ title, onSelect }: CategoryActionsProps) => {
    return (
        <ActionPanel title={title}>
            <Action
                title="Show Details"
                icon={Icon.Sidebar}
                onAction={onSelect}
            />
            <Action
                title="View Transactions"
                icon={Icon.CreditCard}
                onAction={() => console.log("Not implemented")}
            />
        </ActionPanel>
    );
};
