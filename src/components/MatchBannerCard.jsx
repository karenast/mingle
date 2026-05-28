import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const STAR_PATH =
  'M21.3323 1.6002C22.7233 -0.924597 26.5082 -0.337665 27.0692 2.48984L28.9681 12.0608C29.2208 13.3342 30.2425 14.3138 31.5253 14.5127L41.3953 16.0433C44.4376 16.5151 44.9938 20.6598 42.1835 21.9169L34.0899 25.5373C32.7744 26.1257 32.0404 27.5455 32.3209 28.959L34.0154 37.4996C34.5924 40.4073 31.1405 42.3799 28.9282 40.4068L21.0417 33.3728C20.1335 32.5628 18.8344 32.3614 17.7235 32.8583L8.07702 37.1733C5.37101 38.3838 2.67875 35.4584 4.1092 32.862L8.31075 25.2357C9.00616 23.9735 8.73661 22.3981 7.66111 21.4389L1.04418 15.5374C-1.25342 13.4882 0.531909 9.7065 3.57422 10.1783L13.4442 11.7088C14.7271 11.9078 15.9974 11.2836 16.6239 10.1465L21.3323 1.6002Z';

const TL_STARS = [
  { w: 36, h: 34, top: 6,  left: 10,  x: [0,-4, 3,-2,0], y: [0,-7,-3,-9,0], r: [0, 10,-6, 14,0], opacity: 0.95, delay: 0,   dur: 4.0 },
  { w: 22, h: 20, top: 10, left: 52,  x: [0, 5,-3, 4,0], y: [0,-5,-10,-4,0], r: [0,-8, 5,-10,0], opacity: 0.70, delay: 0.7, dur: 3.6 },
  { w: 16, h: 15, top: 52, left: 24,  x: [0,-3, 5,-4,0], y: [0,-8,-2,-6,0],  r: [0, 12,-4, 8,0], opacity: 0.50, delay: 1.3, dur: 3.2 },
];

const BR_STARS = [
  { w: 36, h: 34, bottom: 6,  right: 10, x: [0, 4,-3, 2,0], y: [0, 7, 3, 9,0], r: [0,-10, 6,-14,0], opacity: 0.95, delay: 0.4, dur: 3.8 },
  { w: 22, h: 20, bottom: 10, right: 52, x: [0,-5, 3,-4,0], y: [0, 5,10, 4,0], r: [0,  8,-5, 10,0], opacity: 0.70, delay: 1.1, dur: 3.4 },
  { w: 16, h: 15, bottom: 52, right: 24, x: [0, 3,-5, 4,0], y: [0, 8, 2, 6,0], r: [0,-12, 4, -8,0], opacity: 0.50, delay: 1.8, dur: 4.2 },
];

function AnimatedStar({ s, style }) {
  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 45 42'
      fill='none'
      className='absolute pointer-events-none'
      style={{ width: s.w, height: s.h, opacity: s.opacity, ...style }}
      animate={{ x: s.x, y: s.y, rotate: s.r }}
      transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d={STAR_PATH} fill='#FAD142' />
    </motion.svg>
  );
}

export default function MatchBannerCard({ variant, countdown, onClick }) {
  const CARD_STYLE = { height: 118, backgroundColor: '#5319C4' };

  if (variant === 'revealed') {
    return (
      <div
        className='relative w-full rounded-card overflow-hidden flex items-center justify-center'
        style={CARD_STYLE}
      >
        <div
          className='absolute pointer-events-none flex items-center justify-center'
          style={{ left: -15.58, top: -135.54, width: 460.92, height: 377.29 }}
        >
          <div style={{ transform: 'rotate(-111.01deg) scaleY(-1)', flexShrink: 0, width: 251.64, height: 397.1, position: 'relative' }}>
            <div className='absolute inset-0 overflow-hidden' style={{ opacity: 0.25 }}>
              <img
                src='/src/assets/reveal_scribble.png'
                alt=''
                className='absolute h-full top-0'
                style={{ left: '-14.45%', width: '114.46%', maxWidth: 'none' }}
              />
            </div>
          </div>
        </div>

        <p className='text-[20px] font-semibold italic text-white z-10 text-center px-[24px]'>
          new match in{' '}
          {countdown.d > 0
            ? `${countdown.d}d, ${countdown.h}h`
            : `${countdown.h}h, ${countdown.m}m`}
        </p>
      </div>
    );
  }

  // pending variant
  return (
    <motion.div
      className='relative w-full rounded-card overflow-hidden flex items-center justify-center cursor-pointer'
      style={{ height: 118 }}
      animate={{ backgroundColor: '#5319C4' }}
      onClick={onClick}
      whileHover={{ scale: 1.02, backgroundColor: '#6220e0' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <img
        src='/src/assets/reveal_scribble.png'
        alt=''
        className='absolute pointer-events-none'
        style={{
          width: 230,
          height: 'auto',
          right: 50,
          bottom: -100,
          transform: 'rotate(250deg) scaleY(-1)',
        }}
      />

      {TL_STARS.map((s, i) => (
        <AnimatedStar key={`tl-${i}`} s={s} style={{ top: s.top, left: s.left }} />
      ))}

      {BR_STARS.map((s, i) => (
        <AnimatedStar key={`br-${i}`} s={s} style={{ bottom: s.bottom, right: s.right }} />
      ))}

      <p className='text-[20px] font-semibold italic text-white z-10 text-center px-[24px]'>
        get your match
      </p>
      <ChevronRight size={25} className='text-white ml-2' />
    </motion.div>
  );
}
