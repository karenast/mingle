export const pageTransition = { duration: 0.35, ease: [0.4, 0, 0.2, 1] };

export const pageVariants = {
  initial: (dir) => ({ x: dir > 0 ? '100%' : '-100%' }),
  animate: { x: 0 },
  exit:    (dir) => ({ x: dir > 0 ? '-100%' : '100%' }),
};

export const pageMotion = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit:    { x: '-100%' },
  transition: pageTransition,
};

export const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});
