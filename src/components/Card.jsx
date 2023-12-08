import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import ArrowRight from "../assets/images/icon-arrow-right";
import CheckBox from "./CheckBox";
import IconCopy from "../assets/images/icon-copy";
import Slider from "./Slider";

export default function Card() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [uppercaseAllowed, setUpperCaseAllowed] = useState(true);
  const [lowercaseAllowed, setLowerCaseAllowed] = useState(true);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const checkboxes = [
    {
      id: "uppercaseAllowed",
      checked: uppercaseAllowed,
      setValue: setUpperCaseAllowed,
      label: "Include Uppercase Allowed",
    },
    {
      id: "lowercaseAllowed",
      checked: lowercaseAllowed,
      setValue: setLowerCaseAllowed,
      label: "Include Lowercase Allowed",
    },
    {
      id: "numberAllowed",
      checked: numberAllowed,
      setValue: setNumberAllowed,
      label: "Include Number Allowed",
    },
    {
      id: "symbolAllowed",
      checked: symbolAllowed,
      setValue: setSymbolAllowed,
      label: "Include Symbol Allowed",
    },
  ];

  const passwordRef = useRef(null);

  const generatePassword = useCallback(fn, [
    length,
    numberAllowed,
    uppercaseAllowed,
    lowercaseAllowed,
    symbolAllowed,
    setPassword,
  ]);

  function fn() {
    let str = "";
    let pass = "";
    let uppercaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercaseChar = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "1234567890";
    let symbols = "!@#$%^&*()_[]{}:;,.<>/?|";

    if (uppercaseAllowed) {
      str += uppercaseChar;
    }
    if (lowercaseAllowed) {
      str += lowercaseChar;
    }
    if (numberAllowed) {
      str += numbers;
    }
    if (symbolAllowed) {
      str += symbols;
    }
    for (let i = 1; i <= length; i += 1) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }

  useEffect(() => {
    generatePassword();
  }, [
    length,
    numberAllowed,
    uppercaseAllowed,
    lowercaseAllowed,
    symbolAllowed,
    generatePassword,
  ]);

  const copyPass = useCallback(copyToClip, [password]);
  function copyToClip() {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  return (
    <div>
      <h2 className="text-center mb-4 text-2xl">Password Generator</h2>
      <div className="flex justify-center items-center">
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Px3st$jzk@"
          readOnly
          value={password}
          className="text-black bg-transparent p-3"
          ref={passwordRef}
        />

        <div
          className="cursor-pointer flex items-center relative -left-10 w-fit h-[80px] bg-[#24232c]"
          onClick={copyPass}
        >
          <IconCopy />
        </div>
      </div>
      <div className="flex flex-col shadow  overflow-hidden mb-4 p-10 mt-4 text-white bg-[#24232C] justify-center">
        <Slider id="Character Length" value={length} setValue={setLength} />
        {checkboxes.map(({ id, checked, setValue, label }) => (
          <CheckBox
            key={id}
            id={id}
            checked={checked}
            setValue={setValue}
            label={label}
          />
        ))}
        <button
          type="button"
          className=" bg-neon-green text-dark-grey text-base sm:text-body  py-[1.125rem] sm:py-5 w-full flex justify-center items-center gap-4 border-2 box-border border-dark-grey hover:bg-dark-grey hover:text-neon-green hover:border-neon-green mt-[32px]"
          onClick={generatePassword}
        >
          <span>GENERATE</span>
          <ArrowRight className="text-inherit" />
        </button>
      </div>
    </div>
  );
}
