'use client';

import styles from './page.module.css';


export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        This is a dashboard for logged user.
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
