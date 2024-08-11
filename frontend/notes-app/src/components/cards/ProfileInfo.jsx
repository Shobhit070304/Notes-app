import React from "react";
import { getInitials } from "../../utils/helper.js";

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full text-zinc-950 font-medium bg-slate-100">
          {getInitials(userInfo.fullName)}
        </div>
        <div>
          <p className="text-sm text-black font-medium">{userInfo.fullName}</p>
          <button
            className="w-full text-sm text-center text-red-600  hover:bg-red-400 hover:rounded-md"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
