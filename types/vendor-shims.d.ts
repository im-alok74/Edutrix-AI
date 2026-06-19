declare module "@clerk/nextjs" {
  export const ClerkProvider: React.ComponentType<{ children: React.ReactNode }>;
  export const SignedIn: React.ComponentType<{ children: React.ReactNode }>;
  export const SignedOut: React.ComponentType<{ children: React.ReactNode }>;
  export const SignInButton: React.ComponentType<{ children: React.ReactNode; mode?: "modal" | "redirect" }>;
  export const UserButton: React.ComponentType<{ afterSignOutUrl?: string }>;
}

declare module "@clerk/nextjs/server" {
  export function auth(): Promise<{ userId: string | null }>;
  export function currentUser(): Promise<{
    fullName?: string | null;
    firstName?: string | null;
    imageUrl?: string | null;
    emailAddresses: { emailAddress: string }[];
  } | null>;
  export function createRouteMatcher(routes: string[]): (request: Request) => boolean;
  export function clerkMiddleware(handler: (auth: { protect: () => Promise<void> }, req: Request) => Promise<void> | void): unknown;
}

declare module "framer-motion" {
  export const motion: Record<string, React.ComponentType<any>>;
}

declare module "recharts" {
  export const Area: React.ComponentType<any>;
  export const AreaChart: React.ComponentType<any>;
  export const Bar: React.ComponentType<any>;
  export const BarChart: React.ComponentType<any>;
  export const CartesianGrid: React.ComponentType<any>;
  export const ResponsiveContainer: React.ComponentType<any>;
  export const Tooltip: React.ComponentType<any>;
  export const XAxis: React.ComponentType<any>;
  export const YAxis: React.ComponentType<any>;
}
