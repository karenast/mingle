import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../utils/motion';
import PageMotion from '../components/PageMotion';
import Button from '../components/Button';
import { COURSE_CATALOG } from '../data/demoCourses';
import { X, ArrowRight, ChevronLeft } from 'lucide-react';
import CourseSearchInput from '../components/CourseSearchInput';

export default function ScheduleAddScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState(() => {
    if (location.state?.courses?.length > 0) return location.state.courses;
    const saved = localStorage.getItem('mingle_courses');
    if (saved) return JSON.parse(saved);
    return [];
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('mingle_courses', JSON.stringify(courses));
  }, [courses]);

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
      className='absolute inset-0 bg-mingle-bg-page overflow-hidden font-sans flex flex-col'
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

        <CourseSearchInput
          search={search}
          onSearchChange={setSearch}
          suggestions={suggestions}
          onAdd={add}
          testId='add-courses-search'
        />

      </div>

      <div className='flex-1 overflow-y-auto pb-[24px]'>

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
