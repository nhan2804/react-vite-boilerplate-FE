import { createTable } from "@modules/projects/services/tables";
import { useMutation, useQueryClient } from "react-query";

const useCreateTable = (projectId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await createTable(projectId, formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["tables", projectId]);
    },
  });
};

export default useCreateTable;
