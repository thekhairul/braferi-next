import { useMutation, useQueryClient } from "react-query";

export const useRQmutation = (queryId, mutator = () => Promise.resolve({}), optimisticUpdater = (oldData, newData) => ({})) => {
    const queryClient = useQueryClient();
    return useMutation(mutator, {
      onMutate: async (newData) => {
        await queryClient.cancelQueries(queryId);

        const previousCart = queryClient.getQueryData(queryId);

        queryClient.setQueryData(queryId, (oldData) => {
            return optimisticUpdater(oldData, newData);
        });

        return { previousCart };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData(queryId, context.previousCart);
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryId);
      },
    });
}
