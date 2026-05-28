import { useLocation, useNavigate } from 'react-router-dom';
import { Home, MessageCircle, User } from 'lucide-react';

const tabs = [
  { label: 'home',    icon: Home,          path: '/home' },
  { label: 'chat',    icon: MessageCircle, path: '/chats' },
  { label: 'profile', icon: User,          path: '/me' },
];

function isTabActive(label, pathname) {
  if (label === 'chat') return pathname === '/chats' || pathname.startsWith('/chat/');
  if (label === 'profile') return pathname === '/me';
  return pathname === '/home';
}

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIdx = tabs.findIndex(({ label }) => isTabActive(label, location.pathname));

  return (
    <div className='absolute bottom-0 left-0 w-full h-[68px] bg-white border-t border-[#DBE0ED] flex items-center justify-around px-[20px]'>
      {tabs.map(({ label, icon: Icon, path }, idx) => {
        const active = isTabActive(label, location.pathname);
        return (
          <button
            key={label}
            data-testid={`nav-${label}`}
            onClick={() => {
              if (active) return;
              navigate(path, {
                state: { ...location.state, navDirection: idx > currentIdx ? 1 : -1 },
              });
            }}
            className='flex flex-col items-center gap-[4px] w-[80px]'
          >
            <div
              className={`w-[44px] h-[32px] flex items-center justify-center rounded-[6px] ${
                active ? 'bg-mingle-bg-content' : 'bg-mingle-white2'
              }`}
            >
              <Icon
                size={20}
                className={active ? 'text-mingle-accent' : 'text-mingle-gray'}
              />
            </div>
            <span
              className={`text-[10px] ${
                active ? 'text-mingle-accent font-semibold' : 'text-mingle-gray font-normal'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
