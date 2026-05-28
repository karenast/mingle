import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw, LogOut } from 'lucide-react';
import PageMotion from '../components/PageMotion';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import { demoUser } from '../data/demoUser';
import { loadUser, saveUser, clearUser } from '../utils/userStorage';
import { fadeUp } from '../utils/motion';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const stored = loadUser();
  const firstName  = stored?.firstName  ?? demoUser.firstName;
  const lastName   = stored?.lastName   ?? demoUser.lastName;
  const username   = stored?.username   ?? demoUser.username;
  const mascotType = stored?.mascotType ?? demoUser.mascotType;

  const [bio, setBio]           = useState(stored?.bio       ?? demoUser.bio);
  const [instagram, setInstagram] = useState(stored?.instagram ?? '');
  const [saved, setSaved]       = useState(false);

  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();

  const handleSave = () => {
    saveUser({ bio, instagram });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('mingle_match_revealed');
    clearUser();
    navigate('/');
  };

  return (
    <PageMotion className='absolute inset-0 w-[390px] h-[844px] bg-mingle-bg-page font-sans overflow-hidden flex flex-col'>
      <AppHeader />

      <div className='flex-1 overflow-y-auto px-[24px] pb-[68px] mt-[56px]'>
        <motion.div
          className='flex flex-col items-center pt-[20px] pb-[24px]'
          {...fadeUp(0.05)}
        >
          <div className='w-[88px] h-[88px] rounded-full bg-mingle-bg-content flex items-center justify-center mb-[12px]'>
            <span className='text-[28px] font-semibold text-mingle-accent'>{initials}</span>
          </div>
          <p className='text-[18px] font-semibold text-mingle-dark'>
            {firstName} {lastName}
          </p>
          <p className='text-[13px] font-normal text-mingle-gray mt-[2px]'>
            @{username} · {demoUser.year}
          </p>
          <p className='text-[13px] font-normal text-mingle-gray mt-[1px]'>{demoUser.major}</p>
          <div className='mt-[10px] px-[12px] py-[4px] bg-mingle-bg-content rounded-full'>
            <span className='text-[12px] font-semibold text-mingle-accent'>{mascotType}</span>
          </div>
        </motion.div>

        <div className='h-px bg-[#E5E7EB] mb-[20px]' />

        <motion.div className='mb-[16px]' {...fadeUp(0.1)}>
          <label className='block text-[13px] font-semibold text-mingle-dark mb-[8px]'>Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder='Tell us about yourself...'
            rows={3}
            className='w-full bg-white rounded-[12px] border border-[#E5E7EB] p-[14px] text-[14px] text-mingle-dark placeholder:text-mingle-gray resize-none outline-none leading-snug focus:border-mingle-accent transition-colors'
          />
        </motion.div>

        <motion.div className='mb-[24px]' {...fadeUp(0.15)}>
          <label className='block text-[13px] font-semibold text-mingle-dark mb-[8px]'>
            Instagram
          </label>
          <div className='flex items-center bg-white rounded-[12px] border border-[#E5E7EB] px-[14px] h-[48px] gap-[8px] focus-within:border-mingle-accent transition-colors'>
            <span className='text-[14px] font-normal text-mingle-gray'>@</span>
            <input
              value={instagram}
              onChange={e => setInstagram(e.target.value)}
              placeholder='username'
              className='flex-1 text-[14px] text-mingle-dark bg-transparent outline-none placeholder:text-mingle-gray'
            />
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <Button className='w-full mb-[12px]' onClick={handleSave} disabled={saved}>
            {saved ? 'saved ✓' : 'save changes →'}
          </Button>
        </motion.div>

        <div className='h-px bg-[#E5E7EB] my-[16px]' />

        <motion.div {...fadeUp(0.25)}>
          <button
            onClick={() => navigate('/quiz/1', { state: { ...location.state, navDirection: 1 } })}
            className='w-full flex items-center justify-center gap-[8px] py-[14px] text-[13px] font-normal text-mingle-gray bg-transparent border-0 cursor-pointer hover:text-mingle-dark transition-colors'
          >
            <RotateCcw size={14} strokeWidth={2} />
            retake quiz
          </button>
        </motion.div>

        <motion.div {...fadeUp(0.3)}>
          <motion.button
            onClick={handleLogout}
            className='w-full flex items-center justify-center gap-[8px] py-[14px] text-[13px] font-normal bg-transparent border-0 cursor-pointer'
            style={{ color: '#e53e3e' }}
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <LogOut size={14} strokeWidth={2} />
            log out
          </motion.button>
        </motion.div>

        <div className='h-[16px]' />
      </div>
    </PageMotion>
  );
}
