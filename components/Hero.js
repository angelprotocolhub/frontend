import styles from "../styles/components/Hero.module.css";

export const Hero = ({ children }) => {
  return (
    <div className={styles.hero}>
      {children}

      <div className={styles.content}>
        <img src="/illustrations/wings.png" className={styles.wings} />
        <h2>
          <span className="blueText">Angel</span> Protocol
        </h2>

        <p>
          Send cryptocurrency and nfts safely without danger of losing assets.
          Transfer assets while your{" "}
          <span className="blueText">guardian angel </span>is watching.
        </p>

        <a href="/landing">Get Started &gt;</a>
      </div>
    </div>
  );
};
