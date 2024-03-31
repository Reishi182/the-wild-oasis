import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBooking, updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isLoading: isCheckingin } = useMutation({
    mutationFn: ({ bookingId, bookingObj }) =>
      updateBooking(bookingId, bookingObj),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has successfully checked in`);
      navigate("/");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { checkin, isCheckingin };
}
