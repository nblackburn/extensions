import { Color, Icon, List } from "@raycast/api";
import { useMemo } from "react";
import { getProgressIcon } from "@raycast/utils";
import { GoalType } from "~/types";
import { CategoryActions } from "./actions";
import { CategoryDetail } from "./detail";

interface CategoryProps {
    id: string;
    title: string;
    note?: string | null;
    funded?: boolean;
    assigned?: number;
    assignedFormatted?: string;
    activity?: number;
    activityFormatted?: string;
    available?: number;
    availableFormatted?: string;
    goalType?: GoalType;
    percentageComplete?: number | null;
    snoozedAt?: string | null;
    underfunded?: number | null;
    underfundedFormatted?: string | null;
    onSelect?: () => void;
    isShowingDetail?: boolean;
    target?: number | null;
    targetFormatted?: string | null;
    overall?: number | null;
    overallFormatted?: string | null;
    targetDate?: string | null;
    balance?: number | null;
    balanceFormatted?: string | null;
}

export const Category = ({
    id,
    title,
    note,
    assigned,
    assignedFormatted,
    activity,
    activityFormatted,
    available,
    availableFormatted,
    goalType,
    percentageComplete,
    snoozedAt,
    underfunded,
    onSelect,
    isShowingDetail,
    target,
    targetFormatted,
    overall,
    overallFormatted,
    targetDate,
    balance,
    balanceFormatted,
}: CategoryProps) => {
    const normalizedProgress = useMemo(() => {
        if (!percentageComplete) {
            return 0;
        }

        return percentageComplete / 100;
    }, [percentageComplete]);

    const hasGoal = useMemo(
        () => percentageComplete !== null && percentageComplete !== undefined,
        [percentageComplete],
    );

    const hasOverspent = useMemo(() => available && available < 0, [available]);

    const isUnderfunded = useMemo(
        () => underfunded && underfunded > 0,
        [underfunded],
    );

    // https://support.ynab.com/en_us/colors-and-icons-in-your-plan-HJQv_XHko#colors
    const availableTagColor = useMemo(() => {
        if (
            assigned === undefined ||
            activity === undefined ||
            available === undefined
        ) {
            return;
        }

        if (hasOverspent) {
            return Color.Red;
        }

        if (isUnderfunded) {
            return Color.Yellow;
        }

        if (assigned + activity > 0) {
            return Color.Green;
        }

        return Color.PrimaryText;
    }, [assigned, activity, hasOverspent, isUnderfunded]);

    const availableTooltip = useMemo(() => {
        const text = "Available";

        if (snoozedAt) {
            return `${text} (Snoozed)`;
        }

        if (hasOverspent) {
            return `${text} (Overspent)`;
        }

        if (isUnderfunded) {
            return `${text} (Underfunded)`;
        }

        if (percentageComplete && percentageComplete === 100) {
            return `${text} (Target met)`;
        }

        if (percentageComplete && percentageComplete < 100) {
            return `${text} (${percentageComplete}% of target)`;
        }

        return text;
    }, [percentageComplete, available, hasOverspent, isUnderfunded]);

    const availableIcon = useMemo(() => {
        if (!hasGoal || hasOverspent) {
            return null;
        }

        if (snoozedAt) {
            return Icon.Moon;
        }

        if (normalizedProgress === 1) {
            return Icon.CheckCircle;
        }

        if (normalizedProgress > 0 && normalizedProgress < 1) {
            return getProgressIcon(normalizedProgress, availableTagColor);
        }

        return null;
    }, [normalizedProgress]);

    const accessories = useMemo(() => {
        if (isShowingDetail) {
            return [];
        }

        return [
            {
                text: assignedFormatted,
                tooltip: "Assigned",
            },
            {
                text: activityFormatted,
                tooltip: "Activity",
            },
            {
                tag: {
                    color: availableTagColor,
                    value: availableFormatted,
                },
                tooltip: availableTooltip,
                icon: availableIcon,
            },
        ];
    }, [
        assignedFormatted,
        activityFormatted,
        availableFormatted,
        hasGoal,
        availableTagColor,
        availableTooltip,
        isShowingDetail,
    ]);

    return (
        <List.Item
            id={id}
            title={title}
            detail={
                <CategoryDetail
                    title={title}
                    note={note}
                    assignedFormatted={assignedFormatted}
                    activityFormatted={activityFormatted}
                    availableFormatted={availableFormatted}
                    availableIcon={availableIcon}
                    availableTagColor={availableTagColor}
                    goalType={goalType}
                    percentageComplete={percentageComplete}
                    overall={overall}
                    overallFormatted={overallFormatted}
                    target={target}
                    targetFormatted={targetFormatted}
                    targetDate={targetDate}
                    balance={balance}
                    balanceFormatted={balanceFormatted}
                />
            }
            accessories={accessories}
            actions={
                <CategoryActions
                    id={id}
                    title={title}
                    onSelect={onSelect}
                    isShowingDetail={isShowingDetail}
                />
            }
        />
    );
};
