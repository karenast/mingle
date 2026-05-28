import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PageMotion from '../components/PageMotion';
import AppHeader from '../components/AppHeader';
import { currentMatch } from '../data/demoMatches';
import { demoUser } from '../data/demoUser';
import { JAMIE_RESPONSES } from '../data/demoMessages';
import { fadeUp } from '../utils/motion';

const CONVERSATIONS = [
  {
    id: 'conv_001',
    match: currentMatch,
    lastMessage: JAMIE_RESPONSES[0].text,
    timestamp: 'now',
    unread: true,
  },
];

function ConversationItem({ conv, onClick }) {
  const { match, lastMessage, timestamp, unread } = conv;
  const initials = `${match.firstName[0]}${match.lastInitial}`.toUpperCase();

  return (
    <motion.button
      onClick={onClick}
      className='w-full flex items-center gap-[14px] bg-white rounded-[14px] px-[16px] py-[14px] border-0 cursor-pointer text-left'
      whileHover={{ scale: 1.01, boxShadow: '0 4px 16px rgba(15,13,31,0.07)' }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      <div className='w-[48px] h-[48px] rounded-full overflow-hidden bg-[#ede5fc] shrink-0 flex items-center justify-center'>
        {match.photoURL ? (
          <img src={match.photoURL} alt={match.firstName} className='w-full h-full object-cover object-top' />
        ) : (
          <span className='text-[14px] font-semibold text-[#614ac7]'>{initials}</span>
        )}
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex items-center justify-between mb-[3px]'>
          <p className='text-[14px] font-semibold text-mingle-dark'>
            {match.firstName} {match.lastInitial}.
          </p>
          <span className='text-[11px] font-normal text-mingle-gray shrink-0 ml-[8px]'>
            {timestamp}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-[12px] font-normal text-mingle-gray truncate pr-[8px]'>
            {lastMessage}
          </p>
          {unread && (
            <span className='w-[8px] h-[8px] rounded-full shrink-0' style={{ backgroundColor: '#6147D6' }} />
          )}
        </div>
      </div>
    </motion.button>
  );
}

export default function ChatsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search] = useState('');

  const filtered = CONVERSATIONS.filter(c =>
    `${c.match.firstName} ${c.match.lastInitial}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageMotion className='absolute inset-0 bg-mingle-bg-page w-[390px] h-[844px] font-sans overflow-hidden flex flex-col'>
      <AppHeader firstName={demoUser.firstName} lastName={demoUser.lastName} />

      <div className='flex-1 overflow-y-auto pb-[84px] mt-[56px]'>
        <motion.p
          className='px-[24px] pt-[16px] pb-[20px] text-[26px] font-semibold text-mingle-dark'
          {...fadeUp(0.05)}
        >
          messages
        </motion.p>

        <motion.div
          className='px-[24px] flex flex-col gap-[10px]'
          {...fadeUp(0.15)}
        >
          {filtered.length > 0 ? (
            filtered.map(conv => (
              <ConversationItem
                key={conv.id}
                conv={conv}
                onClick={() => navigate('/chat/entry', { state: { ...location.state, navDirection: 1 } })}
              />
            ))
          ) : (
            <div className='flex flex-col items-center justify-center py-[48px] gap-[8px]'>
              <p className='text-[14px] font-semibold text-mingle-dark'>no chats yet</p>
              <p className='text-[12px] font-normal text-mingle-gray text-center w-[220px]'>
                get your first match to start chatting!
              </p>
            </div>
          )}
        </motion.div>
      </div>

    </PageMotion>
  );
}
