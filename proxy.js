// The middleware will protect the /admin routes
// and redirect unauthenticated users to the /login page.
// The `withAuth` middleware from next-auth handles this automatically.

import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// This config specifies which routes the middleware should apply to.
export const config = {
  matcher: ["/admin/:path*"],
};
