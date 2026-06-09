import { Color, List } from "@raycast/api";
import { getProgressIcon } from "@raycast/utils";
import { Fragment, useMemo } from "react";
import { GoalType } from "~/types";
import { format } from "date-fns";

interface CategoryDetailGoalNeedProps {
    targetDate?: string | null;
    targetFormatted?: string | null;
    overallFormatted?: string | null;
    percentageComplete?: number | null;
}

interface CategoryDetailGoalProps extends CategoryDetailGoalNeedProps {
    type?: GoalType;
}

export const CategoryGoalNeed = ({
    targetDate,
    targetFormatted,
    overallFormatted,
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
            {overallFormatted && targetFormatted && (
                <List.Item.Detail.Metadata.Label
                    title="Balance"
                    text={`${overallFormatted} of ${targetFormatted}`}
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
    overallFormatted,
    targetFormatted,
    percentageComplete,
    targetDate,
}: CategoryDetailGoalProps) => {
    if (!type) {
        return null;
    }

    return (
        <CategoryGoalNeed
            targetDate={targetDate}
            targetFormatted={targetFormatted}
            overallFormatted={overallFormatted}
            percentageComplete={percentageComplete}
        />
    );
};
