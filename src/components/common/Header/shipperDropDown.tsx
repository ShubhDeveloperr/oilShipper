import { Dropdown } from "react-bootstrap";

export default function ShipperDropdown() {
  return (
    <div className="d-inline-flex align-items-center">
      <h4 className="me-2">Shipper:</h4>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Pipeline DropDown
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
