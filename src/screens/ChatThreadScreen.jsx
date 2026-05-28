import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUp, ChevronLeft } from 'lucide-react';
import PageMotion from '../components/PageMotion';
import Button from '../components/Button';
import { currentMatch } from '../data/demoMatches';
import { JAMIE_RESPONSES } from '../data/demoMessages';

const GRADIENT = 'linear-gradient(to bottom, #c3c3ff 39.9%, #fafafc 100%)';

export default function ChatThreadScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const match = currentMatch;

  const isPromptMode = location.state?.mode === 'prompt';

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [jamieTyping, setJamieTyping] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(isPromptMode);
  const [promptInput, setPromptInput] = useState('');

  const responseIndexRef = useRef(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, jamieTyping]);

  useEffect(() => {
    if (!isPromptMode) inputRef.current?.focus();
  }, []);

  const scheduleJamieReply = (isPromptResponse = false) => {
    setJamieTyping(true);
    setTimeout(() => {
      const idx = responseIndexRef.current % JAMIE_RESPONSES.length;
      responseIndexRef.current += 1;
      const { text, followUp } = JAMIE_RESPONSES[idx];
      setJamieTyping(false);
      setMessages((prev) => [...prev, { id: Date.now(), sender: 'jamie', text, isPromptResponse }]);

      if (followUp) {
        setTimeout(() => {
          setJamieTyping(true);
          setTimeout(() => {
            setJamieTyping(false);
            setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'jamie', text: followUp }]);
          }, 1000);
        }, 500);
      }
    }, 900);
  };

  const markConnected = () => {
    if (!localStorage.getItem('mingle_connected')) {
      localStorage.setItem('mingle_connected', '1');
    }
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text || jamieTyping) return;
    markConnected();
    localStorage.setItem('mingle_chat_active', 'true');
    setInput('');
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text }]);
    scheduleJamieReply(false);
  };

  const sendPromptResponse = () => {
    const text = promptInput.trim();
    if (!text) return;
    localStorage.setItem('mingle_chat_active', 'true');
    markConnected();
    setShowPromptModal(false);
    setPromptInput('');
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text, isPromptResponse: true },
    ]);
    scheduleJamieReply(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const canSend = input.trim().length > 0 && !jamieTyping;

  return (
    <PageMotion
      className='absolute inset-0 overflow-hidden font-sans flex flex-col'
      style={{ background: GRADIENT }}
    >
      <div className='absolute left-0 top-0 w-[390px] h-[88px] bg-white z-10' />
      <div className='absolute left-0 top-[87px] w-[390px] h-px bg-[#dedbed] z-10' />
      <Button
        variant='icon'
        aria-label='Go back'
        onClick={() => navigate('/chat/entry', { state: { ...location.state, navDirection: -1 } })}
        className='absolute left-[16px] top-[38px] z-10'
      >
        <ChevronLeft size={20} strokeWidth={2} />
      </Button>

      <div className='h-[88px] flex-shrink-0' />

      <div className='flex-1 overflow-y-auto px-[24px] pb-[68px]'>
        <div className='bg-white rounded-[20px] p-[20px] flex flex-col gap-[8px] mt-[16px]'>
          <p className='text-[11px] font-semibold text-[#182B98]'>
            ✦&nbsp; this week&apos;s prompt
          </p>
          <p
            className='text-[14px] italic text-mingle-dark leading-snug'
            style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500 }}
          >
            {match.weeklyPrompt}
          </p>
        </div>

        <div className='flex flex-col items-center gap-[2px] my-[16px]'>
          <span className='text-[11px] font-normal text-mingle-accent'>
            today
          </span>
          <div className='w-[230px] h-px bg-mingle-accent' />
        </div>

        <div className='flex flex-col gap-[10px] pb-[16px]'>
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {msg.isPromptResponse ? (
                  <div
                    className={`max-w-[80%] px-[16px] py-[10px] text-white ${
                      msg.sender === 'user'
                        ? 'rounded-[16px] rounded-br-[3px]'
                        : 'rounded-[16px] rounded-bl-[3px]'
                    }`}
                    style={{ backgroundColor: '#6147D6' }}
                  >
                    <p className='text-[11px] italic mb-[4px] opacity-75'>
                      Prompt response
                    </p>
                    <p className='text-[14px] leading-snug'>{msg.text}</p>
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] px-[16px] py-[10px] text-[14px] leading-snug ${
                      msg.sender === 'user'
                        ? 'bg-mingle-dark text-white rounded-[16px] rounded-br-[3px]'
                        : 'bg-white text-mingle-dark rounded-[16px] rounded-bl-[3px]'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {jamieTyping && (
              <motion.div
                className='flex justify-start'
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <div className='bg-white rounded-[16px] rounded-bl-[3px] px-[14px] py-[12px] flex gap-[5px] items-center'>
                  {[0, 0.18, 0.36].map((delay, i) => (
                    <motion.span
                      key={i}
                      className='w-[6px] h-[6px] rounded-full bg-mingle-gray block'
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.55,
                        repeat: Infinity,
                        delay,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div ref={bottomRef} />
      </div>

      <div className='flex mb-[68px] px-[12px] gap-[10px] py-[12px] bg-white border-t border-[#dedbed]'>
        <input
          ref={inputRef}
          data-testid='chat-input'
          type='text'
          placeholder='send a message...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className=' w-full h-[40px] rounded-[20px] border border-[#dedbed] px-[16px] text-[13px] text-mingle-dark placeholder:text-mingle-gray bg-transparent outline-none'
        />
        <motion.button
          data-testid='chat-send-btn'
          onClick={sendMessage}
          disabled={!canSend}
          className='w-[40px] shrink-0 h-[40px] rounded-[20px] flex items-center justify-center border-0 cursor-pointer'
          style={{ backgroundColor: canSend ? '#0F0D1F' : '#dedbed' }}
          whileHover={canSend ? { scale: 1.08 } : {}}
          whileTap={canSend ? { scale: 0.9 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <span
            className='text-[14px] font-semibold leading-none'
            style={{ color: canSend ? '#fff' : '#8c8a99' }}
          >
            <ArrowUp size={16} />
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showPromptModal && (
          <>
            <motion.div
              className='absolute inset-0 z-20'
              style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowPromptModal(false)}
            />

            <motion.div
              className='absolute left-0 right-0 bottom-0 bg-white rounded-t-[24px] z-30'
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className='w-[40px] h-[4px] bg-[#dedbed] rounded-full mx-auto mt-[14px] mb-[20px]' />

              <div className='px-[24px] mb-[16px]'>
                <p className='text-[11px] font-semibold text-[#182B98] mb-[6px]'>
                  ✦&nbsp; this week&apos;s prompt
                </p>
                <p
                  className='text-[14px] italic text-mingle-dark leading-snug'
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                  }}
                >
                  {match.weeklyPrompt}
                </p>
              </div>

              <div className='h-px bg-[#f0f0f7] mx-[24px] mb-[16px]' />

              <div className='px-[24px] pb-[36px]'>
                <textarea
                  autoFocus
                  data-testid='prompt-input'
                  placeholder='Share your answer...'
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendPromptResponse();
                    }
                  }}
                  className='w-full min-h-[88px] bg-[#f7f6fd] rounded-[12px] p-[14px] text-[14px] text-mingle-dark placeholder:text-mingle-gray resize-none outline-none leading-snug'
                />
                <Button
                  data-testid='prompt-send-btn'
                  className='w-full mt-[12px]'
                  disabled={!promptInput.trim()}
                  onClick={sendPromptResponse}
                >
                  send answer
                  <ArrowRight size={16} className='ml-[8px]' />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageMotion>
  );
}
