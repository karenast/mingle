import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../utils/motion';
import PageMotion from '../components/PageMotion';
import Button from '../components/Button';
import mascotUrl from '../assets/welcome_mascot.png';

export default function StartScreen() {
  const navigate = useNavigate();

  return (
    <PageMotion className='absolute inset-0 bg-mingle-bg-start overflow-hidden font-sans'>
      <motion.div
        className='absolute pointer-events-none'
        style={{
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'rgba(100, 121, 255, 0.5)',
          filter: 'blur(90px)',
          bottom: '60px',
          left: '-40px',
        }}
        animate={{
          scale: [1, 1.1, 0.96, 1],
          x: [0, 12, -6, 0],
          y: [0, -10, 5, 0],
          opacity: [0.91, 1, 0.8, 0.91],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <div className='absolute left-[30px] top-[14px] flex flex-col gap-[76px] pt-[6px]'>
        <div className='h-[20px]' />

        <motion.h1
          className='text-[54px] font-semibold text-mingle-dark leading-none'
          {...fadeUp(0.05)}
        >
          mingle.
        </motion.h1>

        <motion.p
          className='text-[15px] font-normal text-[#6a629c] leading-snug'
          {...fadeUp(0.2)}
        >
          your next friend is
          <br />
          just a class away.
        </motion.p>

        <div className='flex flex-col gap-[10px] w-[330px] relative z-[1]'>
          <Button
            data-testid='start-login-btn'
            onClick={() => navigate('/home')}
            className='w-full'
            animateIn={fadeUp(0.35)}
          >
            log in
          </Button>
          <Button
            variant='secondary'
            data-testid='start-signup-btn'
            onClick={() => {
                ['mingle_match_revealed', 'mingle_connections', 'mingle_streak', 'mingle_connected', 'mingle_courses'].forEach(k => localStorage.removeItem(k));
                navigate('/signup');
              }}
            className='w-full'
            animateIn={fadeUp(0.45)}
          >
            sign up
          </Button>
          <motion.p
            className='text-[11px] font-normal text-mingle-gray text-center'
            {...fadeUp(0.55)}
          >
            UCI students only
          </motion.p>
        </div>
      </div>

      <motion.img
        src={mascotUrl}
        alt='Mingle mascot'
        className='absolute bottom-0 left-[-47px] w-[381px] object-cover z-0'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      />
    </PageMotion>
  );
}
