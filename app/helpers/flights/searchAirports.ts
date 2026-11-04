import { AirportSearchResult } from "@/models/AirportSearch";

const searchAirports = async (
  search: string,
  timeoutMs = 8000,
): Promise<AirportSearchResult> => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error("EXPO_PUBLIC_API_URL is not set");
    return {
      ok: false,
      error: { type: "config", message: "Search is unavailable right now." },
    };
  }

  const query = search.trim();

  if (!query) return { ok: true, airports: [] };

  const controller = new AbortController();

  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(
      `${baseUrl}airports?search=${encodeURIComponent(query)}`,
      { signal: controller.signal },
    );

    if (!response.ok) {
      console.warn(`Airport search failed: ${response.status}`);
      return {
        ok: false,
        error: {
          type: "server",
          status: response.status,
          message:
            response.status >= 500
              ? "The server is having trouble. Please try again later."
              : "Something went wrong with the search.",
        },
      };
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return {
        ok: false,
        error: {
          type: "invalid_response",
          message: "Received unexpected data from the server.",
        },
      };
    }

    return { ok: true, airports: data };
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      return {
        ok: false,
        error: {
          type: "timeout",
          message: "The search took too long. Please try again.",
        },
      };
    } else {
      return {
        ok: false,
        error: {
          type: "network",
          message: "Could not connect. Check your internet connection.",
        },
      };
    }
  } finally {
    clearTimeout(timer);
  }
};

export default searchAirports;
