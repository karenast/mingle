import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMotion from '../components/PageMotion';
import Button from '../components/Button';
import { saveUser } from '../utils/userStorage';
import mascotUrl from '../assets/quiz_mascot.png';

const TRAITS = [
  { name: 'Extraversion', pct: 89, filledPx: 119 },
  { name: 'Intuition', pct: 77, filledPx: 104 },
  { name: 'Feeling', pct: 96, filledPx: 137 },
  { name: 'Judging', pct: 91, filledPx: 126 },
];

const TRACK_W = 143;

export default function MascotScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    saveUser({ mascotType: 'ENFJ' });
  }, []);

  return (
    <PageMotion
      className='absolute inset-0 overflow-hidden font-sans flex flex-col'
      style={{ background: 'linear-gradient(to bottom, #ece8fd, #d6d6ff)' }}
    >
      <div className='flex items-end justify-center gap-0 mt-[65px] shrink-0'>
        <div className='flex flex-col gap-[10px] w-[134px]'>
          <motion.div
            className='flex flex-col gap-[2px]'
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: 'easeOut' }}
          >
            <p className='text-[12px] font-medium text-grape-gray'>
              you are most like...
            </p>
            <p className='text-[32px] font-semibold text-mingle-dark leading-none'>
              Grape
            </p>
          </motion.div>
          <div className='flex flex-col gap-[4px]'>
            {['charismatic', 'inspiring', 'ambitious'].map((tag, i) => (
              <motion.div
                key={tag}
                className='h-[26px] rounded-[13px] bg-white border border-[#DBE0ED] flex items-center justify-center'
                style={{
                  width:
                    tag === 'charismatic' ? 84 : tag === 'inspiring' ? 102 : 98,
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + i * 0.07,
                  ease: 'easeOut',
                }}
              >
                <p className='text-[11px] font-normal text-mingle-accent'>
                  {tag}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className='w-[185px] h-[183px] shrink-0'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.34, 1.36, 0.64, 1],
          }}
        >
          <img
            src={mascotUrl}
            alt='Grape mascot'
            className='w-full h-full object-contain'
          />
        </motion.div>
      </div>

      <div className='flex flex-row gap-[8px] mx-[35px] mt-[15px] shrink-0'>
        <motion.div
          className='rounded-[12px] overflow-hidden bg-grape-panel relative'
          style={{ width: 190, height: 187 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
        >
          {TRAITS.map((t, i) => {
            const barTop = 31 + i * 43;
            return (
              <div key={t.name}>
                <p
                  className='absolute text-[12px] font-normal text-mingle-dark'
                  style={{ left: 10, top: barTop - 20 }}
                >
                  {t.name}
                </p>
                <div
                  className='absolute rounded-[5px] bg-grape-bg-content'
                  style={{ left: 10, top: barTop, width: TRACK_W, height: 16 }}
                />
                <motion.div
                  className='absolute rounded-[5px] bg-grape-bar'
                  style={{ left: 10, top: barTop, height: 16 }}
                  initial={{ width: 0 }}
                  animate={{ width: t.filledPx }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + i * 0.1,
                    ease: 'easeOut',
                  }}
                />
                <motion.p
                  className='absolute text-[11px] font-normal opacity-60 text-mingle-dark'
                  style={{ left: 157, top: barTop + 1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
                >
                  {t.pct}%
                </motion.p>
              </div>
            );
          })}
        </motion.div>

        <div className='flex flex-col gap-[8px]' style={{ width: 135 }}>
          <motion.div
            className='rounded-[12px] flex items-center justify-center py-[14px] bg-grape-bg-content'
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.35,
              ease: [0.34, 1.36, 0.64, 1],
            }}
          >
            <p className='text-[16px] font-semibold text-mingle-dark'>ENFJ</p>
          </motion.div>

          <motion.p
            className='text-[11px] font-normal text-mingle-dark'
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.42, ease: 'easeOut' }}
          >
            Potential Roles:
          </motion.p>

          {['Project Manager', 'Mentor/Coach'].map((role, i) => (
            <motion.div
              key={role}
              className='rounded-[12px] bg-white flex items-center justify-center py-[14px]'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.48 + i * 0.08,
                ease: 'easeOut',
              }}
            >
              <p className='text-[11px] font-normal text-mingle-dark'>{role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className='mx-[35px] mt-[10px] rounded-[12px] flex items-center px-[19px] bg-grape-panel shrink-0'
        style={{ width: 320, height: 140 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55, ease: 'easeOut' }}
      >
        <p className='text-[12px] font-normal text-mingle-dark leading-snug'>
          You are a <strong>natural leader</strong>, inspiring confidence and
          motivating others to achieve their best while you achieve your own.
          People feel drawn to you and your energy and you{' '}
          <strong>excel</strong> at creating meaningful relationships. You have
          the drive to advocate for what you believe in and are a{' '}
          <strong>strategic thinker</strong> in everything that you do.
        </p>
      </motion.div>

      <div className='flex-1' />

      <Button
        data-testid='mascot-match-btn'
        onClick={() => navigate('/schedule', { state: location.state })}
        className='mx-[24px] w-[342px]'
        animateIn={{
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.65, ease: 'easeOut' },
        }}
      >
        find my first match →
      </Button>
      <Button
        variant='ghost'
        data-testid='quiz-intro-skip-btn'
        onClick={() => navigate('/profile/quiz-intro', { state: location.state })}
        className='w-full text-center py-[13px] mb-[8px]'
      >
        retake quiz
      </Button>
    </PageMotion>
  );
}
