import { Text, TextProps } from 'react-native';

export function Label(props: TextProps) {
  return <Text className="text-sm text-zinc-600 flex items-center justify-between" {...props} />;
}
