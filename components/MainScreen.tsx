import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { YStack, H4, ScrollView, XStack } from 'tamagui';
import { TaskCard } from './TaskCard';
import { TaskAdder } from './TaskAdder';

export const MainScreen = () => {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'lire',
      status: 'FINISHED',
      started_at: null,
      finished_at: null,
      quantity: 100,
      unit: 'NO_UNIT',
      unit_label: 'p',
      type: 'SHORT',
      annotations: '',
    },
    {
      id: 2,
      name: 'code',
      status: 'FINISHED',
      started_at: null,
      finished_at: null,
      quantity: 2,
      unit: 'MINUTES',
      unit_label: 'h',
      type: 'SHORT',
      annotations: '',
    },
  ]);

  const addTask = (newTask) => {
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: tasks.length + 1,
        status: 'FINISHED',
        type: 'SHORT',
        annotations: '',
      },
    ]);
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
