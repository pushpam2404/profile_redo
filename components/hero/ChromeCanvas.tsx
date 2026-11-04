'use client';
import { useEffect, useRef, useState } from 'react';
import { Shader, SolidColor, LiquidMetal, FilmGrain } from 'shaders/react';

const SHAPE = JSON.stringify({ type: 'blob3D', radius: 0.33, wobble: 0.09, wobbliness: 3, speed: 0.5 });

type Props = { onReady: () => void; onUnavailable: () => void };

/** Live WebGPU liquid chrome. Only mounted when capabilities allow it. */
export default function ChromeCanvas({ onReady, onUnavailable }: Props) {
  const [env, setEnv] = useState(30);
  const target = useRef(0.5);

  useEffect(() => {
    const move = (e: PointerEvent) => (target.current = e.clientX / innerWidth);
    addEventListener('pointermove', move, { passive: true });
    let cur = 0.5;
    let last = 0;
    let raf = 0;
    const loop = (t: number) => {
      cur += (target.current - cur) * 0.06;
      if (t - last > 33) {
        last = t;
        setEnv(Math.round(cur * 90));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Shader
      disableTelemetry
      onReady={onReady}
      onUnavailable={onUnavailable}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <SolidColor color="#e9e7e2" />
      <LiquidMetal
        shape={SHAPE}
        center={{ type: 'mouse-position', smoothing: 0.25, momentum: 0.2, reach: 0.08 }}
        envRotation={env}
        lightColor="#f4f5f7"
        darkColor="#1b1d22"
        turbulence={0.8}
        dispersion={0.2}
        speed={0.4}
      />
      <FilmGrain strength={0.15} />
    </Shader>
  );
}
