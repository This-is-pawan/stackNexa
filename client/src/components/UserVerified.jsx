import React, { useEffect, useState } from "react";
import { useAppContext } from "./ContextApi";
import { LiaSpinnerSolid } from "react-icons/lia";
const UserVerified = () => {
  const { auth, Handle_verified, theme, loading,otpExpire_time, } = useAppContext();
    const OTP_LENGTH = 4;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));

  // otp data start

  const handleChange = (value, index) => {
  if (!/^\d?$/.test(value)) return; // only allow 1 digit

  const newOtp = [...otp]; // ✅ fix: copy array correctly
  newOtp[index] = value;
  setOtp(newOtp);

  if (value && index < OTP_LENGTH - 1) {
    document.getElementById(`otp-${index + 1}`)?.focus();
  }
};


const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");


  // otp data end
// time start
  const [timeLeft,setTimeLeft]=useState(0)
  useEffect(()=>{
if (!otpExpire_time) return
const interval=setInterval(() => {
  const diff=new Date(otpExpire_time).getTime()-Date.now();
   setTimeLeft(Math.max(Math.floor(diff / 1000), 0));
}, 1000);
return ()=>clearInterval(interval)
  },[otpExpire_time])

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

//  timer end
  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-yellow-300" : "bg-black text-white"
      }`}
    >
      <div className="p-8 rounded-xl bg-white/10 text-center space-y-4">
        <h2 className="text-xl font-bold">Verify OTP</h2>
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="
                w-12 h-12 sm:w-14 sm:h-14
                text-center text-lg font-semibold
                text-gray-900 bg-white
                rounded-xl shadow-md
                m-1
                outline-none transition-all
                focus:ring-4 focus:ring-orange-400
              "
          />
        ))}
<p>{formatTime(timeLeft)}</p>
        <button
          disabled={!isOtpComplete || timeLeft <= 0 || loading}
          onClick={() => Handle_verified(otp.join(""))}
          className="w-full py-2 bg-orange-500 rounded disabled:bg-gray-500"
        >
          {loading ? <LiaSpinnerSolid className="animate-spin mx-auto"/> : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default UserVerified;