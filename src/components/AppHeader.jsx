import { useNavigate } from 'react-router-dom';

export default function AppHeader({ firstName = '', lastName = '' }) {
  const navigate = useNavigate();
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();

  return (
    <>
      <button
        onClick={() => navigate('/home')}
        className='absolute left-[24px] top-[20px] text-[20px] font-medium text-mingle-purple bg-transparent border-0 cursor-pointer p-0 leading-none hover:text-mingle-dark transition-colors'
      >
        mingle
      </button>
    </>
  );
}
