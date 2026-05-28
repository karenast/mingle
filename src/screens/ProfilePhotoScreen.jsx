import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '../utils/motion';
import PageMotion from '../components/PageMotion';
import Button from '../components/Button';
import { saveUser } from '../utils/userStorage';

export default function ProfilePhotoScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const firstName = location.state?.name?.trim().split(' ')[0] || 'there';

  const [photo, setPhoto] = useState(null);
  const [bio, setBio] = useState('');
  const fileRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <PageMotion className='absolute inset-0 w-[390px] h-[844px] bg-mingle-bg-page font-sans overflow-hidden flex flex-col'>
      <Button
        variant='icon'
        aria-label="Go back"
        onClick={() => navigate('/signup', { state: location.state })}
        className='absolute top-[14px] left-[16px] z-10'
      >
        <ChevronLeft size={20} strokeWidth={2} />
      </Button>

      <div className='flex flex-col flex-1 px-[26px] pt-[64px] pb-[112px]'>
        <motion.p
          className='text-[36px] font-semibold text-mingle-dark'
          {...fadeUp(0.1)}
        >
          hey, {firstName.toLowerCase()}!
        </motion.p>

        <motion.div
          className='mt-[12px] w-[342px] h-[252px] bg-mingle-bg-content rounded-[20px] overflow-hidden relative flex items-center justify-center'
          {...fadeUp(0.18)}
        >
          <motion.button
            data-testid='photo-upload-btn'
            aria-label={photo ? 'Change profile photo' : 'Upload profile photo'}
            onClick={() => fileRef.current?.click()}
            className='w-[191px] h-[191px] rounded-full bg-white flex items-center justify-center overflow-hidden cursor-pointer'
            whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(74,116,199,0.22)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
          >
            {photo ? (
              <img src={photo} alt='Profile' className='w-full h-full object-cover' />
            ) : (
              <Camera size={36} strokeWidth={1.5} className='text-mingle-gray' />
            )}
          </motion.button>
          <input
            ref={fileRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handlePhotoChange}
          />
        </motion.div>

        <motion.div className='mt-[38px]' {...fadeUp(0.26)}>
          <label htmlFor='bio-input' className='text-[13px] font-normal text-mingle-dark block mb-[8px]'>
            Bio
          </label>
          <textarea
            id='bio-input'
            data-testid='bio-input'
            className='textarea w-full h-[199px] rounded-[10px] bg-white border border-[#DBE0ED] text-[13px] text-mingle-dark placeholder:text-[#8C8A99] resize-none p-[16px] leading-normal'
            placeholder='Introduce yourself...'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </motion.div>
      </div>

      <Button
        data-testid='profile-next-btn'
        onClick={() => {
          saveUser({ bio });
          navigate('/profile/quiz-intro', {
            state: { name: location.state?.name, bio, photo, formData: location.state?.formData },
          });
        }}
        className='mx-[24px] mb-[28px]'
      >
        next →
      </Button>
    </PageMotion>
  );
}
