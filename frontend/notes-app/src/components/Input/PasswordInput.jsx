import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  function toggleShowPawssword() {
    setIsShowPassword(!isShowPassword);
  }

  return (
    <>
      <label className="text-zinc-200 text-sm" htmlFor="">
        Password
      </label>
      <div className="flex items-center mt-1 justify-center bg-transparent border-[1.5px] px-5 rounded-md mb-3">
        <input
          value={value}
          onChange={onChange}
          type={isShowPassword ? "text" : "password"}
          placeholder={placeholder || "Password"}
          className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
        />
        {isShowPassword ? (
          <FaRegEyeSlash
            size={22}
            onClick={toggleShowPawssword}
            className="text-slate-400 cursor-pointer"
          />
        ) : (
          <FaRegEye
            size={22}
            onClick={toggleShowPawssword}
            className="text-primary cursor-pointer"
          />
        )}
      </div>
    </>
  );
};

export default PasswordInput;
