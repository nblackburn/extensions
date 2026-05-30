import { List } from "@raycast/api";
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
          value: availableFormatted,
        },
        tooltip: "Available",
      },
    ];
  }, [assignedFormatted, activityFormatted, availableFormatted, hasGoal]);

  return <List.Item id={id} title={title} accessories={accessories} />;
};
