import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { YStack, H4, ScrollView, XStack } from 'tamagui';

import { TaskCard } from './TaskCard';
import { TaskAdder } from './TaskAdder';
import { db } from '../model';
import { Task, UnsavedTask } from '~/model/types';

export const MainScreen = () => {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const results = await db.getAllAsync<Task>('SELECT * FROM tasks;');
    console.log(results);
    setTasks(results);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async (newTask: UnsavedTask) => {
    await db.runAsync(
      'INSERT INTO tasks (name, amount, unit_label) VALUES (?, ?, ?)',
      newTask.name,
      newTask.amount,
      newTask.unit_label
    );
    await getTasks();
  };

  return (
    <YStack flex={1} alignItems="center">
      <H4 color={'black'}>{t('mainScreen.title')}</H4>
      <ScrollView width="100%" flex={1} marginVertical="$4">
        <XStack flexWrap="wrap" alignItems="center" justifyContent="center">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </XStack>
      </ScrollView>

      <TaskAdder onAddTask={addTask} />
    </YStack>
  );
};
