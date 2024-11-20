import styles from "./useOurAPIButton.module.css";

export default function UseOurAPIButton() {
  function handleButtonClick() {
    window.open("https://natgashub.com/apis/");
  }

  return (
    <>
      <button className={styles.buttonStyle} onClick={handleButtonClick}>
        Use Our APIs
      </button>
    </>
  );
}
