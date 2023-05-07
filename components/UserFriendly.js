import styles from "../styles/components/UserFriendly.module.css";

export const UserFriendly = () => {
  return (
    <div className={styles.userFriendly}>
      <h3>
        <span className="blueText">User-Friendly</span> Interface
      </h3>

      <div className={styles.content}>
        <img src="/illustrations/userfriendly.png" />
        <img src="/illustrations/userfriendlydetails.png" />
      </div>
    </div>
  );
};
