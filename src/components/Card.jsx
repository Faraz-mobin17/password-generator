import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";

import CheckBox from "./CheckBox";
import IconCopy from "../assets/images/icon-copy";
import Slider from "./Slider";
import Button from "./Button";

export default function Card() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [uppercaseAllowed, setUpperCaseAllowed] = useState(true);
  const [lowercaseAllowed, setLowerCaseAllowed] = useState(true);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [copied, setCopied] = useState(false);

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
    const characterSets = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "1234567890",
      symbols: "!@#$%^&*()_[]{}:;,.<>/?|",
    };

    const selectedSets = Object.entries({
      uppercase: uppercaseAllowed,
      lowercase: lowercaseAllowed,
      numbers: numberAllowed,
      symbols: symbolAllowed,
    })
      .filter(([, allowed]) => allowed)
      .map(([setName]) => characterSets[setName])
      .join("");

    let password = "";
    for (let i = 1; i <= length; i += 1) {
      const char = Math.floor(Math.random() * selectedSets.length);
      password += selectedSets.charAt(char);
    }

    setPassword(password);
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

    window.navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000); // Set timeout for 1 second (1000 milliseconds)
    });
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
          <span className="text-neon-green font-jetbrainsmono text-[18px] pr-4">
            {copied ? "copied!" : ""}
          </span>
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
        <Button generatePassword={generatePassword} />
      </div>
    </div>
  );
}
