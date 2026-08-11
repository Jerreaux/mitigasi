import { LoginDashboardPreview } from "@/components/auth/login-dashboard-preview";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left — full intelligence preview (desktop) */}
      <div className="relative hidden min-h-screen lg:block lg:w-[55%] xl:w-[58%]">
        <LoginDashboardPreview />
      </div>

      {/* Mobile — cropped preview strip */}
      <div className="relative h-44 shrink-0 overflow-hidden lg:hidden">
        <LoginDashboardPreview />
      </div>

      {/* Right — authentication card */}
      <div className="flex flex-1 items-center justify-center bg-background px-6 py-10 sm:px-10 lg:py-12">
        <LoginForm />
      </div>
    </div>
  );
}
