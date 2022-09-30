import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useGenericMutation = <K>(key: Readonly<Array<string>>, mutationFn: () => Promise<K>) => {
  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(key);
    },
  });
};
