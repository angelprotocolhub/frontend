import { useState } from "react";
import styles from "../../styles/components/transferAssets/SendAsset.module.css";
import { SelectAssets } from "./SelectAssets";

export const SendAsset = ({ txOptions, beneficiary }) => {
  const [opened, setOpened] = useState(false);

  function Open() {
    setOpened(true);
  }

  return (
    <div className={styles.sendAsset}>
      {opened && (
        <div className={styles.information}>
          <SelectAssets
            close={setOpened}
            beneficiary={beneficiary}
            txOptions={txOptions}
            blur={blur}
          />
        </div>
      )}

      {!opened && (
        <div className={styles.lowerButton}>
          <button onClick={() => Open()}>Send Asset &gt;</button>
        </div>
      )}
    </div>
  );
};
