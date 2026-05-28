import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '../utils/motion';
import PageMotion from '../components/PageMotion';
import Button from '../components/Button';
import { COURSE_CATALOG } from '../data/demoCourses';
import { X, ArrowRight, ChevronLeft, Search } from 'lucide-react';

export default function ScheduleAddScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState(location.state?.courses ?? []);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);

  const suggestions = search.length > 0
    ? COURSE_CATALOG.filter(
        (c) =>
          !courses.find((x) => x.id === c.id) &&
          (c.code.toLowerCase().includes(search.toLowerCase()) ||
            c.name.toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  const add = (c) => {
    setCourses((prev) => [...prev, c]);
    setSearch('');
  };

  const remove = (id) => setCourses((c) => c.filter((x) => x.id !== id));

  return (
    <PageMotion
      className='absolute inset-0 w-[390px] h-[844px] bg-mingle-bg-page overflow-hidden font-sans flex flex-col'
    >
      <Button
        variant='icon'
        aria-label='Go back'
        onClick={() => navigate(-1)}
        className='absolute top-[14px] left-[16px] z-10'
      >
        <ChevronLeft size={20} strokeWidth={2} />
      </Button>

      <div className='px-[24px] pt-[62px] pb-[14px] shrink-0'>
        <motion.p
          className='text-[26px] font-semibold text-mingle-dark mb-[4px]'
          {...fadeUp(0.05)}
        >
          add your courses
        </motion.p>

        <motion.p
          className='text-[13px] font-normal w-[342px] mb-[16px]'
          style={{ color: '#8c8a99' }}
          {...fadeUp(0.1)}
        >
          helps us find classmates to match you with.
        </motion.p>

        <motion.div
          className='w-[342px] h-[48px] bg-white rounded-[12px] border-2 flex items-center px-[14px] gap-[10px]'
          style={{ borderColor: focused ? '#4a74c7' : '#dedbed' }}
          {...fadeUp(0.15)}
        >
          <input
            data-testid='add-courses-search'
            type='text'
            placeholder='search by course code or title...'
            value={search}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => setSearch(e.target.value)}
            className='grow text-[14px] text-mingle-dark bg-transparent outline-none'
            style={{ '::placeholder': { color: '#8c8a99' } }}
          />
          <Search size={15} className='text-grape-gray shrink-0' />
        </motion.div>
      </div>

      <div className='flex-1 overflow-y-auto pb-[24px]'>
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className='px-[24px]'
            >
              <p
                className='text-[11px] font-semibold uppercase tracking-widest mb-[8px]'
                style={{ color: '#8c8a99' }}
              >
                suggestions
              </p>
              <div className='flex flex-col gap-[8px] mb-[16px]'>
                {suggestions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => add(c)}
                    className='w-full h-[44px] bg-white rounded-[10px] flex items-center gap-[10px] px-[14px] text-left'
                    style={{ border: '1px solid #dbe0ed' }}
                  >
                    <span
                      className='text-[16px] font-normal w-[20px] text-center shrink-0'
                      style={{ color: '#4a74c7' }}
                    >
                      +
                    </span>
                    <div className='flex flex-col min-w-0'>
                      <p className='text-[13px] font-semibold text-mingle-dark leading-tight truncate'>
                        {c.code}
                      </p>
                      <p
                        className='text-[11px] font-normal leading-tight truncate'
                        style={{ color: '#8c8a99' }}
                      >
                        {c.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className='mx-[24px] mb-[10px]'
          style={{ height: 1, backgroundColor: '#dbe0ed' }}
        />

        <div className='px-[24px]'>
          <p
            className='text-[11px] font-semibold uppercase tracking-widest mb-[10px]'
            style={{ color: '#8c8a99' }}
          >
            added ({courses.length})
          </p>
          <div className='flex flex-col gap-[10px]'>
            {courses.map((c) => (
              <div
                key={c.id}
                className='w-full h-[58px] bg-white rounded-[10px] flex items-center px-[14px] gap-[12px]'
                style={{ border: '1px solid #dbe0ed' }}
              >
                <span
                  className='w-[10px] h-[10px] rounded-[5px] shrink-0'
                  style={{ backgroundColor: c.color }}
                />
                <div className='flex flex-col flex-1 min-w-0'>
                  <p className='text-[13px] font-semibold text-mingle-dark leading-tight'>
                    {c.code}
                  </p>
                  <p
                    className='text-[11px] font-normal leading-tight'
                    style={{ color: '#8c8a99' }}
                  >
                    {c.section}
                  </p>
                </div>
                <button
                  data-testid={`add-remove-${c.id}`}
                  onClick={() => remove(c.id)}
                  className='text-[14px] font-normal shrink-0 border-0 bg-transparent px-[4px]'
                  style={{ color: '#8c8a99' }}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        data-testid='add-courses-done-btn'
        onClick={() => navigate('/home', { state: { ...location.state, courses } })}
        className='mx-[24px] mb-[88px]'
      >
        done
        <ArrowRight size={16} className='ml-[8px]' />
      </Button>

    </PageMotion>
  );
}
