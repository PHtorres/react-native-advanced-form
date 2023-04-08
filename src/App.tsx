import { SafeAreaView } from 'react-native';
import { CreateUserForm } from './screens/CreateUserForm';

export const App = () => {
  return (
    <SafeAreaView className='flex flex-1'>
      <CreateUserForm />
    </SafeAreaView>
  );
};
