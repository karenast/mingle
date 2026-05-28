import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../utils/motion';
import PageMotion from '../components/PageMotion';
import Button from '../components/Button';
import mascotUrl from '../assets/signup_mascot.png';
import { ArrowRight } from 'lucide-react';

export default function QuizIntroScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <PageMotion className='absolute inset-0 w-[390px] h-[844px] bg-mingle-bg-page font-sans overflow-hidden flex flex-col'>
      <div className='flex flex-col gap-[4px] px-[47px] mt-[57px]'>
        <motion.p className='text-[14px] font-semibold text-mingle-gray' {...fadeUp(0.1)}>
          Personality Quiz
        </motion.p>
        <motion.p className='text-[24px] font-semibold text-mingle-dark w-[284px]' {...fadeUp(0.18)}>
          Let's get to know you!
        </motion.p>
      </div>

      <motion.div
        className='mx-[47px] mt-[94px] w-[300px] h-[284px] bg-mingle-bg-content rounded-[20px] overflow-hidden flex items-center justify-center'
        {...fadeUp(0.26)}
      >
        <img
          src={mascotUrl}
          alt='Mingle mascot'
          className='w-[205px] h-[197px] object-contain'
        />
      </motion.div>

      <motion.p
        className='px-[47px] mt-[30px] w-full text-[14px] font-semibold text-mingle-gray leading-snug max-w-[390px]'
        {...fadeUp(0.34)}
      >
        After completing a 6 question personality quiz, you will be given your
        buddy that will help you get matched with people of similar interest!
      </motion.p>

      <div className='flex-1' />

      <Button
        data-testid='quiz-intro-next-btn'
        onClick={() => navigate('/quiz/1', { state: location.state })}
        className='mx-[26px] w-[342px]'
        animateIn={fadeUp(0.42)}
      >
        next
        <ArrowRight size={16} className='ml-[8px]' />
      </Button>

      <Button
        variant='ghost'
        data-testid='quiz-intro-skip-btn'
        onClick={() => navigate('/schedule', { state: location.state })}
        className='w-full text-center py-[13px] mb-[8px]'
        animateIn={fadeUp(0.48)}
      >
        take the quiz later
      </Button>
    </PageMotion>
  );
}
