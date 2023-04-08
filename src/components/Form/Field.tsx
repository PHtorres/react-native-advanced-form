import { View, ViewProps } from 'react-native';

interface FieldProps extends ViewProps {}

export function Field(props: FieldProps) {
  return <View className="flex gap-y-1" {...props} />;
}
