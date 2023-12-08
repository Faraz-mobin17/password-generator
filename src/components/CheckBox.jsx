export default function CheckBox({ id, checked, setValue, label }) {
  return (
    <div className="flex items-center gap-5 sm:gap-6">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => setValue((prev) => !prev)}
        className="mr-2"
      />
      <label htmlFor={id} className="text-base sm:text-body capitalize">
        {label}
      </label>
    </div>
  );
}
