import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import ArrowRight from "../assets/images/icon-arrow-right.svg";
export default function Card() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [uppercaseAllowed, setUpperCaseAllowed] = useState(false);
  const [lowercaseAllowed, setLowerCaseAllowed] = useState(true);
  const [symbolAllowed, setSymbolAllowed] = useState(false);

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
    let symbols = "!@#$%^&*()_";

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
          style={{
            width: "fit-content",
            height: "80px",
            background: "#24232c",
          }}
          className="cursor-pointer flex items-center relative -left-10"
          onClick={copyPass}
        >
          <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
              fill="#A4FFAF"
            />
          </svg>
        </div>
      </div>
      <div
        className="flex flex-col shadow  overflow-hidden mb-4 p-10 mt-4"
        style={{
          background: "#24232C",
          width: "540px",
          height: "528px",
          flexShrink: "0",
        }}
      >
        <div className="flex items-center flex-col  gap-x-1 ">
          <div className="w-full flex justify-between items-center align-middle">
            <label htmlFor="slider" className="text-white">
              Character Length:
            </label>
            <div className="length">{length}</div>
          </div>
          <div className="w-full">
            <input
              type="range"
              min="8"
              max="15"
              step="1"
              value={length}
              className="cursor-pointer w-full outline-none mt-4"
              id="slider"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-x-1 mt-2">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput" className="text-white">
            Inlcude Numbers:
          </label>
        </div>
        <div className="flex items-center gap-x-1 mt-2">
          <input
            type="checkbox"
            defaultChecked={uppercaseAllowed}
            id="uppercaseAllowed"
            onChange={() => setUpperCaseAllowed((prev) => !prev)}
          />
          <label htmlFor="uppercaseAllowed" className="text-white">
            Include Uppercase letters:
          </label>
        </div>
        <div className="flex items-center gap-x-1 mt-2">
          <input
            type="checkbox"
            defaultChecked={lowercaseAllowed}
            id="lowercaseAllowed"
            onChange={() => setLowerCaseAllowed((prev) => !prev)}
          />
          <label htmlFor="lowercaseAllowed" className="text-white">
            Include Lowercase letters:
          </label>
        </div>
        <div className="flex items-center gap-x-2 mt-2">
          <input
            type="checkbox"
            defaultChecked={symbolAllowed}
            id="characterAllowed"
            onChange={() => setSymbolAllowed((prev) => !prev)}
          />
          <label htmlFor="characterAllowed" className="text-white">
            Include Symbols:
          </label>
        </div>
        <button
          type="button"
          className="p-2 neon-green mt-10 text-lg "
          onClick={generatePassword}
        >
          GENERATE
          {/* <img src={ArrowRight} alt="arrow right" /> */}
        </button>
      </div>
    </div>
  );
}
