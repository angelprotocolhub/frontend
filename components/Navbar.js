import styles from "../styles/components/Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img src="/navbar/logo.png" />

      <div className={styles.navLinks}>
        <a href="https://francis-4.gitbook.io/angel-protocol/">Docs &gt;</a>
        <a href="/landing">launch App </a>
      </div>

      <a href="/landing" className={styles.signIn} target="_blank">
        Sign In
      </a>
    </nav>
  );
};
