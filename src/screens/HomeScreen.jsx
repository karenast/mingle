import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import PageMotion from '../components/PageMotion';
import { demoUser } from '../data/demoUser';
import { recentConnections, currentMatch } from '../data/demoMatches';
import AppHeader from '../components/AppHeader';
import MatchBannerCard from '../components/MatchBannerCard';
import BottomNav from '../components/BottomNav';
import mascotWaveUrl from '../assets/mascot_wave.png';

function getInitials(firstName, lastName) {
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
}

function getNextSunday9pm() {
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay();
  let daysUntil = day === 0 ? 0 : 7 - day;
  target.setDate(now.getDate() + daysUntil);
  target.setHours(21, 0, 0, 0);
  if (target <= now) {
    target.setDate(target.getDate() + 7);
  }
  return target;
}

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => targetDate - Date.now());
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(targetDate - Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  const total = Math.max(0, timeLeft);
  const d = Math.floor(total / 86400000);
  const h = Math.floor((total % 86400000) / 3600000);
  const m = Math.floor((total % 3600000) / 60000);
  const s = Math.floor((total % 60000) / 1000);
  return { d, h, m, s };
}

export default function HomeScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const registeredName = location.state?.name ?? demoUser.firstName;
  const firstName = registeredName.trim().split(' ')[0];
  const lastName =
    registeredName.trim().split(' ').slice(1).join(' ') || demoUser.lastName;

  const user = {
    ...demoUser,
    firstName,
    lastName,
    stats: { connections: 0, streak: 0, connected: 0 },
  };

  const matchRevealed =
    localStorage.getItem('mingle_match_revealed') === 'true';
  const jamieConnected = localStorage.getItem('mingle_connected') === '1';
  const resolvedMatch = { ...currentMatch, connected: jamieConnected };
  const connections = matchRevealed
    ? [resolvedMatch, ...recentConnections]
    : recentConnections;
  const countdown = useCountdown(getNextSunday9pm());

  const stats = {
    connections: parseInt(localStorage.getItem('mingle_connections') || '0'),
    streak: parseInt(localStorage.getItem('mingle_streak') || '0'),
    connected: parseInt(localStorage.getItem('mingle_connected') || '0'),
  };

  return (
    <PageMotion className='absolute inset-0 bg-mingle-bg-page font-sans overflow-hidden flex flex-col'>
      <AppHeader />

      <div className={`flex-1 overflow-y-auto pb-[80px] mt-[56px]`}>
        <div className='flex items-center justify-center w-full mb-[24px]'>
          <img
            src={mascotWaveUrl}
            alt=''
            style={{
              display: 'flex',
              width: 211,
              alignSelf: 'center',
              justifyContent: 'center',
              objectFit: 'contain',
            }}
          />
        </div>
        <div className='px-[24px]'>
          <p className='text-[22px] font-semibold text-mingle-dark leading-tight'>
            hey, {user.firstName.toLowerCase()}
          </p>
          <p className='text-[12px] font-normal text-mingle-gray mt-[4px]'>
            {user.term}
          </p>
        </div>

        <div className='px-[24px] mt-[16px]'>
          <MatchBannerCard
            variant={matchRevealed ? 'revealed' : 'pending'}
            countdown={countdown}
            onClick={() =>
              navigate('/match', {
                state: { ...location.state, navDirection: 1 },
              })
            }
          />
        </div>

        <div className='px-[24px] mt-[16px] flex gap-[10px]'>
          <div className='flex-1 bg-white rounded-[8px] p-[10px] flex flex-col gap-[2px]'>
            <p className='text-[18px] font-semibold text-mingle-dark leading-tight'>
              {stats.connections}
            </p>
            <p className='text-[10px] font-normal text-mingle-gray leading-tight'>
              connections
            </p>
          </div>

          <div className='flex-1 bg-white rounded-[8px] p-[10px] flex flex-col gap-[2px]'>
            <p className='text-[18px] font-semibold text-mingle-dark leading-tight'>
              {stats.streak}🔥
            </p>
            <p className='text-[10px] font-normal text-mingle-gray leading-tight'>
              streak
            </p>
          </div>

          <div className='flex-1 bg-white rounded-[8px] p-[10px] flex flex-col gap-[2px]'>
            <p className='text-[18px] font-semibold text-mingle-dark leading-tight'>
              {stats.connected}
            </p>
            <p className='text-[10px] font-normal text-mingle-gray leading-tight'>
              connected
            </p>
          </div>
        </div>

        <p className='px-[24px] mt-[20px] text-[14px] font-semibold text-mingle-dark'>
          recent
        </p>

        <div className='px-[24px] mt-[8px] flex flex-col gap-[8px]'>
          {connections.map((match) => {
            const initials = getInitials(match.firstName, match.lastName);
            const courseContext = `wk ${match.weekMatched} · ${match.sharedCourses.join(', ')}`;
            return (
              <button
                key={match.id}
                data-testid={`connection-card-${match.id}`}
                onClick={() =>
                  navigate('/chat/entry', {
                    state: { ...location.state, match, navDirection: 1 },
                  })
                }
                className='w-full bg-white rounded-card px-[14px] py-[14px] flex items-center gap-[12px] border-0 text-left'
              >
                <div className='w-[44px] h-[44px] rounded-full bg-mingle-bg-content flex items-center justify-center shrink-0 overflow-hidden'>
                  {match.photoURL ? (
                    <img
                      src={match.photoURL}
                      alt={match.firstName}
                      className='w-full h-full object-cover object-top'
                    />
                  ) : (
                    <span className='text-[14px] font-semibold text-mingle-accent'>
                      {initials}
                    </span>
                  )}
                </div>

                <div className='flex flex-col flex-1 min-w-0 gap-[2px]'>
                  <p className='text-[14px] font-semibold text-mingle-dark leading-tight'>
                    {match.firstName} {match.lastInitial}.
                  </p>
                  <p className='text-[11px] font-normal text-mingle-gray leading-tight truncate'>
                    {courseContext}
                  </p>
                </div>

                <div className='flex items-center gap-[8px] shrink-0'>
                  {match.connected && (
                    <span className='text-[10px] font-medium bg-mingle-positive-bg text-mingle-positive rounded-badge px-[8px] py-[3px]'>
                      ✓ connected
                    </span>
                  )}
                  <ChevronRight size={16} className='text-mingle-gray' />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </PageMotion>
  );
}
