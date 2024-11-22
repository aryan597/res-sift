export const Input = ({ className = "", ...props }) => {
    return (
      <input
        className={`flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  };