export type Task = {
  id: number;
  name: string;
  amount: number;
  unit_label: string;
};

export type UnsavedTask = Omit<Task, 'id'>;
