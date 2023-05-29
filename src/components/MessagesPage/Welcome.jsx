import React from "react";

const Welcome = () => {
  return (
    <div className="lg:col-start-3 lg:col-span-4 border border-borderColor rounded-lg p-4 bg-white grid place-items-center">
      <div className="flex flex-col items-center justify-center text-center">
        <img src="./wired-flat-981-consultation.gif" className="w-40" />
        <p className="text-xl max-w-xs text-textColor">
          Here you can chat with other users, click on any user on the left to
          start chatting...
        </p>
      </div>
    </div>
  );
};

export default Welcome;
