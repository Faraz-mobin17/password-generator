// React and necessary components are imported from their respective modules
import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";

import CheckBox from "./CheckBox";
import IconCopy from "../assets/images/icon-copy";
import Slider from "./Slider";
import Button from "./Button";

// Functional component for a password generator card
export default function Card() {
  // State variables for controlling various aspects of the password generation
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [uppercaseAllowed, setUpperCaseAllowed] = useState(true);
  const [lowercaseAllowed, setLowerCaseAllowed] = useState(true);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Array of checkbox configurations for different character sets
  const checkboxes = [
    // Configuration for Uppercase checkbox
    {
      id: "uppercaseAllowed",
      checked: uppercaseAllowed,
      setValue: setUpperCaseAllowed,
      label: "Include Uppercase Allowed",
    },
    // Configuration for Lowercase checkbox
    {
      id: "lowercaseAllowed",
      checked: lowercaseAllowed,
      setValue: setLowerCaseAllowed,
      label: "Include Lowercase Allowed",
    },
    // Configuration for Numbers checkbox
    {
      id: "numberAllowed",
      checked: numberAllowed,
      setValue: setNumberAllowed,
      label: "Include Number Allowed",
    },
    // Configuration for Symbols checkbox
    {
      id: "symbolAllowed",
      checked: symbolAllowed,
      setValue: setSymbolAllowed,
      label: "Include Symbol Allowed",
    },
  ];

  // Ref for the password input field
  const passwordRef = useRef(null);

  // Callback function to generate a password based on current settings
  const generatePassword = useCallback(fn, [
    length,
    numberAllowed,
    uppercaseAllowed,
    lowercaseAllowed,
    symbolAllowed,
    setPassword,
  ]);

  // Actual password generation logic
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

    // Set the generated password to the state
    setPassword(password);
  }

  // Effect to generate a password whenever relevant state variables change
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

  // Callback function to copy the generated password to the clipboard
  const copyPass = useCallback(copyToClip, [password]);
  function copyToClip() {
    passwordRef.current?.select();

    // Using Clipboard API to copy the password to the clipboard
    window.navigator.clipboard.writeText(password).then(() => {
      // Set copied state to true and reset it after 1 second
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000); // Set timeout for 1 second (1000 milliseconds)
    });
  }

  // JSX structure for the password generator card
  return (
    <div>
      <h2 className="text-center mb-4 text-2xl">Password Generator</h2>
      <div className="flex justify-center items-center max-w-full">
        {/* Input field for displaying the generated password */}
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Px3st$jzk@"
          readOnly
          value={password}
          className="text-black bg-transparent p-3 inputField"
          ref={passwordRef}
        />

        {/* Copy button for copying the generated password to the clipboard */}
        <div
          className="cursor-pointer flex items-center relative w-fit  bg-[#24232c] sm:p-4"
          onClick={copyPass}
          style={{ marginLeft: "-60px" }}
        >
          <span
            className="text-neon-green font-jetbrainsmono text-[18px] pr-4 "
            style={{ marginLeft: "-10px" }}
          >
            {copied ? "copied!" : ""}
          </span>
          <IconCopy className="z-10" />
        </div>
      </div>

      {/* Configuration settings for the password generator */}
      <div className="flex flex-col shadow overflow-hidden mb-4 p-10 mt-4 text-white bg-[#24232C] justify-center">
        <Slider id="Character Length" value={length} setValue={setLength} />
        {/* Render checkboxes based on the configurations */}
        {checkboxes.map(({ id, checked, setValue, label }) => (
          <CheckBox
            key={id}
            id={id}
            checked={checked}
            setValue={setValue}
            label={label}
          />
        ))}
        {/* Button to manually trigger password generation */}
        <Button generatePassword={generatePassword} />
      </div>
    </div>
  );
}
