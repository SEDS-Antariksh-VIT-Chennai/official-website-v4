import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default async function AdminErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams;

  let title = "Authentication Error";
  let message = "An error occurred while trying to authenticate.";

  if (error === "AccessDenied") {
    title = "Access Denied";
    message = "Your Google account is not authorized to access the admin dashboard. If you believe this is a mistake, please contact the system administrator to add your email to the allowlist.";
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glow (Red for error) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/5 border border-red-500/20 p-8 rounded-2xl backdrop-blur-xl relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4 tracking-tight text-red-500 uppercase">{title}</h1>
        <p className="text-white/70 text-sm mb-8 leading-relaxed">
          {message}
        </p>

        <Link 
          href="/admin/login"
          className="w-full bg-white/10 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-lg hover:bg-white/20 transition-colors border border-white/10"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
}
