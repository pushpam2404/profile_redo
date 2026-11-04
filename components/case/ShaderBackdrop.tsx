'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { ShaderBackdrop as Backdrop } from '@/content/types';
import { useCapabilities } from '@/lib/capabilities';
import styles from './Case.module.css';

const Live = dynamic(() => import('./BackdropCanvas'), { ssr: false });

/** Case-study hero backdrop: live shader when allowed, CSS gradient of the same tint otherwise. */
export function ShaderBackdrop({ backdrop }: { backdrop: Backdrop }) {
  const { live3D } = useCapabilities();
  const [shown, setShown] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className={styles.backdrop} aria-hidden="true" style={{ ['--tint' as string]: backdrop.tint }}>
      <div className={styles.backdropCss} />
      {live3D && !failed && (
        <div className={styles.backdropLive} style={{ opacity: shown ? 1 : 0 }}>
          <Live backdrop={backdrop} onReady={() => setShown(true)} onUnavailable={() => setFailed(true)} />
        </div>
      )}
    </div>
  );
}
