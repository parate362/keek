import React, { useState } from "react";
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import LoginCarousel from "../Components/LoginSignUpPage/LoginCarousel/LoginCarousel";
import { Link, useNavigate } from "react-router-dom";
import { FaMobileAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { BsEyeSlash } from "react-icons/bs";
import { FiKey } from "react-icons/fi";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    uppercase: false,
    numbers: false,
    minLength: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
 const navigate = useNavigate()
  const [isVerified, setIsVerified] = useState(false); // State to track OTP verification status

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    let uppercase = false;
    let numbers = false;
    let minLength = false;

    if (name === "password") {
      uppercase = /[A-Z]/.test(value);
      numbers = /[0-9]/.test(value);
      minLength = value.length >= 8;
    }

    setFormData({
      ...formData,
      [name]: value,
      uppercase,
      numbers,
      minLength,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setFormData({
      ...formData,
      showConfirmPassword: !formData.showConfirmPassword,
    });
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      email: value,
    });

    setOtpSent(false); // Reset OTP status
    setIsVerified(false); // Reset verification status
  };

  

  const sendOtp = async () => {
    try {
      const response = await fetch(`https://keek-server.vercel.app/api/user/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        alert(`OTP sent to ${formData.email} please check and verify your email`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error sending OTP');
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = async () => {
   
    try {
      const response = await fetch(`https://keek-server.vercel.app/api/user/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, otp,  }),
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
  

  let slides = [
    "https://www.searchenginejournal.com/wp-content/uploads/2022/09/influencer-marketing2-631aeb9e3273a-sej.png",
    "https://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2Finfluencer+india.jpg&h=570&w=855&q=100&v=20170226&c=1",
    "https://agencynetwork.org/assets/upload/article/835112326202038253232_6393005ccc516923b883acee_Influencer-Marketing.jpg",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      setError("All fields are required.");
      setSuccess("");

      setTimeout(() => {
        setError("");
      }, 2000);

      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");

      setTimeout(() => {
        setError("");
      }, 2000);

      return;
    }

    if (!formData.uppercase || !formData.numbers || !formData.minLength) {
      setError("Password does not meet the required criteria.");
      setSuccess("");

      setTimeout(() => {
        setError("");
      }, 4000);

      return;
    }

    // if (!isVerified) {
    //   setError("Please verify OTP first.");
    //   setSuccess("");

    //   setTimeout(() => {
    //     setError("");
    //   }, 2000);

    //   return;
    // }
    const updatedFormData = { ...formData };
    updatedFormData.isSubmitting = true; 
    setFormData(updatedFormData);
    
  
      axios.post("http://localhost:8080/api/user/register-email", formData )
        .then((formData) => {
          setSuccess('Sign up successful!');
          setError('');
          navigate("/");
          setTimeout(() => {
            setSuccess("");
          }, 2000);
        
        }
      )
        .catch((err) => {
          setError('Sign up failed. Please try again.');
          console.log(err);
        });
     

  setFormData({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    uppercase: false,
    numbers: false,
    minLength: false,
  });


  };

  return (
    <div className="flex flex-row h-[100vh] relative">
      {/* carousal panel */}
      <div className="h-screen w-[100%] relative">
        <LoginCarousel slides={slides} autoSlide={true} />
      </div>
      <div className="w-full md:w-[61%] p-8">
        <h2 className="text-5xl font-bold mb-4 text-left text-blue-600 font-serif">
          Keek
        </h2>
        <div className="flex flex-col space-y-4 mb-4">
          <Button
            variant="outlined"
            className="flex items-center justify-center w-full"
            startIcon={<FcGoogle />}
            style={{ color: "black", border: "1px solid lightgrey" }}
          >
            Continue with Google
          </Button>
          <Link to={"/SignUp_Mobile"}>
            <Button
              startIcon={<FaMobileAlt style={{ color: "grey" }} />}
              variant="outlined"
              className="flex items-center justify-center w-full"
              style={{ color: "black", border: "1px solid lightgrey" }}
            >
              Continue with Mobile Number
            </Button>
          </Link>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label
              className="block text-left text-gray-700 mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <TextField
                size="small"
                id="name"
                name="name"
                variant="outlined"
                placeholder="John Doe"
                fullWidth
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </div>
          </div>
          <div className="mb-1">
      <label className="block text-left text-gray-700 mb-2" htmlFor="email">
        Email
      </label>
      <div className={`relative ${isVerified ? 'border-green-800' : ''}`}>
        <TextField
          size="small"
          id="email"
          name="email"
          type="email"
          placeholder="john.doe@gmail.com"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleEmailChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaEnvelope />
              </InputAdornment>
            ),
          }}
          required
          disabled={otpSent}
        />
        { !isVerified ? 
        <button
          onClick={sendOtp}
          className={`absolute inset-y-0 right-0 px-4 flex items-center border-l border-gray-300 opacity-50 ${
            formData.email && !otpSent && 'opacity-100'
          }`}
          disabled={!formData.email || otpSent}
        >
          Send OTP
        </button> : <div
          className={`absolute text-green-500 inset-y-0 right-0 px-4 flex items-center border-l border-gray-300 opacity-50`}
          disabled={!formData.email || otpSent}
        >
          Verified
        </div>
        }
      </div>

      {otpSent && !isVerified && (
        <div className="my-2">
        
          <div className={`relative ${isVerified ? 'border-green-300' : ''}`}>
            <input
              className={`border rounded-md pl-10 w-full py-2 ${
                isVerified ? 'border-green-300' : ''
              }`}
              type={`${showOtp ? 'text' : 'password'}`}
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              // disabled={!otpSent}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiKey className="rotate-90 opacity-50" />
            </div>
            <div
              onClick={() => {
                setShowOtp(!showOtp);
              }}
              className="absolute inset-y-0 right-20 pl-3 flex items-center cursor-pointer"
            >
              {showOtp ? (
                <BsEyeSlash className="text-2xl opacity-50" />
              ) : (
                <IoEyeOutline className="text-2xl opacity-50" />
              )}
            </div>
            <button
              onClick={verifyOtp}
              className={`absolute inset-y-0 right-0 px-8 flex items-center  border-gray-300 opacity-5`}
              disabled={!otp || isVerified}
            >
               Verify
            </button>
          </div>
        </div>
      )}
    </div>
          <div className="mb-2">
            <label
              className="block text-left text-gray-700 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <TextField
                size="small"
                id="password"
                placeholder="Password"
                name="password"
                type={formData.showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handlePasswordChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </div>
            <div className="mt-2 flex flex-column">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.uppercase}
                    style={{
                      color: formData.uppercase ? "green" : "gray",
                    }}
                    disabled
                  />
                }
                label="Uppercase"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.numbers}
                    style={{
                      color: formData.numbers ? "green" : "gray",
                    }}
                    disabled
                  />
                }
                label="Numbers"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.minLength}
                    style={{
                      color: formData.minLength ? "green" : "gray",
                    }}
                    disabled
                  />
                }
                label="Min 8 Characters"
              />
            </div>
          </div>
          <div className="mb-2">
            <label
              className="block text-left text-gray-700 mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <TextField
                size="small"
                placeholder="Password"
                id="confirmPassword"
                name="confirmPassword"
                type={formData.showConfirmPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={formData.confirmPassword}
                onChange={handleConfirmPasswordChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {formData.showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-600 transition mb-2 duration-200"
          >
            Sign Up
          </button>
          <div className="items-center text-center">
            <h2>
              Already have an account?&nbsp;
              <button className="text-end text-blue-600 active:text-blue-800 active:font-semibold">
                <Link to={"/"}>Login</Link>
              </button>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
