import { View, ViewProps } from 'react-native';

interface ScreenWrapperProps extends ViewProps {}

export const ScreenWrapper = (props: ScreenWrapperProps) => {
  return <View className="bg-zinc-50 flex flex-1 pl-4" {...props} />;
};
