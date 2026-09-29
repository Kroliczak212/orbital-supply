import type { RequestHandler } from "msw";

// Tu dodajemy handlery MSW (np. /api/cart), gdy powstanie warstwa koszyka.
export const handlers: RequestHandler[] = [];
