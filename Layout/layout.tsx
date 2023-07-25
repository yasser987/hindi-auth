import React from "react";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[41rem] w-full bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/4 h-5/6 relative overflow-hidden lg:grid lg:grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.cardtoonImage}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>
        <div className="right flex flex-col justify-evenly">
          <div className="text-center py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
