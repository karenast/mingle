import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import PageMotion from '../components/PageMotion';
import Button from '../components/Button';
import { currentMatch } from '../data/demoMatches';

function getInitials(firstName, lastName) {
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
}

export default function MatchRevealScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRevealed, setIsRevealed] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const match = currentMatch;

  const handleShareInstagram = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <PageMotion
      className='absolute inset-0 w-[390px] h-[844px] font-sans overflow-hidden flex flex-col'
      style={{ background: 'linear-gradient(to bottom, #c3c3ff 40%, #fafafc 100%)' }}
    >
      <span className='absolute left-[24px] top-[14px] text-[11px] font-normal text-white'>9:41</span>
      <span className='absolute right-[24px] top-[14px] text-[10px] font-normal text-white'>● ● ●</span>

      <div className='absolute left-0 right-0 top-[34px] h-[58px] flex items-center px-[16px]'>
        <Button
          variant='icon'
          aria-label='Go back'
          onClick={() => navigate(-1)}
          className='shrink-0'
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </Button>
        <p className='flex-1 text-center text-[16px] font-semibold text-white'>
          week 4 match
        </p>
        <div className='w-[44px]' />
      </div>

      <div className='h-[117px] flex-shrink-0' />

      <div className='flex-1 flex items-start justify-center px-[24px]'>
        <div
          style={{ width: 342, height: 530, perspective: 1000, flexShrink: 0 }}
        >
          <motion.div
            animate={{ rotateY: isRevealed ? 180 : 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}
          >
            <div
              onClick={() => { setIsRevealed(true); localStorage.setItem('mingle_match_revealed', 'true'); }}
              className='absolute inset-0 bg-white rounded-[20px] flex items-center justify-center cursor-pointer'
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <p className='text-[24px] font-bold text-mingle-accent select-none'>tap to reveal</p>
            </div>

            <div
              className='absolute inset-0 bg-white rounded-[20px] overflow-hidden'
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className='absolute left-[20px] top-[20px] flex gap-[12px] items-start'>
                <div
                  className='shrink-0 rounded-[12px] flex items-center justify-center'
                  style={{ width: 143, height: 143, backgroundColor: '#DBE4FF' }}
                >
                  <img src={match.photoURL} alt="Match's profile" className='w-full h-full object-cover object-top rounded-[12px]' />
                </div>

                <div className='flex flex-col gap-[8px] w-[143px]'>
                  <p className='text-[20px] font-semibold text-mingle-dark leading-tight'>
                    {match.firstName} {match.lastInitial}.
                  </p>
                  <div className='text-[12px] font-normal text-mingle-gray leading-tight'>
                    <p>{match.year}</p>
                    <p>{match.major}</p>
                  </div>
                  <div className='flex items-center gap-[6px] flex-wrap'>
                    {match.sharedCourses.map((c) => (
                      <span
                        key={c}
                        className='h-[24px] rounded-[12px] flex items-center px-[10px] text-[11px] font-normal'
                        style={{ backgroundColor: '#fff4cf', color: '#a1680c' }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className='text-[11px] italic' style={{ color: '#a1680c' }}>
                    you guys share these classes
                  </p>
                </div>
              </div>

              <div
                className='absolute left-[18px] right-[18px] rounded-[12px] p-[10px]'
                style={{ top: 183, backgroundColor: '#f0f0f7' }}
              >
                <p className='text-[13px] italic text-center' style={{ color: '#704809' }}>
                  {match.bio}
                </p>
              </div>

              <p
                className='absolute left-[20px] text-[12px] font-medium'
                style={{ top: 257, color: '#6b6680' }}
              >
                {match.firstName} is...
              </p>

              <div className='absolute left-[14px] flex gap-[6px] flex-wrap' style={{ top: 279 }}>
                {[match.personalityType, ...match.personalityTags].map((tag) => (
                  <span
                    key={tag}
                    className='h-[26px] rounded-[13px] flex items-center px-[12px] text-[11px] font-normal'
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#a1680c',
                      boxShadow: '0px 1px 2.3px rgba(0,0,0,0.15)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className='absolute left-[20px] right-[20px] flex flex-col gap-[10px]' style={{ top: 326 }}>
                <Button
                  variant='primary'
                  className='w-full'
                  onClick={handleShareInstagram}
                >
                  share your instagram
                </Button>
                <Button
                  variant='secondary'
                  className='w-full'
                  style={{ backgroundColor: '#ebebeb' }}
                  onClick={() => navigate('/chat/entry', { state: { ...location.state, match } })}
                >
                  send a message
                </Button>
                <button
                  className='w-full text-[12px] font-normal text-mingle-gray text-center bg-transparent border-0 cursor-pointer hover:underline'
                  onClick={() => navigate(-1)}
                >
                  skip for now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {toastVisible && (
          <motion.div
            className='absolute bottom-[24px] left-0 right-0 flex justify-center z-50 pointer-events-none'
            initial={{ opacity: 0, y: 20, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          >
            <div className='alert alert-success py-[10px] px-[20px] rounded-[20px] w-auto shadow-lg text-[13px] font-medium'>
              instagram shared!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageMotion>
  );
}
