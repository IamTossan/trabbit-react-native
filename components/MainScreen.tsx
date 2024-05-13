import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { YStack, H4, Paragraph, ScrollView } from 'tamagui';
import { TaskCard } from './TaskCard';

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

  return (
    <YStack flex={1} alignItems="center">
      <H4 color={'black'}>{t('mainScreen.title')}</H4>
      <ScrollView
        width="100%"
        marginVertical="$4"
        contentContainerStyle={{ alignItems: 'center', paddingVertical: 10, flex: 1 }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ScrollView>
    </YStack>
  );
};
