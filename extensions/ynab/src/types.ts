export type GoalType = "TB" | "TBD" | "MF" | "NEED" | "DEBT" | null;

export type Category = {
  id: string;
  category_group_id: string;
  category_group_name?: string;
  name: string;
  hidden: boolean;
  internal: boolean;
  original_category_group_id?: string | null;
  note?: string | null;
  budgeted: number;
  activity: number;
  balance: number;
  goal_type?: GoalType;
  goal_needs_whole_amount?: boolean | null;
  goal_day?: number | null;
  goal_cadence?: number | null;
  goal_cadence_frequency?: number | null;
  goal_creation_month?: string | null;
  goal_target?: number | null;
  goal_target_month?: string | null;
  goal_target_date?: string | null;
  goal_percentage_complete?: number | null;
  goal_months_to_budget?: number | null;
  goal_under_funded?: number | null;
  goal_overall_funded?: number | null;
  goal_overall_left?: number | null;
  goal_snoozed_at?: string | null;
  deleted: boolean;
  balance_formatted?: string;
  balance_currency?: number;
  activity_formatted?: string;
  activity_currency?: number;
  budgeted_formatted?: string;
  budgeted_currency?: number;
  goal_target_formatted?: string | null;
  goal_target_currency?: number | null;
  goal_under_funded_formatted?: string | null;
  goal_under_funded_currency?: number | null;
  goal_overall_funded_formatted?: string | null;
  goal_overall_funded_currency?: number | null;
  goal_overall_left_formatted?: string | null;
  goal_overall_left_currency?: number | null;
};

export type CategoryGroup = {
  id: string;
  name: string;
  hidden: boolean;
  internal: boolean;
  deleted: boolean;
  categories: Category[];
};

export type CategoryGroupResponse = {
  data: {
    category_groups: CategoryGroup[];
  };
};

export type PlanOptions = "default" | "last-used" | (string & {});
