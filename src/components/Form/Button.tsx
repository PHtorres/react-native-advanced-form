import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      className="bg-emerald-500 rounded h-10 items-center justify-center"
      {...props}
    >
      <Text className="font-semibold text-white">{props.title}</Text>
    </TouchableOpacity>
  );
};
