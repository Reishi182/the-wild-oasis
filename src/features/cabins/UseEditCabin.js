import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin is Successfully edited"),
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err),
  });
  return {
    editCabin,
    isEditing,
  };
}
