import { updateProject } from "@modules/projects/services";
import { updateTable } from "@modules/projects/services/tables";
import { useMutation, useQueryClient } from "react-query";

const useUpdateTable = (projectId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await updateTable(
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

export default useUpdateTable;
