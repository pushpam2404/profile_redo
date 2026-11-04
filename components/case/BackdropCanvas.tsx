'use client';
import { Shader, SolidColor, LiquidMetal, FlowingGradient, FilmGrain } from 'shaders/react';
import type { ShaderBackdrop } from '@/content/types';
import { usePointerDrift } from '@/lib/usePointerDrift';

type Props = { backdrop: ShaderBackdrop; onReady: () => void; onUnavailable: () => void };

export default function BackdropCanvas({ backdrop, onReady, onUnavailable }: Props) {
  const { kind, tint } = backdrop;
  const d = usePointerDrift();
  return (
    <Shader disableTelemetry onReady={onReady} onUnavailable={onUnavailable} style={{ width: '100%', height: '100%', display: 'block' }}>
      <SolidColor color="#121212" />
      {kind === 'liquid' ? (
        <LiquidMetal
          shape={JSON.stringify({ type: 'blob3D', radius: 0.4, wobble: 0.12, wobbliness: 2.5, speed: 0.4 })}
          center={{ x: 0.72 + (d.x - 0.5) * 0.06, y: 0.42 + (d.y - 0.5) * 0.06 }}
          envRotation={Math.round(d.x * 90)}
          lightColor="#f4f5f7"
          darkColor={tint}
          turbulence={1}
          dispersion={0.3}
          speed={0.35}
        />
      ) : (
        <FlowingGradient colorA="#121212" colorB={tint} colorC="#e9e7e2" colorD="#1b1d22" speed={kind === 'flow' ? 0.5 : 0.25} distortion={kind === 'flow' ? 0.8 : 0.4} />
      )}
      <FilmGrain strength={kind === 'grain' ? 0.45 : 0.2} />
    </Shader>
  );
}
