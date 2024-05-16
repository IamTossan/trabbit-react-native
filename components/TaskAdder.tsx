import { useState } from 'react';
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Paragraph,
  Sheet,
  TooltipSimple,
  XStack,
} from 'tamagui';
import { TaskAdderForm } from './TaskAdder.form';

type TaskAdderProps = {
  onAddTask: (values: { name: string; quantity: number; unit_label: string }) => void;
};

export const TaskAdder = (props: TaskAdderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (value: { name: string; quantity: number; unit_label: string }) => {
    props.onAddTask(value);
    setIsOpen(false);
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      {isOpen ? null : (
        <Dialog.Trigger asChild>
          <Button>Show Dialog</Button>
        </Dialog.Trigger>
      )}
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4">
          <Dialog.Title>Edit profile</Dialog.Title>

          <TaskAdderForm onSubmit={handleSubmit} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
