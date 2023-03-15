import { createSheet, updateSheet } from "@modules/projects/services/sheets";
import { useMutation, useQueryClient } from "react-query";

const useUpdateField = (projectId, tableId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await updateSheet(
        projectId,
        tableId,
        _id || formData?._id,
        formData
      );
      return data;
    },
    onSuccess: async (data) => {
      // Snapshot the previous value
      qc.invalidateQueries(["table-sheet", tableId]);
      return;
      const previous = qc.getQueryData(["table-sheet", tableId]);
      const newValues = previous?.payload?.map((e) => {
        if (e?._id === data?.payload?._id) {
          return data?.payload;
        }
        return e;
      });
      // // console.log({ s: [...previous?.payload, data?.payload] });
      // // Optimistically update to the new value
      qc.setQueryData(["table-sheet", tableId], (old) => {
        // console.log({ old });
        return { old, payload: newValues };
      });
      // Return a context object with the snapshotted value
    },
  });
};

export default useUpdateField;
