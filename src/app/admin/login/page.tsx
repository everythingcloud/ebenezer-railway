import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-dark px-6">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white p-8 text-center shadow-xl">
        <p className="font-serif text-xl font-semibold text-primary">
          Ebenezer Baptist Church
        </p>
        <p className="mt-1 text-sm text-muted">Admin Portal</p>

        <form
          className="mt-8"
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/admin" });
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-white px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-background"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.85-.08-1.66-.22-2.44H12v4.62h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.54-5.17 3.54-8.8z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.07 7.95-2.93l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11C3.24 21.3 7.28 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.26A7.2 7.2 0 014.9 12c0-.79.14-1.55.37-2.26V6.63H1.26A11.98 11.98 0 000 12c0 1.94.47 3.77 1.26 5.37l4.01-3.11z"
              />
              <path
                fill="#EA4335"
                d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.26 6.63l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77z"
              />
            </svg>
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-xs text-muted">
          Access is limited to authorised church administrators.
        </p>
      </div>
    </div>
  );
}
