import React from 'react';
import styled, { keyframes } from 'styled-components';

// ─────────────────────────────────────────────
//  Palette : orange chaud, vert menthe, ambre
//  (fini le bleu/violet générique)
// ─────────────────────────────────────────────
const colors = {
  orange:     '#fb923c',
  orangeDeep: '#ea580c',
  green:      '#34d399',
  greenDeep:  '#059669',
  amber:      '#fbbf24',
};

// ─────────────────────────────────────────────
//  Trajectoires (quatre orbites à vitesses et sens variés)
// ─────────────────────────────────────────────
const orbitCW = keyframes`
  0%   { transform: rotate(0deg)   translateX(80px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
`;

const orbitCCW = keyframes`
  0%   { transform: rotate(0deg)    translateX(55px) rotate(0deg); }
  100% { transform: rotate(-360deg) translateX(55px) rotate(360deg); }
`;

const orbitTilted = keyframes`
  0%   { transform: rotate(30deg)  translateX(90px) rotate(-30deg); }
  100% { transform: rotate(390deg) translateX(90px) rotate(-390deg); }
`;

const orbitWide = keyframes`
  0%   { transform: rotate(75deg)  translateX(70px) rotate(-75deg); }
  100% { transform: rotate(435deg) translateX(70px) rotate(-435deg); }
`;

// ─────────────────────────────────────────────
//  Animations utilitaires
// ─────────────────────────────────────────────
const pulse = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.65; }
  50%      { transform: translate(-50%, -50%) scale(1.18); opacity: 1; }
`;

const spin = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to   { transform: translate(-50%, -50%) rotate(360deg); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.15; transform: scale(0.7); }
  50%      { opacity: 1;    transform: scale(1.25); }
`;

// ─────────────────────────────────────────────
//  Structure
// ─────────────────────────────────────────────
const OrbitContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 320px;
  z-index: -1;

  @media (max-width: 968px) { width: 260px; height: 260px; }
  @media (max-width: 768px) { width: 210px; height: 210px; }
`;

// Anneau circulaire ou elliptique, incliné
const OrbitRing = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px dashed ${(p) => p.color || 'rgba(251, 146, 60, 0.35)'};
  transform: translate(-50%, -50%)
             rotate(${(p) => p.tilt || 0}deg)
             scaleY(${(p) => p.squash || 1});
  opacity: 0.8;
`;

// Anneau interne plus fin
const InnerRing = styled(OrbitRing)`
  width: 65%;
  height: 65%;
  border-style: solid;
  border-width: 1px;
`;

// Arc tournant à dégradé conique (effet "comète en orbite")
const ArcRing = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 88%;
  height: 88%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg 200deg,
    ${colors.orange} 260deg,
    ${colors.green} 300deg,
    transparent 360deg
  );
  -webkit-mask: radial-gradient(circle, transparent 62%, #000 63%);
  mask: radial-gradient(circle, transparent 62%, #000 63%);
  animation: ${spin} 14s linear infinite;
  opacity: 0.55;
`;

// Point en orbite avec halo (traînée "comète")
const OrbitingDot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(p) => p.size || 8}px;
  height: ${(p) => p.size || 8}px;
  background: ${(p) => p.color};
  border-radius: 50%;
  box-shadow: 0 0 ${(p) => p.glow || 12}px ${(p) => p.color};
  animation: ${(p) => p.animation} ${(p) => p.duration} linear infinite;

  /* Halo diffus qui suggère une traînée derrière le point */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 220%;
    height: 220%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, ${(p) => p.color}55 0%, transparent 70%);
    filter: blur(3px);
    z-index: -1;
  }
`;

// Lueur centrale qui respire et mélange les deux couleurs
const CentralGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(251, 191, 36, 0.30) 0%,
    rgba(52, 211, 153, 0.18) 42%,
    transparent 72%
  );
  animation: ${pulse} 4.5s ease-in-out infinite;

  @media (max-width: 768px) { width: 100px; height: 100px; }
`;

// Petites étoiles/poussières pour donner de la texture
const Sparkle = styled.div`
  position: absolute;
  width: ${(p) => p.size || 3}px;
  height: ${(p) => p.size || 3}px;
  border-radius: 50%;
  background: ${(p) => p.color};
  top: ${(p) => p.top};
  left: ${(p) => p.left};
  animation: ${twinkle} ${(p) => p.duration || '3s'} ease-in-out infinite;
  animation-delay: ${(p) => p.delay || '0s'};
`;

const OrbitAnimation = () => {
  return (
    <OrbitContainer>
      {/* Anneaux — orange chaud + vert menthe */}
      <OrbitRing tilt={-15} color="rgba(251, 146, 60, 0.40)" />
      <OrbitRing tilt={55}  squash={0.6}  color="rgba(52, 211, 153, 0.45)" />
      <InnerRing tilt={20}  color="rgba(251, 191, 36, 0.50)" />
      <OrbitRing tilt={110} squash={0.85} color="rgba(52, 211, 153, 0.30)" />

      {/* Arc conique tournant — effet signature */}
      <ArcRing />

      <CentralGlow />

      {/* "Planètes" en orbite */}
      <OrbitingDot
        animation={orbitCW}
        duration="8s"
        color={colors.orange}
        glow={14}
        size={9}
      />
      <OrbitingDot
        animation={orbitCCW}
        duration="6s"
        color={colors.green}
        glow={10}
        size={7}
      />
      <OrbitingDot
        animation={orbitTilted}
        duration="11s"
        color={colors.amber}
        glow={12}
        size={8}
      />
      <OrbitingDot
        animation={orbitWide}
        duration="14s"
        color={colors.greenDeep}
        glow={10}
        size={6}
      />

      {/* Poussière d'étoiles */}
      <Sparkle top="8%"  left="22%" color={colors.orange} size={3} duration="2.4s" delay="0.2s" />
      <Sparkle top="72%" left="12%" color={colors.green}  size={2} duration="3.1s" delay="0.9s" />
      <Sparkle top="18%" left="85%" color={colors.amber}  size={3} duration="2.7s" delay="1.4s" />
      <Sparkle top="88%" left="72%" color={colors.green}  size={2} duration="3.6s" delay="0.5s" />
      <Sparkle top="48%" left="92%" color={colors.orange} size={2} duration="2.9s" delay="1.1s" />
      <Sparkle top="60%" left="3%"  color={colors.amber}  size={3} duration="3.3s" delay="0.3s" />
    </OrbitContainer>
  );
};

export default OrbitAnimation;