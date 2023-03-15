import { updateProject } from "@modules/projects/services";
import { deleteTable, updateTable } from "@modules/projects/services/tables";
import { useMutation, useQueryClient } from "react-query";

const useDeleteTable = (projectId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await deleteTable(
        projectId,
        _id || formData?._id,
        formData
      );
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["tables", projectId]);
    },
  });
};

export default useDeleteTable;
