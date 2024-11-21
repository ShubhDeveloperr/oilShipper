import { Dropdown } from "react-bootstrap";
import styles from "./shipperDropDown.module.css"

export default function ShipperDropdown() {
  return (
    <div className="d-inline-flex align-items-center gap-1">
      <p className={styles.StaticName}>Shipper&nbsp;:</p>
      {/* {""} */}
      <Dropdown  className={styles.shipperDropdown}>
        <Dropdown.Toggle  className={styles.shipperDropdown}  id="dropdown-basic">
          Pipeline DropDown
        </Dropdown.Toggle>

        <Dropdown.Menu  className={styles.shipperDropdownMenu}>
          <Dropdown.Item className={styles.shipperDropdownItems} href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item className={styles.shipperDropdownItems} href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item className={styles.shipperDropdownItems} href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
