import { Action, ActionPanel, Icon } from "@raycast/api";
import { useMemo } from "react";

interface CategoryActionsProps {
    id: string;
    title: string;
    onSelect?: () => void;
    isShowingDetail?: boolean;
}

export const CategoryActions = ({
    title,
    onSelect,
    isShowingDetail,
}: CategoryActionsProps) => {
    const showDetailLabel = useMemo(() => {
        return isShowingDetail ? "Hide Details" : "Show Details";
    }, [isShowingDetail]);

    return (
        <ActionPanel title={title}>
            <Action
                title={showDetailLabel}
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
