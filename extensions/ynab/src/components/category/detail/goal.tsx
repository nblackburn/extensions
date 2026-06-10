import { Color, List } from "@raycast/api";
import { getProgressIcon } from "@raycast/utils";
import { Fragment, useMemo } from "react";
import { GoalType } from "~/types";
import { format } from "date-fns";

interface CategoryDetailGoalNeedProps {
    assigned?: number | null;
    assignedFormatted?: string;
    activity?: number | null;
    activityFormatted?: string;
    available?: number | null;
    availableFormatted?: string;
    targetDate?: string | null;
    target?: number | null;
    targetFormatted?: string | null;
    overall?: number | null;
    overallFormatted?: string | null;
    percentageComplete?: number | null;
    balance?: number | null;
    balanceFormatted?: string | null;
}

interface CategoryDetailGoalProps extends CategoryDetailGoalNeedProps {
    type?: GoalType;
}

export const CategoryGoalNeed = ({
    targetDate,
    targetFormatted,
    assignedFormatted,
    percentageComplete,
}: CategoryDetailGoalNeedProps) => {
    const normalizedProgress = useMemo(() => {
        if (!percentageComplete) {
            return 0;
        }

        return percentageComplete / 100;
    }, [percentageComplete]);

    const progressColor = useMemo(() => {
        return Color.Green;
    }, [normalizedProgress]);

    const normalizedTargetDate = useMemo(() => {
        if (!targetDate) {
            return;
        }

        return format(targetDate, "LLLL yyyy");
    }, [targetDate]);

    return (
        <Fragment>
            {targetFormatted && (
                <List.Item.Detail.Metadata.Label
                    title="Goal"
                    text={`Have a Balance of ${targetFormatted}`}
                />
            )}
            {assignedFormatted && targetFormatted && (
                <List.Item.Detail.Metadata.Label
                    title="Balance"
                    text={`${assignedFormatted} of ${targetFormatted}`}
                    icon={getProgressIcon(normalizedProgress, progressColor)}
                />
            )}
            {normalizedTargetDate && (
                <List.Item.Detail.Metadata.Label
                    title="Needed By"
                    text={normalizedTargetDate}
                />
            )}
        </Fragment>
    );
};

export const CategoryDetailGoal = ({
    type,
    overall,
    overallFormatted,
    target,
    targetFormatted,
    assignedFormatted,
    percentageComplete,
    targetDate,
    balance,
    balanceFormatted,
}: CategoryDetailGoalProps) => {
    if (!type) {
        return null;
    }

    return (
        <CategoryGoalNeed
            targetDate={targetDate}
            target={target}
            targetFormatted={targetFormatted}
            overall={overall}
            overallFormatted={overallFormatted}
            percentageComplete={percentageComplete}
            balance={balance}
            balanceFormatted={balanceFormatted}
            assignedFormatted={assignedFormatted}
        />
    );
};
