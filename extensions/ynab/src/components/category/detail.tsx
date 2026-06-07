import { List } from "@raycast/api";

interface CategoryDetailProps {
  title: string;
  assignedFormatted?: string;
  activityFormatted?: string;
  availableFormatted?: string;
  availableIcon?: string | null;
  availableTagColor?: string | null;
}

export const CategoryDetail = ({
  title,
  assignedFormatted,
  activityFormatted,
  availableFormatted,
  availableIcon,
  availableTagColor,
}: CategoryDetailProps) => {
  return (
    <List.Item.Detail
      markdown={title}
      metadata={
        <List.Item.Detail.Metadata>
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
        </List.Item.Detail.Metadata>
      }
    />
  );
};
