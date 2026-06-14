/**
 * AuthService
 * 
 * An abstraction layer for authentication.
 * Currently configured with mock delays to simulate network requests.
 * 
 * To connect to a real backend (e.g., Firebase, Supabase):
 * 1. Replace the mock promises with real API calls (e.g., signInWithEmailAndPassword).
 * 2. Map backend errors to standardized error objects.
 */

export interface AuthResponse {
  user: { id: string; email: string; name?: string } | null;
  error: string | null;
}

export const AuthService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password.length < 6) {
          resolve({ user: null, error: "Invalid credentials." });
        } else {
          resolve({ user: { id: "123", email }, error: null });
        }
      }, 1500); // Simulate network latency
    });
  },

  async signup(email: string, password: string, name?: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password.length < 6) {
          resolve({ user: null, error: "Password must be at least 6 characters." });
        } else {
          resolve({ user: { id: "123", email, name }, error: null });
        }
      }, 1500);
    });
  },

  async resetPassword(email: string): Promise<{ success: boolean; error: string | null }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!email.includes('@')) {
          resolve({ success: false, error: "Invalid email address." });
        } else {
          resolve({ success: true, error: null });
        }
      }, 1000);
    });
  }
};
