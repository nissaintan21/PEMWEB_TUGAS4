interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`border p-2 rounded-2xl focus:outline-blue-800 w-full ${
          error ? "border-red-500" : ""
        }`}
      />

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Input;