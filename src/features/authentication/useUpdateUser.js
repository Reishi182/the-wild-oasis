import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({ user }) => {
      toast.success("User has been successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData([user], user);
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isLoading };
}
