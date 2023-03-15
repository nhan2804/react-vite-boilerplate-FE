import { updateProject } from "@modules/projects/services";
import { updateRecord } from "@modules/projects/services/records";
import { updateTable } from "@modules/projects/services/tables";
import { useMutation, useQueryClient } from "react-query";

const useUpdateRecord = (projectId, tableId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await updateRecord(projectId, tableId, _id, formData);
      return data;
    },
    onSuccess: () => {
      //   qc.invalidateQueries(["tables", projectId]);
    },
  });
};

export default useUpdateRecord;
