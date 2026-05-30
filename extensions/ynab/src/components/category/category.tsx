import { Color, List } from "@raycast/api";
import { useMemo } from "react";
import { GoalType } from "~/types";

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
}: CategoryProps) => {
  const hasGoal = useMemo(() => !!goalType, [goalType]);

  // https://support.ynab.com/en_us/colors-and-icons-in-your-plan-HJQv_XHko#colors
  const availableTagColor = useMemo(() => {
    if (assigned === undefined || activity === undefined) {
      return;
    }

    if (assigned + activity > 0) {
      return Color.Green;
    }

    if (assigned + activity < 0) {
      return Color.Red;
    }

    return Color.PrimaryText;
  }, [goalType, assigned, activity]);

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
        tooltip: "Available",
      },
    ];
  }, [
    assignedFormatted,
    activityFormatted,
    availableFormatted,
    hasGoal,
    availableTagColor,
  ]);

  return <List.Item id={id} title={title} accessories={accessories} />;
};
