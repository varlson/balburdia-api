export type ExpensesType = {
  author: string;
  desc: string;
  value: string;
  date: string;
  link: string;
};

export type MonthStatusType = {
  currentMonth: string;
  totalOfMonth: string;
  totalExpenses: string;
  balance: string;
};

export type ResidentType = {
  name: string;
  status: string;
};
