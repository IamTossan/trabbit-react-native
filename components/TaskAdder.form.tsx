import { Input, Button, YStack, Form, Spinner, XStack, SizableText } from 'tamagui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UnsavedTask } from '~/model/types';

type TaskAdderFormProps = {
  onSubmit: (values: UnsavedTask) => void;
};

export const TaskAdderForm = (props: TaskAdderFormProps) => {
  const formik = useFormik({
    initialValues: { name: '', amount: 0, unit_label: 'h' },
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(15, 'Must be 15 characters or less').required('Required'),
      amount: Yup.number()
        .positive()
        .integer()
        .min(0.5)
        .max(24, 'Must be 24 hours or less')
        .test({
          skipAbsent: true,
          test: (v, ctx) => !!v && (v * 2) % 1 === 0,
        })
        .required('Required'),
      unit_label: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));

      props.onSubmit({ ...values, name: values.name.toLowerCase() });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} backgroundColor="$background">
      <YStack gap="$2">
        <Input
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          value={formik.values.name}
          placeholder="write your activity here"
        />
        <SizableText size="$2" marginLeft="$4" color="$red10">
          {formik.touched.name && formik.errors.name ? formik.errors.name : ' '}
        </SizableText>

        <XStack justifyContent="space-between" gap="$2">
          <Input
            flex={1}
            keyboardType="numeric"
            onChangeText={(v) => formik.setFieldValue('amount', Number(v))}
            onBlur={formik.handleBlur('amount')}
            value={String(formik.values.amount)}
          />
          <Input disabled width="$4" value={formik.values.unit_label} />
        </XStack>
        <SizableText size="$2" marginLeft="$4" color="$red10">
          {formik.touched.amount && formik.errors.amount ? formik.errors.amount : ' '}
        </SizableText>

        <Form.Trigger asChild>
          <Button
            theme="active"
            icon={formik.isSubmitting ? () => <Spinner /> : undefined}
            disabled={!formik.dirty || !formik.isValid}>
            Submit
          </Button>
        </Form.Trigger>
      </YStack>
    </Form>
  );
};
