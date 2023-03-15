import { createRecord } from "@modules/projects/services/records";
import { useMutation, useQueryClient } from "react-query";

const useCreateRecord = (projectId, tableId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await createRecord(projectId, tableId, formData);
      return data;
    },
    onSuccess: (data) => {
      qc.setQueryData(["record-table", tableId], (old) => {
        return { ...old, payload: [...(old?.payload || []), data?.payload] };
      });
      // qc.invalidateQueries(["record-table", tableId]);
    },
    onMutate: async () => {
      // Snapshot the previous value
      // const previousTodos = qc.getQueryData(["record-table", tableId])
      // const newRow = {
      //   _id: (Math.random() + "").substring(0, 3),
      // };
      // // Optimistically update to the new value
      // qc.setQueryData(["record-table", tableId], (old) => {
      //   return { ...old, payload: [...(old?.payload || []), newRow] };
      // });
    },
  });
};

export default useCreateRecord;
