import React, { useState } from "react";
import "../loginorsignin/LoginPage.css";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

interface LoginPageProps {
  onLoginSuccess: () => void;  // Explicitly define the function type
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // State for success message

  const handleGoogleLoginSuccess = (response: CredentialResponse) => {
    console.log("Google Login Success:", response);
    onLoginSuccess(); // <<<<< ADD THIS LINE
  };
  const handleLogin = () => {
    // Simulate login success
    setTimeout(() => {
      onLoginSuccess(); // Notify parent (Header) about login success
    }, 1500);
  };
  const handleButtonClick = () => {
    if (!otpSent) {
      // Send OTP logic
      if (mobileNumber.trim().length === 10) {
        setOtpSent(true);
        console.log("OTP Sent to:", mobileNumber);
      } else {
        setLoginSuccess(false);
      }
    } else {
      // Login logic
      if (otp.trim().length === 6) {
        console.log("Logging in with OTP:", otp);
        setLoginSuccess(true);
        handleLogin();
      } else {
        setLoginSuccess(false);
      }
    }
  };

  return (
    <section className="h-screen flex p-0">
      <div className="w-1/2 flex flex-col justify-center p-10 text-black">
        <div className="w-960">
          <h3 className="text-2xl font-normal mb-6">Log in</h3>

          {/* Mobile Number Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="mobile">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              maxLength={10}
              placeholder="Enter your mobile number"
              disabled={otpSent} // Disable input after OTP is sent
            />
          </div>

          {/* OTP Input Field - Visible only if OTP is sent */}
          {otpSent && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="otp">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                maxLength={6}
                placeholder="Enter OTP"
              />
            </div>
          )}

          {/* Single Button for both Send OTP & Login */}
          <div className="mb-4">
            <button
              onClick={handleButtonClick}
              className="w-full p-3 rounded-lg custom-login-btn bg-teal-500 text-white"
            >
              {otpSent ? "Login" : "Send OTP"}
            </button>
          </div>

          {/* Success Message */}
          {loginSuccess && (
            <p className="text-green-600 text-sm text-center font-semibold mt-2">
              ✅ Login Successful!
            </p>
          )}

          <p className="text-sm text-gray-600">
            <a href="#!" className="text-teal-500">
              Resend OTP?
            </a>
          </p>

          <p className="mt-3 text-sm text-center">OR</p>

          {/* Google Login */}
          <div className="mt-3">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => console.error("Google Login Failed")}
            />
          </div>

          <p className="mt-3 text-sm">
            Don't have an account?{" "}
            <a href="#!" className="text-teal-500">
              Register here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
