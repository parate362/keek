import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginCarousel from './LoginSignUpPage/LoginCarousel/LoginCarousel';
import { FaMobileAlt, FaUser } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { BsEyeSlash } from "react-icons/bs";
import { FiKey } from "react-icons/fi"; 

const SignUpMobile = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(""); 
  const navigate = useNavigate()
  const [showOtp, setShowOtp] = useState(false); 
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleMobileInputChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    setMobileNumber(numericValue);
  };

  const handleNameInputChange = (event) => {
    setName(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const sendOtp = async () => {
    try {
      const response = await fetch(`https://keek-server.vercel.app/api/user/sendmobile-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        alert(`OTP sent to your mobile number. Please check and verify your mobile number.`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(`https://keek-server.vercel.app/api/user/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber, otp }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setIsVerified(true);
        alert('OTP verified successfully');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error verifying OTP');
    }
  };

  const handleLogin = async () => {
    if (isVerified) {
      try {
        const response = await fetch("https://keek-server.vercel.app/api/user/register-mobile", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, mobileNumber }),
        });
  
        if (response.ok) {
          setSuccess('Sign up successful!');
          setError('');
          navigate("/");
          setTimeout(() => {
            setSuccess("");
          }, 2000);
        } else {
          const data = await response.json();
          setError(data.message);
        }
      } catch (err) {
        setError('Sign up failed. Please try again.');
      }
    } else {
      alert("Please verify OTP first.");
    }
  };

  let slides = [
    "https://www.searchenginejournal.com/wp-content/uploads/2022/09/influencer-marketing2-631aeb9e3273a-sej.png",
    "https://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2Finfluencer+india.jpg&h=570&w=855&q=100&v=20170226&c=1",
    "https://agencynetwork.org/assets/upload/article/835112326202038253232_6393005ccc516923b883acee_Influencer-Marketing.jpg"
  ];

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
          <h2 className="mt-4 font-bold">Sign up with your Mobile Number</h2>
          <h2 className="opacity-75 mb-4">Please enter your Name and Mobile Number</h2>
          <div className="mb-2">
            
          <div>Name</div>
            <div className="relative mb-3">
              <input
                className="w-full pl-2 pr-4 py-2 border rounded-lg"
                type="text"
                value={name}
                onChange={handleNameInputChange}
                placeholder="Enter Your Name"
                maxLength={35} 
              />
              {/* <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none">
           /     <FaUser className="inline-block mx-2 text-lg opacity-50" />
              </div> */}
            </div>
           <div>Mob. Number</div>
            <div className="relative mb-3">
              <input
                className="w-full pl-2 pr-4 py-2 border rounded-lg"
                type="text"
                inputMode="numeric"
                value={mobileNumber}
                onChange={handleMobileInputChange}
                placeholder="1234567890"
                maxLength={10} 
              />
              {/* <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none">
                <FaMobileAlt className="inline-block mx-2 text-lg opacity-50" />
              </div> */}
              <button
                onClick={sendOtp}
                className="absolute inset-y-0 right-0 px-4 flex items-center border-l border-gray-300"
                disabled={mobileNumber.length !== 10} 
              >
                Send OTP
              </button>
            </div>

            <div className="my-4">
              <div>Verify OTP</div>
              <div className="relative">
                <input
                  className="border rounded-md pl-2 w-full py-2"
                  type={`${showOtp ? "text" : "password"}`}
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  disabled={!otpSent} 
                />
                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiKey className="rotate-90 opacity-50" />
                </div> */}
                <div
                  onClick={() => {
                    setShowOtp(!showOtp);
                  }}
                  className="absolute inset-y-0 right-2 pl-3 flex items-center cursor-pointer"
                >
                  {showOtp ? (
                    <BsEyeSlash className="text-2xl opacity-50" />
                  ) : (
                    <IoEyeOutline className="text-2xl opacity-50" />
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                className="w-full border text-white rounded-md my-2 py-2 bg-blue-600 active:bg-transparent active:border active:text-black"
                onClick={handleLogin} 
                disabled={!otpSent} 
              >
                Login
              </button>
            </div>

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
}

export default SignUpMobile;
