'use client';
import { usePointerDrift } from '@/lib/usePointerDrift';
import { Shader, SolidColor, LiquidMetal, FilmGrain } from 'shaders/react';

const SHAPE = JSON.stringify({ type: 'blob3D', radius: 0.33, wobble: 0.09, wobbliness: 3, speed: 0.5 });

type Props = { onReady: () => void; onUnavailable: () => void };

/** Live WebGPU liquid chrome. Only mounted when capabilities allow it. */
export default function ChromeCanvas({ onReady, onUnavailable }: Props) {
  const d = usePointerDrift();
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
        center={{ x: 0.5 + (d.x - 0.5) * 0.08, y: 0.5 + (d.y - 0.5) * 0.08 }}
        envRotation={Math.round(d.x * 90)}
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
