'use client';
import { useState } from 'react';
import { site } from '@/content/content';
import styles from './Home.module.css';

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const onClick = () => {
    try {
      navigator.clipboard
        ?.writeText(site.email)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {});
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
  };
  return (
    <a href={`mailto:${site.email}`} data-email className={styles.email} onClick={onClick}>
      <span>{site.email}</span>
      <span className={styles.emailTag} aria-live="polite">
        {copied ? 'Copied' : 'Say hello →'}
      </span>
    </a>
  );
}
