import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "../utils/motion";
import PageMotion from "../components/PageMotion";
import Button from "../components/Button";
import { saveUser } from "../utils/userStorage";
import { Eye, EyeOff, ChevronLeft, ArrowRight } from "lucide-react";
import mascotUrl from "../assets/signup_mascot.png";

const isPwValid = (p) =>
  p.length >= 8 &&
  /[A-Z]/.test(p) &&
  /[a-z]/.test(p) &&
  /\d/.test(p) &&
  /[!@#$%^&*()_+\-=[\]{};'"\\|,.<>/?]/.test(p);

function Hint({ touched, valid, error, success }) {
  const msg = !touched ? "" : valid ? (success ?? "") : error;
  return (
    <p
      className={`h-[16px] text-[11px] mt-[4px] mb-[10px] ${
        touched && valid ? "text-mingle-positive" : "text-red-500"
      }`}
    >
      {msg}
    </p>
  );
}

function inputState(touched, valid) {
  if (!touched) return "border-[#DBE0ED]";
  return valid ? "border-mingle-positive" : "border-red-400";
}

export default function SignupScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const saved = location.state?.formData;
  const [form, setForm] = useState(saved ?? { name: "", username: "", password: "", confirm: "" });
  const [touched, setTouched] = useState({ name: false, username: false, password: false, confirm: false });
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const touch = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const passwordValid = isPwValid(form.password);
  const confirmValid = form.confirm.length > 0 && form.confirm === form.password;
  const nameValid = form.name.trim().length >= 2;
  const usernameValid = /^[a-z0-9_]{3,20}$/.test(form.username);
  const allValid = nameValid && usernameValid && passwordValid && confirmValid;

  return (
    <PageMotion className="absolute inset-0 bg-mingle-bg-page overflow-hidden font-sans flex flex-col">
      <Button
        variant='icon'
        aria-label="Go back"
        onClick={() => navigate("/")}
        className="absolute top-[14px] left-[16px] z-10"
      >
        <ChevronLeft size={20} strokeWidth={2} />
      </Button>

      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "159.979px",
          height: "345.901px",
          borderRadius: "345.901px",
          background: "rgba(114, 132, 255, 0.69)",
          filter: "blur(100px)",
          top: "-60px",
          right: "70px",
        }}
        animate={{
          rotate: [117, 130, 108, 117],
          scale: [1, 1.12, 0.94, 1],
          opacity: [0.69, 0.82, 0.6, 0.69],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 1)",
          filter: "blur(40px)",
          top: "19px",
          left: "87px",
        }}
        animate={{
          scale: [1, 1.1, 0.95, 1],
          x: [0, 6, -4, 0],
          y: [0, -5, 3, 0],
          opacity: [0.9, 1, 0.8, 0.9],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="flex flex-col items-center pt-[30px]">
        <motion.img
          src={mascotUrl}
          alt="Mingle mascot"
          className="w-[206px] z-[10] h-[198px] object-contain"
          {...fadeUp(0.2)}
        />

        <motion.p
          className="text-[36px] font-semibold text-mingle-dark mt-[31px]"
          {...fadeUp(0.28)}
        >
          mingle
        </motion.p>
      </div>

      <div className="flex-1 overflow-y-auto px-[24px] pt-[8px] pb-[16px]">
        <motion.div {...fadeUp(0.34)}>
          <label className="text-[13px] font-normal text-mingle-dark mb-1 block">Name</label>
          <label
            className={`input flex items-center w-full h-[56px] rounded-[10px] bg-white border ${inputState(touched.name, nameValid)} mb-[4px]`}
          >
            <input
              data-testid="signup-name"
              type="text"
              placeholder="Enter your first name"
              value={form.name}
              onChange={set("name")}
              onBlur={touch("name")}
              className="grow text-[13px] text-mingle-dark bg-transparent outline-none px-2"
            />
          </label>
          <Hint touched={touched.name} valid={nameValid} error="At least 2 characters required" />
        </motion.div>

        <motion.div {...fadeUp(0.40)}>
          <label className="text-[13px] font-normal text-mingle-dark mb-1 block">Username</label>
          <label
            className={`input flex items-center w-full h-[56px] rounded-[10px] bg-white border ${inputState(touched.username, usernameValid)} mb-[4px]`}
          >
            <input
              data-testid="signup-username"
              type="text"
              placeholder="Choose a username"
              value={form.username}
              onChange={set("username")}
              onBlur={touch("username")}
              className="grow text-[13px] text-mingle-dark bg-transparent outline-none px-2"
            />
          </label>
          <Hint touched={touched.username} valid={usernameValid} error="3–20 chars, letters, numbers, underscores only" />
        </motion.div>

        <motion.div {...fadeUp(0.46)}>
          <label className="text-[13px] font-normal text-mingle-dark mb-1 block">Password</label>
          <label
            className={`input flex items-center w-full h-[56px] rounded-[10px] bg-white border ${inputState(touched.password, passwordValid)} mb-[4px]`}
          >
            <input
              data-testid="signup-password"
              type={showPw ? "text" : "password"}
              placeholder="Create a password"
              value={form.password}
              onChange={set("password")}
              onBlur={touch("password")}
              className="grow text-[13px] text-mingle-dark bg-transparent outline-none px-2"
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPw ? "Hide password" : "Show password"}
              onClick={() => setShowPw((v) => !v)}
              className="w-[44px] h-[44px] flex items-center justify-center shrink-0 text-mingle-gray hover:text-mingle-dark"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </label>
          <Hint touched={touched.password} valid={passwordValid} error="8+ chars with uppercase, number & symbol" />
        </motion.div>

        <motion.div {...fadeUp(0.52)}>
          <label className="text-[13px] font-normal text-mingle-dark mb-1 block">Confirm Password</label>
          <label
            className={`input flex items-center w-full h-[56px] rounded-[10px] bg-white border ${inputState(touched.confirm, confirmValid)}`}
          >
            <input
              data-testid="signup-confirm"
              type={showCf ? "text" : "password"}
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={set("confirm")}
              onBlur={touch("confirm")}
              className="grow text-[13px] text-mingle-dark bg-transparent outline-none px-2"
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label={showCf ? "Hide confirm password" : "Show confirm password"}
              onClick={() => setShowCf((v) => !v)}
              className="w-[44px] h-[44px] flex items-center justify-center shrink-0 text-mingle-gray hover:text-mingle-dark"
            >
              {showCf ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </label>
          <Hint touched={touched.confirm} valid={confirmValid} error="Passwords don't match" success="Passwords match" />
        </motion.div>
      </div>

      <Button
        data-testid="signup-next-btn"
        onClick={() => {
          if (!allValid) return;
          const parts = form.name.trim().split(' ');
          saveUser({
            firstName: parts[0] ?? '',
            lastName: parts.slice(1).join(' ') || '',
            username: form.username,
          });
          navigate("/profile/photo", { state: { name: form.name, formData: form } });
        }}
        disabled={!allValid}
        className="mx-[24px] w-[calc(100%-48px)] mb-[28px]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: allValid ? 1 : 0.4, y: 0 }}
        transition={{
          opacity: { duration: 0.5, delay: 0.58, ease: 'easeOut' },
          y: { duration: 0.5, delay: 0.58, ease: 'easeOut' },
          scale: { type: 'spring', stiffness: 380, damping: 22 },
          boxShadow: { type: 'spring', stiffness: 380, damping: 22 },
        }}
      >
        next
        <ArrowRight size={16} className="ml-[8px]" />
      </Button>
    </PageMotion>
  );
}
