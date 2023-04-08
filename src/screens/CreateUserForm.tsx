import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../components/Form';
import { ScreenWrapper } from '../components/ScreenWrapper';

export const IS_IOS = Platform.OS === 'ios';

/**
 * To ensure that the keyboard will not be displayed over the form area
 */
const KEYBOARD_VERTICAL_OFFSET = 50;

const createUserFormSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().nonempty('E-mail is required').email('E-mail is not valid'),
  password: z.string().min(6, 'Password must have 6 caracteres at least'),
  techs: z
    .array(
      z.object({
        title: z.string().nonempty('Tech title is required'),
        yearsOfExperience: z.coerce.number().min(1),
      }),
    )
    .min(2, 'Insert at least two techs'),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export const CreateUserForm = () => {
  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techs',
  });

  const addTech = () => {
    append({ title: '', yearsOfExperience: 0 });
  };

  const removeTech = (index: number) => {
    remove(index);
  };

  const createUser = (data: CreateUserFormData) => {
    console.log(data.techs);
  };
  return (
    <ScreenWrapper>
      <Text className="text-lg text-zinc-600 font-bold">Create user</Text>
      <KeyboardAvoidingView
        className="flex flex-1"
        behavior={IS_IOS ? 'padding' : 'height'}
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
      >
        <ScrollView>
          <FormProvider {...form}>
            <View className="gap-4 w-full">
              <Form.Field>
                <Form.Label>Name</Form.Label>
                <Form.Input name="name" />
                <Form.ErrorMessage field="name" />
              </Form.Field>

              <Form.Field>
                <Form.Label>E-mail</Form.Label>
                <Form.Input name="email" keyboardType="email-address" />
                <Form.ErrorMessage field="email" />
              </Form.Field>

              <Form.Field>
                <Form.Label>Password</Form.Label>
                <Form.Input name="password" secureTextEntry />
                <Form.ErrorMessage field="password" />
              </Form.Field>

              <Form.Field>
                <View className="flex-row items-center justify-between">
                  <Form.Label>Techs</Form.Label>
                  <TouchableOpacity onPress={addTech}>
                    <Text className="text-emerald-500 text-sm">Add tech</Text>
                  </TouchableOpacity>
                </View>
                {fields.map((field, index) => (
                  <View key={field.id} className="flex flex-row justify-between gap-2">
                    <View className="flex-1">
                      <Form.Field>
                        <Form.Input name={`techs.${index}.title`} placeholder="Name" />
                        <Form.ErrorMessage field={`techs.${index}.title`} />
                      </Form.Field>
                    </View>

                    <View className="w-16">
                      <Form.Field>
                        <Form.Input
                          name={`techs.${index}.yearsOfExperience`}
                          placeholder="Years"
                          keyboardType="number-pad"
                        />
                        <Form.ErrorMessage field={`techs.${index}.yearsOfExperience`} />
                      </Form.Field>
                    </View>

                    <TouchableOpacity
                      onPress={() => removeTech(index)}
                      className="items-center justify-center"
                    >
                      <Text className="text-red-400 text-sm">Remove</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                <Form.ErrorMessage field="techs" />
              </Form.Field>
              <Form.Field>
                <Form.Button title="Save" onPress={handleSubmit(createUser)} />
              </Form.Field>
            </View>
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};
