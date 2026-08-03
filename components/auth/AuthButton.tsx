type AuthButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
};

export default function AuthButton({
  children,
  isLoading = false,
}: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
}