import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '../utils/motion';
import PageMotion from '../components/PageMotion';
import { Plus, ChevronLeft, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import CourseSearchInput from '../components/CourseSearchInput';
import { DEMO_COURSES, COURSE_CATALOG } from '../data/demoCourses';

export default function ScheduleEntryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileRef = useRef(null);

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');

  const parsed = courses.length > 0;

  const handleUpload = () => {
    setCourses(DEMO_COURSES);
    if (fileRef.current) fileRef.current.value = '';
  };

  const suggestions = search.length > 0
    ? COURSE_CATALOG.filter(
        (c) =>
          !courses.find((x) => x.id === c.id) &&
          (c.code.toLowerCase().includes(search.toLowerCase()) ||
            c.name.toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  const addCourse = (c) => {
    setCourses((prev) => [...prev, c]);
    setSearch('');
  };

  return (
    <PageMotion
      className='absolute inset-0 overflow-hidden font-sans flex flex-col px-[24px]'
    >
      <Button
        variant='icon'
        aria-label='Go back'
        onClick={() => navigate('/schedule', { state: { ...location.state, navDirection: -1 } })}
        className='absolute top-[14px] left-[16px] z-20'
      >
        <ChevronLeft size={20} strokeWidth={2} />
      </Button>

      <div
        className='absolute pointer-events-none'
        style={{
          width: 380,
          height: 340,
          left: 180,
          top: -100,
          zIndex: 0,
          background: 'radial-gradient(ellipse at 40% 40%, #e9e5fc 0%, #ede9fd 30%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />

      <div className='flex flex-col flex-1 overflow-y-auto z-[10] pt-[68px]'>
        <motion.div className='mb-[8px]' {...fadeUp(0.05)}>
          <p className='text-[24px] font-semibold text-mingle-dark leading-[32px]'>
            what are you taking
          </p>
          <p className='text-[24px] font-semibold text-mingle-dark leading-[32px]'>
            this quarter?
          </p> 
        </motion.div>

        <motion.p
          className='text-[14px] font-normal text-grape-gray w-full mb-[20px]'
          {...fadeUp(0.1)}
        >
          we&apos;ll use your schedule to find your matches.
        </motion.p>

        <motion.p
          className='text-[16px] font-semibold text-mingle-dark mb-[14px]'
          {...fadeUp(0.2)}
        >
          upload from WebReg
        </motion.p>

        <motion.div
          className='w-full'
          {...fadeUp(0.25)}
        >
          <AnimatePresence mode='wait'>
            {!parsed ? (
              <motion.button
                key='upload-zone'
                data-testid='schedule-upload-btn'
                onClick={() => fileRef.current?.click()}
                className='group w-full h-[360px] rounded-[20px] bg-transparent flex items-center justify-center border-2 border-dashed border-[#dedbed] hover:border-[#a695e8] cursor-pointer transition-colors duration-200'
                whileHover={{ backgroundColor: 'rgba(105,87,188,0.04)' }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  opacity: { duration: 0.2 },
                  scale: { type: 'spring', stiffness: 320, damping: 24 },
                }}
              >
                <Plus
                  size={40}
                  strokeWidth={1.5}
                  className='text-[#dedbed] group-hover:text-[#a695e8] transition-colors duration-200'
                />
              </motion.button>
            ) : (
              <motion.div
                key='schedule-preview'
                className='w-full overflow-hidden bg-white'
                style={{
                  height: 360,
                  borderRadius: 20,
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.12)',
                  border: '2px dashed #dedbed',
                }}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className='px-[20px] pt-[20px] pb-[16px] h-full flex flex-col'>
                  <p className='text-[9px] font-bold text-center text-grape-gray tracking-[0.16em] uppercase mb-[12px]'>
                    UCI WebReg — Course Schedule
                  </p>
                  <div className='h-px bg-[#e8e4f8] mb-[16px]' />
                  <div className='flex flex-col'>
                    {courses.map((c) => (
                      <div
                        key={c.id}
                        className='flex items-start gap-[12px] py-[13px] border-b border-[#f2f0fb] last:border-0'
                      >
                        <div
                          className='w-[3px] rounded-full shrink-0 mt-[1px]'
                          style={{ height: 44, backgroundColor: c.color }}
                        />
                        <div>
                          <p className='text-[13px] font-semibold text-mingle-dark leading-tight'>
                            {c.code}
                          </p>
                          <p className='text-[11px] text-grape-gray leading-tight mt-[2px]'>
                            {c.name}
                          </p>
                          <p className='text-[10px] text-grape-gray leading-tight mt-[1px]'>
                            {c.section}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='mt-auto pt-[12px] border-t border-[#f2f0fb]'>
                    <p className='text-[9px] text-center text-grape-gray'>
                      {courses.length} courses found — confirm to continue
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <input
        ref={fileRef}
        type='file'
        accept='.pdf'
        className='hidden'
        onChange={handleUpload}
      />

      <Button
        data-testid='schedule-confirm-btn'
        disabled={!parsed}
        onClick={() => {
          localStorage.setItem('mingle_courses', JSON.stringify(courses));
          navigate('/schedule/add', { state: { ...location.state, courses, navDirection: 1 } });
        }}
        className='w-full mb-[88px]'
        animateIn={{ initial: { opacity: 0, y: 18 }, animate: { opacity: parsed ? 1 : 0.4, y: 0 }, transition: { duration: 0.5, delay: 0.3, ease: 'easeOut' } }}
      >
        looks good
        <ArrowRight size={16} strokeWidth={2} className='ml-[8px]' />
      </Button>
    </PageMotion>
  );
}
