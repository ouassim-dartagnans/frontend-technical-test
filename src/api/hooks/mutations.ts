import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseGenericMutationParams<K> {
  key: Readonly<Array<string | number>>;
  mutationFn: () => Promise<K>;
  onSuccess?: (data: K) => void;
}

export const useGenericMutation = <K>({ key, mutationFn, onSuccess = () => null }: UseGenericMutationParams<K>) => {
  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onSuccess: (data) => {
      onSuccess(data);
      queryClient.invalidateQueries(key);
    },
  });
};
