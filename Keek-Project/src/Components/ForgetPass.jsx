import { CiMail } from 'react-icons/ci';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginCarousel from './LoginSignUpPage/LoginCarousel/LoginCarousel';
import { FiKey } from "react-icons/fi";
import { BsEyeSlash, BsEye } from "react-icons/bs";

const ForgetPass = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showOtp, setShowOtp] = useState(false); 

  let slides = [
    "https://www.searchenginejournal.com/wp-content/uploads/2022/09/influencer-marketing2-631aeb9e3273a-sej.png",
    "https://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2Finfluencer+india.jpg&h=570&w=855&q=100&v=20170226&c=1",
    "https://agencynetwork.org/assets/upload/article/835112326202038253232_6393005ccc516923b883acee_Influencer-Marketing.jpg"
  ];

  const handleSendOtp = () => {
    
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    
    alert(`Entered OTP is: ${otp}`);
  };

  const toggleShowOtp = () => {
    setShowOtp(!showOtp);
  };

  return (
    <>
      <div className="flex flex-row h-[100vh] justify-center items-center">
        {/* carousel panel */}
        <div className="h-screen w-[100%] relative">
          <LoginCarousel slides={slides} autoSlide={true} />
        </div>
        
        {/* login panel */}
        <div className="mx-16 w-1/2 text-start items-center">
          <h1 className="text-5xl font-bold text-blue-600 font-serif mt-8">
            Keek
          </h1>
          <h2 className="mt-4 font-bold">Forgot Password?</h2>
          <h2 className="opacity-75 mb-4">Please enter your credentials</h2>
          <div className="mb-2">
            <div>Email</div>
            <div className="relative">
              <input
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                type="text"
                placeholder="john.doe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiMail className="inline-block text-xl opacity-75" />
              </div>
            </div>
            {!otpSent ? (
              <button
                className="w-full border text-white rounded-md my-2 py-2 bg-blue-600 active:bg-transparent active:border active:text-black"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            ) : (
              <>
                <div>Enter OTP</div>
                <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiKey className="rotate-90 opacity-50" />
            </div>
                  <input
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    type={showOtp ? "text" : "password"} 
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showOtp ? (
                      <BsEyeSlash
                        className="text-xl opacity-50 cursor-pointer"
                        onClick={toggleShowOtp}
                      />
                    ) : (
                      <BsEye
                        className="text-xl opacity-50 cursor-pointer"
                        onClick={toggleShowOtp}
                      />
                    )}
                  </div>
                </div>
                <button
                  className="w-full border text-white rounded-md my-2 py-2 bg-blue-600 active:bg-transparent active:border active:text-black"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>
              </>
            )}
            <div>
              <Link to={"/"}>
                <button className="w-full border rounded-md my-2 py-2 active:bg-blue-600 active:border active:text-white">
                  Back To Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPass;
