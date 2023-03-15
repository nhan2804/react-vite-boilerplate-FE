import { createSheet } from "@modules/projects/services/sheets";
import { useMutation, useQueryClient } from "react-query";

const useCreateSheet = (projectId, tableId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await createSheet(projectId, tableId, formData);
      return data;
    },
    onSuccess: async (data) => {
      // Snapshot the previous value
      const previous = qc.getQueryData(["table-sheet", tableId]);
      // console.log({ s: [...previous?.payload, data?.payload] });
      // Optimistically update to the new value
      qc.setQueryData(["table-sheet", tableId], (old) => {
        console.log({ old });
        return { ...old, payload: [...old?.payload, data?.payload] };
      });

      // Return a context object with the snapshotted value
    },
  });
};

export default useCreateSheet;
