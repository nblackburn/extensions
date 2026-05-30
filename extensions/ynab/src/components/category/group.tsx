import { List } from "@raycast/api";
import { PropsWithChildren } from "react";

interface CategoryGroupProps {
  id: string;
  title: string;
}

export const CategoryGroup = ({
  id,
  title,
  children,
}: PropsWithChildren<CategoryGroupProps>) => {
  return (
    <List.Section title={title} key={id}>
      {children}
    </List.Section>
  );
};
