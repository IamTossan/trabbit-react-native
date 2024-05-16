import { Input, Button, YStack, Form, Spinner, XStack, SizableText } from 'tamagui';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type TaskAdderFormProps = {
  onSubmit: (values: { name: string; quantity: number; unit_label: string }) => void;
};

export const TaskAdderForm = (props: TaskAdderFormProps) => {
  const formik = useFormik({
    initialValues: { name: '', quantity: 0, unit_label: 'h' },
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(15, 'Must be 15 characters or less').required('Required'),
      quantity: Yup.number()
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
            onChangeText={(v) => formik.setFieldValue('quantity', Number(v))}
            onBlur={formik.handleBlur('quantity')}
            value={formik.values.quantity}
          />
          <Input disabled width="$4" value={formik.values.unit_label} />
        </XStack>
        <SizableText size="$2" marginLeft="$4" color="$red10">
          {formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ' '}
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
