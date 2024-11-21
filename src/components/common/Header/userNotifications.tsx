import styles from "./userNotifications.module.css";

export default function UserNotifications() {
  return (
    <>
      <div>
        {" "}
        <span className={styles.headerIcon}>8</span> <span>Third Party</span>
      </div>
      <div>
        {" "}
        <span className={styles.headerIcon}>99+</span> <span>Alerts</span>
      </div>
      <div>
        {" "}
        <span className={styles.headerIcon}>1</span> <span>Bulletins</span>
      </div>
    </>
  );
}
