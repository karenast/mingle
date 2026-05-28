import { useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { NavDirectionCtx } from './context/NavDirection';
import StartScreen from './screens/StartScreen';
import SignupScreen from './screens/SignupScreen';
import ProfilePhotoScreen from './screens/ProfilePhotoScreen';
import ProfileBioScreen from './screens/ProfileBioScreen';
import QuizIntroScreen from './screens/QuizIntroScreen';
import QuizScreen from './screens/QuizScreen';
import MascotScreen from './screens/MascotScreen';
import ScheduleEntryScreen from './screens/ScheduleEntryScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import ScheduleAddScreen from './screens/ScheduleAddScreen';
import HomeScreen from './screens/HomeScreen';
import MatchRevealScreen from './screens/MatchRevealScreen';
import ChatsScreen from './screens/ChatsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatEntryScreen from './screens/ChatEntryScreen';
import ChatThreadScreen from './screens/ChatThreadScreen';
import BottomNav from './components/BottomNav';

const ROUTE_ORDER = [
  '/',
  '/signup',
  '/profile',
  '/quiz',
  '/mascot',
  '/schedule',
  '/schedule/entry',
  '/schedule/add',
  '/home',
  '/match',
  '/chats',
  '/chat',
  '/me',
];

function routeRank(path) {
  const exact = ROUTE_ORDER.indexOf(path);
  if (exact !== -1) return exact;
  for (let i = ROUTE_ORDER.length - 1; i >= 0; i--) {
    if (path.startsWith(ROUTE_ORDER[i] + '/')) return i;
  }
  return 0;
}

function showsNav(pathname) {
  return pathname === '/home'
    || pathname === '/chats'
    || pathname === '/me'
    || pathname.startsWith('/chat/')
    || pathname.startsWith('/match')
    || pathname.startsWith('/schedule');
}

function AnimatedRoutes() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const directionRef = useRef(1);

  if (location.pathname !== prevPathRef.current) {
    const override = location.state?.navDirection;
    if (override !== undefined) {
      directionRef.current = override;
    } else {
      const prev = routeRank(prevPathRef.current);
      const curr = routeRank(location.pathname);
      directionRef.current = curr >= prev ? 1 : -1;
    }
    prevPathRef.current = location.pathname;
  }

  const direction = directionRef.current;

  return (
    <NavDirectionCtx.Provider value={direction}>
      <AnimatePresence custom={direction} initial={false}>
        <Routes location={location} key={location.pathname}>

          <Route path="/" element={<StartScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/profile/photo" element={<ProfilePhotoScreen />} />
          <Route path="/profile/bio" element={<ProfileBioScreen />} />
          <Route path="/profile/quiz-intro" element={<QuizIntroScreen />} />
          <Route path="/quiz/:step" element={<QuizScreen />} />
          <Route path="/mascot" element={<MascotScreen />} />
          <Route path="/schedule" element={<ScheduleScreen />} />
          <Route path="/schedule/entry" element={<ScheduleEntryScreen />} />
          <Route path="/schedule/add" element={<ScheduleAddScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/match" element={<MatchRevealScreen />} />
          <Route path="/chats" element={<ChatsScreen />} />
          <Route path="/me" element={<ProfileScreen />} />
          <Route path="/chat/entry" element={<ChatEntryScreen />} />
          <Route path="/chat/thread" element={<ChatThreadScreen />} />
        </Routes>
      </AnimatePresence>
      {showsNav(location.pathname) && <BottomNav />}
    </NavDirectionCtx.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
