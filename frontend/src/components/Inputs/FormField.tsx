// FormField.tsx
import React from "react";

interface FormFieldProps {
  label: string;
  type?: "input" | "select";
  inputType?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  options?: { value: string; label: string }[];
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = "input",
  inputType = "text",
  value,
  onChange,
  placeholder,
  icon,
  options,
}) => {
  const paddingLeftClass = icon ? "pl-9" : "pl-5";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
        {label}
      </label>

      <div className="relative w-full max-w-[450px]">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        {type === "input" ? (
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full h-[50px] rounded-lg border ${paddingLeftClass} pr-4 bg-white bg-opacity-60 outline-none focus:ring-2 focus:ring-blue-400 transition text-sm text-gray-800`}
          />
        ) : (
          <select
            value={value}
            onChange={onChange}
            className={`w-full h-[50px] rounded-lg border ${paddingLeftClass} pr-4 bg-white bg-opacity-60 outline-none focus:ring-2 focus:ring-blue-400 transition text-sm text-gray-800`}
          >
            <option value="">Select budget range</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};


export default FormField;