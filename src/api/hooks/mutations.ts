import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useGenericMutation = <K>(
  key: Readonly<Array<string>>,
  mutationFn: () => Promise<K>,
  onSuccess: (data: K) => void
) => {
  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onSuccess: (data) => {
      onSuccess(data);
      queryClient.invalidateQueries(key);
    },
  });
};
