import { useMutation, useQueryClient } from "react-query";

export const useRQmutation = (
  queryId,
  mutator = () => Promise.resolve({}),
  optimisticUpdater = (oldData, newData) => ({})
) => {
  const queryClient = useQueryClient();
  return useMutation(mutator, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries(queryId);

      const previousData = queryClient.getQueryData(queryId);

      queryClient.setQueryData(queryId, (oldData) => {
        return optimisticUpdater(oldData, newData);
      });

      return { previousData };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(queryId, context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryId);
    },
  });
};
