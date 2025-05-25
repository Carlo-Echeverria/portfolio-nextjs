interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

interface TokenData {
  token: string;
  expiresAt: number;
}

// In-memory token storage (consider using a more persistent solution in production)
let tokenCache: TokenData | null = null;

export const generateDrupalToken = async (): Promise<string> => {
  // Check if we have a valid cached token
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.token;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'password',
        client_id: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_ID || 'f-EFnkxkGc3jsQ9cKWqI-aDUe_ckSsPmIhXM7V_JDh8',
        client_secret: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_SECRET || 'portfolio-decoupled',
        username: process.env.NEXT_PUBLIC_DRUPAL_USERNAME || 'pantheon_decoupled',
        password: process.env.NEXT_PUBLIC_DRUPAL_PASSWORD || 'user-portfolio',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate token: ${response.status} ${response.statusText}`);
    }

    const tokenResponse: TokenResponse = await response.json();

    // Cache the token with expiration time (subtract 60 seconds for safety margin)
    const expiresAt = Date.now() + (tokenResponse.expires_in - 60) * 1000;
    tokenCache = {
      token: tokenResponse.access_token,
      expiresAt,
    };

    return tokenResponse.access_token;
  } catch (error) {
    console.error('Error generating Drupal token:', error);
    throw error;
  }
};

export const getAuthenticatedHeaders = async (): Promise<HeadersInit> => {
  const token = await generateDrupalToken();
  return {
    'Content-Type': 'application/vnd.api+json',
    'Authorization': `Bearer ${token}`,
  };
};

export const clearTokenCache = (): void => {
  tokenCache = null;
}; 