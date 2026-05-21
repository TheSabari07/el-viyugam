const ACCESS_TOKEN_STORAGE_KEY =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_STORAGE_KEY ?? "accessToken";

const ACCESS_TOKEN_EXPIRY_STORAGE_KEY =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY_STORAGE_KEY ??
  "accessTokenExpiresAt";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

const getAccessTokenExpiresInMs = () => {
  const value = process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN_MS;

  if (!value) {
    return undefined;
  }

  const expiresInMs = Number(value);
  return Number.isFinite(expiresInMs) && expiresInMs > 0
    ? expiresInMs
    : undefined;
};

export const storeAccessToken = (
  accessToken: string,
  expiresInMs = getAccessTokenExpiresInMs(),
) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);

  if (expiresInMs) {
    localStorage.setItem(
      ACCESS_TOKEN_EXPIRY_STORAGE_KEY,
      String(Date.now() + expiresInMs),
    );
  } else {
    localStorage.removeItem(ACCESS_TOKEN_EXPIRY_STORAGE_KEY);
  }
};

export const getStoredAccessToken = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const expiresAt = localStorage.getItem(ACCESS_TOKEN_EXPIRY_STORAGE_KEY);

  if (expiresAt && Date.now() >= Number(expiresAt)) {
    clearStoredAccessToken();
    return undefined;
  }

  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ?? undefined;
};

export const clearStoredAccessToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(ACCESS_TOKEN_EXPIRY_STORAGE_KEY);
};

export const logout = async () => {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  clearStoredAccessToken();
};
