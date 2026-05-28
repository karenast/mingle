import { motion } from 'framer-motion';

const SPRING = { type: 'spring', stiffness: 480, damping: 30 };

const VARIANTS = {
  primary: {
    base: 'btn bg-mingle-dark text-white rounded-[10px] h-[48px] text-[14px] font-semibold border-0 cursor-pointer',
    hover: { scale: 1.01, boxShadow: '0 6px 18px rgba(15,13,31,0.28)' },
    tap: { scale: 0.99 },
  },
  secondary: {
    base: 'btn bg-white text-mingle-dark rounded-[10px] h-[48px] text-[14px] font-semibold border-0 cursor-pointer',
    hover: { scale: 1.01, boxShadow: '0 6px 18px rgba(15, 13, 31, 0.2)' },
    tap: { scale: 0.99 },
  },
  ghost: {
    base: 'bg-transparent text-mingle-gray text-[12px] font-normal border-0 cursor-pointer hover:text-mingle-dark hover:underline',
    hover: {},
    tap: { scale: 0.99 },
  },
  icon: {
    base: 'w-[44px] h-[44px] flex items-center justify-center rounded-full bg-white/60 text-mingle-dark border-0 cursor-pointer',
    hover: { scale: 1.01, backgroundColor: 'rgba(255,255,255,0.9)' },
    tap: { scale: 0.99 },
  },
  purple: {
    base: 'rounded-[12px] h-[54px] text-[14px] font-semibold border-0 flex items-center cursor-pointer',
    style: { backgroundColor: '#6957bc', color: '#f2efff' },
    hover: { scale: 1.01, filter: 'brightness(1.08)' },
    tap: { scale: 0.99 },
  },
  light: {
    base: 'h-[48px] text-mingle-dark rounded-[10px] text-[14px] font-semibold border-0 cursor-pointer flex items-center justify-center',
    style: { backgroundColor: '#f1f1f1' },
    hover: { scale: 1.01, boxShadow: '0 4px 12px rgba(15,13,31,0.08)' },
    tap: { scale: 0.99 },
  },
};

export default function Button({
  variant = 'primary',
  className = '',
  disabled = false,
  animateIn,
  children,
  ...props
}) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;

  const transition = animateIn
    ? {
        opacity: animateIn.transition,
        y: animateIn.transition,
        scale: SPRING,
        boxShadow: SPRING,
        filter: SPRING,
      }
    : SPRING;

  return (
    <motion.button
      type="button"
      initial={animateIn?.initial}
      animate={animateIn?.animate}
      whileHover={disabled ? {} : v.hover}
      whileTap={disabled ? {} : v.tap}
      transition={transition}
      disabled={disabled}
      className={[v.base, disabled ? 'opacity-40 cursor-not-allowed' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={v.style}
      {...props}
    >
      {children}
    </motion.button>
  );
}
