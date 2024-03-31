import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId, bookingObj }) =>
      updateBooking(bookingId, bookingObj),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has successfully checked Out `);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { checkout, isCheckingOut };
}
