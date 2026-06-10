import { List } from "@raycast/api";
import { CategoryDetailGoal } from "./detail/goal";
import { GoalType } from "~/types";
import { Fragment, useMemo } from "react";

interface CategoryDetailProps {
    title: string;
    note?: string | null;
    assigned?: number | null;
    assignedFormatted?: string;
    activity?: number | null;
    available?: number | null;
    activityFormatted?: string;
    availableFormatted?: string;
    availableIcon?: string | null;
    availableTagColor?: string | null;
    goalType?: GoalType;
    percentageComplete?: number | null;
    target?: number | null;
    targetFormatted?: string | null;
    overall?: number | null;
    overallFormatted?: string | null;
    targetDate?: string | null;
    balance?: number | null;
    balanceFormatted?: string | null;
}

export const CategoryDetail = ({
    title,
    note,
    assigned,
    assignedFormatted,
    activity,
    activityFormatted,
    available,
    availableFormatted,
    availableIcon,
    availableTagColor,
    goalType,
    percentageComplete,
    target,
    targetFormatted,
    overall,
    overallFormatted,
    targetDate,
    balance,
    balanceFormatted,
}: CategoryDetailProps) => {
    const hasGoal = useMemo(() => !!goalType && !!target, [goalType, target]);

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
                    {hasGoal && (
                        <Fragment>
                            <List.Item.Detail.Metadata.Separator />
                            <CategoryDetailGoal
                                type={goalType}
                                target={target}
                                assigned={assigned}
                                assignedFormatted={assignedFormatted}
                                activity={activity}
                                activityFormatted={assignedFormatted}
                                available={available}
                                availableFormatted={availableFormatted}
                                targetFormatted={targetFormatted}
                                overall={overall}
                                overallFormatted={overallFormatted}
                                targetDate={targetDate}
                                percentageComplete={percentageComplete}
                                balance={balance}
                                balanceFormatted={balanceFormatted}
                            />
                        </Fragment>
                    )}
                </List.Item.Detail.Metadata>
            }
        />
    );
};
