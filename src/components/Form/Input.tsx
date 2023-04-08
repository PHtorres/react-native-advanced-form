import { Controller, useFormContext } from 'react-hook-form';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  name: string;
}

export function Input(props: InputProps) {
  const { register, control } = useFormContext();

  return (
    <Controller
      {...register(props.name)}
      control={control}
      render={({ field: { onChange } }) => (
        <TextInput
          className="rounded border w-max border-zinc-300 shadow-sm h-10 px-3 py-2 text-zinc-800"
          onChangeText={onChange}
          {...props}
        />
      )}
    />
  );
}
