import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../utils/motion';
import PageMotion from '../components/PageMotion';
import { QUESTIONS } from '../data/quizQuestions';
import mascotUrl from '../assets/welcome_mascot.png';
import { ArrowRight } from 'lucide-react';

export default function QuizScreen() {
  const { step } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stepNum = Math.min(Math.max(parseInt(step, 10), 1), 6);
  const { question, answers } = QUESTIONS[stepNum - 1];
  const isLast = stepNum === 6;

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [stepNum]);

  const handleConfirm = () => {
    if (selected === null) return;
    if (isLast) {
      navigate('/mascot', { state: location.state });
    } else {
      navigate(`/quiz/${stepNum + 1}`, { state: location.state });
    }
  };

  return (
    <PageMotion
      className='absolute inset-0 overflow-hidden font-sans flex flex-col px-[24px]'
      style={{ background: 'linear-gradient(to bottom, #f1f4ff 52%, #dce0ff 100%)' }}
    >

      <div className='flex items-center gap-[8px] justify-center mt-[35px] shrink-0'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className='h-[6px] w-[48px] rounded-[3px]'
            style={{ backgroundColor: i < stepNum ? '#4A74C7' : '#DBE0ED' }}
          />
        ))}
      </div>

      <motion.p
        className='w-full text-center mt-[12px] text-[10px] font-normal text-mingle-gray uppercase tracking-widest shrink-0'
        {...fadeUp(0.05)}
      >
        QUESTION {stepNum} / 6
      </motion.p>

      <motion.div
        className='mt-[10px] w-full h-[156px] bg-mingle-bg-content rounded-[20px] overflow-hidden relative shrink-0'
        {...fadeUp(0.12)}
      >
        <img
          src={mascotUrl}
          alt=''
          className='absolute left-[-12px] bottom-[-10px] h-[120px] object-cover opacity-60 pointer-events-none'
        />
        <p className='absolute left-[102px] top-[24px] right-[16px] text-[20px] font-semibold text-mingle-dark leading-snug'>
          {question}
        </p>
      </motion.div>

      <div className='mt-[18px] flex flex-col gap-[10px]'>
        {answers.map((answer, i) => (
          <motion.button
            key={i}
            data-testid={`quiz-answer-${i}`}
            onClick={() => setSelected(i)}
            className='w-full h-[70px] rounded-[12px] text-[13px] font-normal text-mingle-dark text-left px-[16px] shrink-0 cursor-pointer'
            style={{ backgroundColor: selected === i ? '#c3d6ff' : '#ffffff' }}
            whileHover={{ scale: 1.015, boxShadow: '0 6px 20px rgba(74,116,199,0.18)' }}
            whileTap={{ scale: 0.985, boxShadow: '0 2px 6px rgba(74,116,199,0.10)' }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            {...fadeUp(0.18 + i * 0.07)}
          >
            {answer}
          </motion.button>
        ))}
      </div>

      <div className='flex-1' />

      <motion.button
        data-testid='quiz-confirm-btn'
        onClick={handleConfirm}
        disabled={selected === null}
        className='btn mb-[28px] w-full h-[48px] bg-mingle-dark text-white rounded-[10px] text-[14px] font-semibold border-0 cursor-pointer shrink-0'
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: selected === null ? 0.4 : 1, y: 0 }}
        whileHover={selected !== null ? { scale: 1.02 } : {}}
        whileTap={selected !== null ? { scale: 0.97 } : {}}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      >
        {isLast ? 'finish' : 'confirm'}
        <ArrowRight size={16} className='ml-[8px]' />
      </motion.button>
    </PageMotion>
  );
}
