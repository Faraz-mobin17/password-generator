import React from "react";
import ArrowRight from "../assets/images/icon-arrow-right";
function Button({ generatePassword }) {
  return (
    <button
      type="button"
      className=" bg-neon-green text-dark-grey text-base sm:text-body  py-[1.125rem] sm:py-5 w-full flex justify-center items-center gap-4 border-2 box-border border-dark-grey hover:bg-dark-grey hover:text-neon-green hover:border-neon-green mt-[32px] transition-colors"
      onClick={generatePassword}
    >
      <span>GENERATE</span>
      <ArrowRight className="text-inherit" />
    </button>
  );
}

export default Button;
