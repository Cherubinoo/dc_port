import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";
import { env } from "@dc/env/web";

const convexUrl = env.NEXT_PUBLIC_CONVEX_URL || "https://lovable-clam-34.convex.cloud";
const convexSiteUrl = env.NEXT_PUBLIC_CONVEX_SITE_URL || "https://lovable-clam-34.convex.site";

export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthNextJs({
  convexUrl,
  convexSiteUrl,
});
