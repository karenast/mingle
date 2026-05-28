import { useContext } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../utils/motion';
import { NavDirectionCtx } from '../context/NavDirection';

export default function PageMotion({ className, style, children }) {
  const direction = useContext(NavDirectionCtx);
  return (
    <motion.div
      className={className}
      style={style}
      custom={direction}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
