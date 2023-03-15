import { generateShareForm } from "@modules/projects/services/shareForm";
import { useMutation, useQueryClient } from "react-query";

const useGenerateShareFormFill = (projectId, tableId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await generateShareForm(projectId, tableId, formData);
      return data;
    },
    onSuccess: () => {
      //   qc.invalidateQueries(["tables", projectId]);
    },
  });
};

export default useGenerateShareFormFill;
