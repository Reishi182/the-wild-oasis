import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import { HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBook, isDeleting } = useDeleteBooking();
  if (isLoading) return <Spinner />;
  const { status, id: bookingId } = booking || {};
  const { bookingId: id } = useParams();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  function handleCheckOut() {
    checkout({ bookingId, bookingObj: { status: "checked-out" } });
  }
  if (!booking) return <Empty resourceName={`booking of ${id}`} />;
  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check In
          </Button>
        )}
        {status === "checked-in" && (
          <Button onClick={handleCheckOut} disabled={isCheckingOut}>
            Check Out
          </Button>
        )}
        {status === "checked-out" && (
          <>
            <Modal.Open opens="delete">
              <Button variation="danger">Delete Booking</Button>
            </Modal.Open>
          </>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      <Modal.Window name="delete">
        <ConfirmDelete
          disabled={isDeleting}
          resourceName={`Booking #${bookingId}`}
          onConfirm={() =>
            deleteBook(bookingId, { onSettled: () => navigate(-1) })
          }
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
