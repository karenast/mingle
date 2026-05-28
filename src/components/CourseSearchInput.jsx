import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

export default function CourseSearchInput({
  search,
  onSearchChange,
  suggestions,
  onAdd,
  placeholder = 'search by course code or title...',
  testId = 'course-search',
}) {
  return (
    <div className='relative'>
      <label className='flex items-center gap-[8px] w-full h-[48px] rounded-[12px] bg-white border border-[#DBE0ED] px-[14px]'>
        <Search size={15} className='text-grape-gray shrink-0' />
        <input
          data-testid={testId}
          type='text'
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className='grow text-[13px] text-mingle-dark bg-transparent outline-none placeholder:text-grape-gray'
        />
      </label>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            className='absolute left-0 right-0 top-[52px] bg-white rounded-[12px] border border-[#DBE0ED] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] overflow-hidden z-20'
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {suggestions.map((c) => (
              <button
                key={c.id}
                onClick={() => onAdd(c)}
                className='w-full flex items-center gap-[10px] px-[14px] py-[10px] text-left hover:bg-grape-panel border-0 bg-transparent cursor-pointer'
              >
                <span
                  className='w-[8px] h-[8px] rounded-full shrink-0'
                  style={{ backgroundColor: c.color }}
                />
                <span className='text-[13px] font-semibold text-mingle-dark'>{c.code}</span>
                <span className='text-[12px] font-normal text-grape-gray truncate'>{c.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
