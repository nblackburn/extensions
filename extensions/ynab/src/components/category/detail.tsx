import { List } from "@raycast/api";
import { CategoryDetailGoal } from "./detail/goal";
import { GoalType } from "~/types";

interface CategoryDetailProps {
    title: string;
    note?: string | null;
    assignedFormatted?: string;
    activityFormatted?: string;
    availableFormatted?: string;
    availableIcon?: string | null;
    availableTagColor?: string | null;
    goalType?: GoalType;
    percentageComplete?: number | null;
    targetFormatted?: string | null;
    overallFormatted?: string | null;
    targetDate?: string | null;
}

export const CategoryDetail = ({
    title,
    note,
    assignedFormatted,
    activityFormatted,
    availableFormatted,
    availableIcon,
    availableTagColor,
    goalType,
    percentageComplete,
    targetFormatted,
    overallFormatted,
    targetDate,
}: CategoryDetailProps) => {
    return (
        <List.Item.Detail
            metadata={
                <List.Item.Detail.Metadata>
                    <List.Item.Detail.Metadata.Label
                        title="Name"
                        text={title}
                    />
                    {note && (
                        <List.Item.Detail.Metadata.Label
                            title="Note"
                            text={note}
                        />
                    )}
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label
                        title="Assigned"
                        text={assignedFormatted}
                    />
                    <List.Item.Detail.Metadata.Label
                        title="Activity"
                        text={activityFormatted}
                    />
                    <List.Item.Detail.Metadata.TagList title="Available">
                        <List.Item.Detail.Metadata.TagList.Item
                            icon={availableIcon}
                            color={availableTagColor}
                            text={availableFormatted}
                        />
                    </List.Item.Detail.Metadata.TagList>
                    <List.Item.Detail.Metadata.Separator />
                    <CategoryDetailGoal
                        type={goalType}
                        targetFormatted={targetFormatted}
                        overallFormatted={overallFormatted}
                        targetDate={targetDate}
                        percentageComplete={percentageComplete}
                    />
                </List.Item.Detail.Metadata>
            }
        />
    );
};
