import Heading from "../ui/Heading";
import UpdateHotelSettings from "../features/settings/UpdateSettingsForm";
import Row from "../ui/Row";
function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateHotelSettings />
    </Row>
  );
}

export default Settings;
