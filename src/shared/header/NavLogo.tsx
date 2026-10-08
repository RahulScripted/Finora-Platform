import logoSvg from "@/assets/svgs/logo.svg";

export function NavLogo() {
  return (
    <div className="flex items-center gap-2 h-8.5">
      <img src={logoSvg} alt="Finora" className="h-6 w-auto" />
    </div>
  );
}
