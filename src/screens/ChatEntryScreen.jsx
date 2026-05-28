import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PageMotion from '../components/PageMotion';
import Button from '../components/Button';
import { currentMatch } from '../data/demoMatches';

const GRADIENT = 'linear-gradient(to bottom, #c3c3ff 39.9%, #fafafc 100%)';

export default function ChatEntryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const match = currentMatch;

  return (
    <PageMotion
      className='absolute inset-0 w-[390px] h-[844px] overflow-hidden font-sans flex flex-col'
      style={{ background: GRADIENT }}
    >
      <div className='absolute left-0 top-0 w-[390px] h-[88px] bg-white z-10' />
      <div className='relative h-[88px] flex-shrink-0 flex items-center px-[16px] z-10 mt-0'>
        <Button variant='icon' aria-label='Go back' onClick={() => navigate(-1)} className='shrink-0'>
          <ChevronLeft size={20} strokeWidth={2} />
        </Button>
        <div className='flex-1 flex justify-center'>
          <div className='w-[36px] h-[36px] rounded-[18px] overflow-hidden'>
            <img src={match.photoURL} alt='Match' className='w-full h-full object-cover object-top' />
          </div>
        </div>
        <div
          className='w-[22px] h-[22px] rounded-[11px] border border-[#dedbed] flex items-center justify-center shrink-0'
          style={{ background: GRADIENT }}
        >
          <span className='text-[11px] font-normal text-mingle-gray leading-none'>i</span>
        </div>
      </div>

      <div className='flex-1 flex flex-col items-center pt-[20px] px-[26px]'>
        <div className='w-[88px] h-[88px] rounded-[44px] overflow-hidden flex-shrink-0'>
          <img src={match.photoURL} alt={match.firstName} className='w-full h-full object-cover object-top' />
        </div>

        <p className='text-[18px] font-semibold text-mingle-dark text-center mt-[12px]'>
          {match.firstName} {match.lastInitial}.
        </p>

        <p className='text-[12px] font-normal text-[#111] text-center mt-[4px]'>
          {match.year} · {match.major}
        </p>

        <div className='h-[24px] rounded-[12px] bg-[#ede5fc] px-[12px] flex items-center mt-[10px]'>
          <span className='text-[11px] font-normal text-[#614ac7]'>
            matched via {match.sharedCourses[0]}, {match.sharedCourses[1]}
          </span>
        </div>

        <div className='w-full flex flex-col gap-[20px] mt-[34px]'>
          <div className='bg-white rounded-[20px] p-[20px] flex flex-col gap-[8px]'>
            <p className='text-[11px] font-semibold text-[#182B98]'>✦&nbsp; this week&apos;s prompt</p>
            <p
              className='text-[14px] italic text-mingle-dark leading-snug'
              style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500 }}
            >
              {match.weeklyPrompt}
            </p>
          </div>

          <div className='flex flex-col gap-[10px]'>
            <Button
              data-testid='chat-answer-prompt-btn'
              onClick={() => navigate('/chat/thread', { state: { ...location.state, mode: 'prompt', navDirection: 1 } })}
              className='w-full'
            >
              answer the prompt
            </Button>
            <Button
              variant='light'
              data-testid='chat-say-something-btn'
              onClick={() => navigate('/chat/thread', { state: { ...location.state, mode: 'free', navDirection: 1 } })}
              className='w-full'
            >
              say something else
            </Button>
          </div>
        </div>
      </div>
    </PageMotion>
  );
}
