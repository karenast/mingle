import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { demoUser } from '../data/demoUser';
import PageMotion from '../components/PageMotion';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import CourseSearchInput from '../components/CourseSearchInput';
import { DEMO_COURSES, COURSE_CATALOG } from '../data/demoCourses';

export default function ScheduleScreen() {
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

  const remove = (id) => setCourses((c) => c.filter((x) => x.id !== id));

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
      className='absolute inset-0 overflow-hidden font-sans flex flex-col'
      style={{ background: 'linear-gradient(180deg, #C3C3FF 39.9%, #FAFAFC 100%)' }}
    >
      <AppHeader firstName={demoUser.firstName} lastName={demoUser.lastName} />

      <div className='px-[24px] pt-[67px] pb-[20px]'>
        <p className='text-[26px] font-semibold text-mingle-dark leading-normal mb-[4px]'>
          your courses
        </p>
        <p className='text-[13px] font-normal text-mingle-dark w-[342px] mb-[24px]'>
          these determine who you&apos;ll be matched with.
        </p>

        <Button
          variant='purple'
          onClick={() => navigate('/schedule/entry', { state: { ...location.state, navDirection: 1 } })}
          className='w-full'
        >
          <span className='ml-[20px] flex-1 text-left'>import from WebReg</span>
          <ArrowRight size={16} className='mr-[20px]' />
        </Button>
      </div>

      {courses.length > 0 && (
        <div className='px-[24px] mb-[12px]'>
          <p className='text-[14px] font-semibold text-mingle-dark mb-[8px]'>
            added courses
          </p>
          <div className='flex flex-wrap gap-[8px]'>
            {courses.map((c) => (
              <div
                key={c.id}
                className='h-[30px] rounded-[15px] bg-white flex items-center px-[8px] gap-[6px]'
              >
                <span
                  className='w-[10px] h-[10px] rounded-[5px] shrink-0'
                  style={{ backgroundColor: c.color }}
                />
                <span className='text-[12px] font-semibold text-mingle-dark whitespace-nowrap'>
                  {c.code}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className='flex flex-col flex-1 rounded-t-[20px] px-[24px] pt-[20px] bg-grape-panel min-h-0 pb-[100px]'>
        {courses.length > 0 ? (
          <div className='mb-[14px] shrink-0'>
            <CourseSearchInput
              search={search}
              onSearchChange={setSearch}
              suggestions={suggestions}
              onAdd={addCourse}
              placeholder='+ add another course...'
              testId='schedule-search'
            />
          </div>
        ) : (
          <div className='flex items-center justify-center gap-[8px] w-full h-[48px] rounded-[12px] bg-white mb-[14px] px-[14px] shrink-0'>
            <p className='text-[13px] text-center w-full text-grape-gray'>
              Uh oh! Looks like you don&apos;t have any classes!
            </p>
          </div>
        )}

        <div className='flex flex-col gap-[10px] overflow-y-auto flex-1'>
          {courses.map((c) => (
            <div
              key={c.id}
              className='flex items-center gap-[12px] w-full h-[68px] bg-white rounded-[12px] px-[14px] shrink-0'
            >
              <span
                className='w-[10px] h-[10px] rounded-[5px] shrink-0'
                style={{ backgroundColor: c.color }}
              />
              <div className='flex flex-col flex-1 min-w-0'>
                <p className='text-[13px] font-semibold text-mingle-dark leading-tight'>
                  {c.code}
                </p>
                <p className='text-[11px] font-normal text-grape-gray leading-tight truncate'>
                  {c.name}
                </p>
                <p className='text-[11px] font-normal text-grape-gray leading-tight'>
                  {c.section}
                </p>
              </div>
              <motion.button
                data-testid={`remove-course-${c.id}`}
                onClick={() => remove(c.id)}
                className='w-[24px] h-[24px] flex items-center justify-center rounded-full bg-grape-panel text-grape-gray shrink-0 border-0 cursor-pointer'
                whileHover={{ scale: 1.15, backgroundColor: '#e9e5fc' }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <X size={12} strokeWidth={2.5} />
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </PageMotion>
  );
}
