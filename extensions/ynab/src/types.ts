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

export type CategoriesResponse = {
  data: {
    category_groups: CategoryGroup[];
  };
};

export type PlanOptions = "default" | "last-used" | (string & {});

export type DateFormat = {
  format: string;
};

export type CurrencyFormat = {
  iso_code: string;
  example_format: string;
  decimal_digits: number;
  decimal_separator: string;
  symbol_first: boolean;
  group_separator: string;
  currency_symbol: string;
  display_symbol: boolean;
};

export type Plan = {
  id: string;
  name: string;
  last_modified_on: string;
  first_month: string;
  last_month: string;
  date_format: DateFormat;
  currency_format: CurrencyFormat;
};

export type PlansResponse = {
  data: {
    plans: Plan[];
    default_plan: Plan;
  };
};

export type ScheduledSubTransaction = {
  id: string;
  scheduled_transaction_id: string;
  amount: number;
  memo?: string | null;
  payee_id?: string | null;
  payee_name?: string | null;
  category_id?: string | null;
  category_name?: string | null;
  transfer_account_id?: string | null;
  deleted: boolean;
  amount_formatted?: string;
  amount_currency?: number;
};

export type ScheduledTransaction = {
  id: string;
  date_first: string;
  date_next: string;
  frequency:
    | "never"
    | "daily"
    | "weekly"
    | "everyOtherWeek"
    | "twiceAMonth"
    | "every4Weeks"
    | "monthly"
    | "everyOtherMonth"
    | "every3Months"
    | "every4Months"
    | "twiceAYear"
    | "yearly"
    | "everyOtherYear";
  amount: number;
  memo?: string | null;
  flag_color?:
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | ""
    | null;
  flag_name?: string | null;
  account_id: string;
  payee_id?: string | null;
  category_id?: string | null;
  transfer_account_id?: string | null;
  deleted: boolean;
  amount_formatted?: string;
  amount_currency?: number;
  account_name: string;
  payee_name?: string | null;
  category_name?: string | null;
  subtransactions: ScheduledSubTransaction[];
};

export type ScheduledTransactionsResponse = {
  data: {
    scheduled_transactions: ScheduledTransaction[];
  };
};
