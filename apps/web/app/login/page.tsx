'use client';

import { LoginForm } from '../components/forms/login';
import styles from './page.module.css';


export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LoginForm />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
