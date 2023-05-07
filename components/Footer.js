import styles from "../styles/components/Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <a href="https://francis-4.gitbook.io/angel-protocol/">Docs &gt;</a>
          <a className={styles.underline} href="/landing">
            Launch App
          </a>
        </div>

        <div className={styles.hiddenDiv}>
          <a className={styles.underline} href="/landing">
            Sign Up
          </a>
          <a href="/landing">Sign In</a>
        </div>

        <div className={styles.socials}>
          <a>
            <img src="/icons/twitter.png" />
          </a>

          <a href="/">
            <img src="/icons/github.png" />
          </a>

          <a>
            <img src="/icons/discord.png" />
          </a>
        </div>
      </div>
    </footer>
  );
};
