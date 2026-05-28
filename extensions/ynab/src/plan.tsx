import { List } from "@raycast/api";
import { withYNABAuth } from "./oauth/ynab";

const Command = () => {
  return <List></List>;
};

export default withYNABAuth(Command);
