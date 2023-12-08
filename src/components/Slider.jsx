function Slider({ id, value, setValue }) {
  const handleSliderValueChange = (e) => {
    const percent = (parseInt(e.target.value) / parseInt(e.target.max)) * 100;
    e.target.style.setProperty("--percent", `${percent.toFixed(2)}%`);
    setValue(parseInt(e.target.value));
  };
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 sm:mb-4">
        <label htmlFor={id} className="text-base sm:text-body">
          {id}
        </label>
        <span
          className="text-heading-M sm:text-heading-L text-neon-green font-jetbrainsmono
        "
        >
          {value}
        </span>
      </div>
      <input
        type="range"
        id={id}
        min={0}
        max={20}
        value={value}
        className="w-full slider"
        onChange={handleSliderValueChange}
      />
    </div>
  );
}

export default Slider;
