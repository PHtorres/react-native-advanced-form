import { useFormContext } from 'react-hook-form';
import { Text } from 'react-native';

interface ErrorMessageProps {
  field: string;
}

function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result;
}

export function ErrorMessage({ field }: ErrorMessageProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, field);
  console.log({errors})
  console.log({fieldError})

  if (!fieldError) {
    return null;
  }

  return <Text className="text-xs text-red-500 mt-1">{fieldError.message?.toString()}</Text>;
}
