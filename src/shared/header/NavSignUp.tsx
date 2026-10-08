export function NavSignUp() {
  return (
    <div className="flex items-center h-8.5">
      <button
        type="button"
        aria-label="Sign up"
        className="cursor-pointer flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        style={{ background: "linear-gradient(135deg, #e8352d, #ff7226, #ff6838)" }}
      >
        Sign Up
      </button>
    </div>
  );
}
