import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { useMemo } from "react";
import { getProgressIcon } from "@raycast/utils";
import { GoalType } from "~/types";
import { CategoryActions } from "./actions";

interface CategoryProps {
  id: string;
  title: string;
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
}

export const Category = ({
  id,
  title,
  assigned,
  assignedFormatted,
  activity,
  activityFormatted,
  available,
  availableFormatted,
  goalType,
  percentageComplete,
  snoozedAt,
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

    if (available + assigned < 0) {
      return Color.Yellow;
    }

    if (assigned + activity > 0) {
      return Color.Green;
    }

    return Color.PrimaryText;
  }, [goalType, assigned, activity, hasOverspent]);

  const availableTooltip = useMemo(() => {
    const text = "Available";

    if (snoozedAt) {
      return `${text} (Snoozed)`;
    }

    if (hasOverspent) {
      return `${text} (Overspent)`;
    }

    if (percentageComplete && percentageComplete === 100) {
      return `${text} (Target met)`;
    }

    if (percentageComplete && percentageComplete < 100) {
      return `${text} (${percentageComplete}% of target)`;
    }

    return text;
  }, [percentageComplete, available, hasOverspent]);

  const availableIcon = useMemo(() => {
    if (!hasGoal) {
      return null;
    }

    if (snoozedAt) {
      return Icon.Moon;
    }

    if (normalizedProgress === 1) {
      return Icon.CheckCircle;
    }

    return getProgressIcon(normalizedProgress, availableTagColor);
  }, [normalizedProgress]);

  const accessories = useMemo(() => {
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
  ]);

  return (
    <List.Item
      id={id}
      title={title}
      accessories={accessories}
      actions={<CategoryActions id={id} title={title} />}
    />
  );
};
