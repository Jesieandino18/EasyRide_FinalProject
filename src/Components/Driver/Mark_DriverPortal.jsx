import { useEffect, useState } from "react";
import Mark_DriverAuth from "./Mark_DriverAuth";

const readResponse = async (response) => {
  const result = await response.json().catch(() => null);

  if (!result) {
    throw new Error(
      "Invalid server response. Check the backend and Vite proxy."
    );
  }

  if (!response.ok) {
    throw new Error(result.message || "Request failed.");
  }

  return result;
};

const Mark_DriverPortal = ({ onBack }) => {
  const [driver, setDriver] = useState(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const restoreSession = async () => {
      try {
        const response = await fetch("/driver/session", {
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });

        if (response.status === 401) return;

        const result = await readResponse(response);

        if (!result.driver?.id) {
          throw new Error("Driver profile is missing.");
        }

        if (!controller.signal.aborted) {
          setDriver(result.driver);
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setChecking(false);
        }
      }
    };

    restoreSession();

    return () => controller.abort();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/driver/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-EasyRide-Request": "1",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      await readResponse(response);

      const sessionResponse = await fetch("/driver/session", {
        credentials: "include",
        cache: "no-store",
      });

      const result = await readResponse(sessionResponse);

      if (!result.driver?.id) {
        throw new Error("Driver profile is missing.");
      }

      setDriver(result.driver);
      setPassword("");
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? "Cannot connect to the backend."
          : requestError.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/driver/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-EasyRide-Request": "1",
        },
      });

      await readResponse(response);

      setDriver(null);
      setUsername("");
      setPassword("");
    } catch (requestError) {
      setError(requestError.message || "Unable to log out.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <main className="driver-auth-page">
        <div className="driver-auth-card">
          <p role="status">Checking driver session...</p>
        </div>
      </main>
    );
  }

  if (driver) {
    return (
      <main className="driver-auth-page">
        <section className="driver-auth-card">
          <header className="auth-header">
            <h1>EASYRIDE</h1>
            <p>Driver Dashboard</p>
          </header>

          <h2>Welcome, {driver.full_name}!</h2>

          <dl className="driver-profile-details">
            <dt>Plate Number</dt>
            <dd>{driver.plate_number}</dd>

            <dt>Username</dt>
            <dd>{driver.username}</dd>

            <dt>Address</dt>
            <dd>{driver.address}</dd>

            <dt>Contact Number</dt>
            <dd>{driver.contact_number}</dd>
          </dl>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            className="auth-submit"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </section>
      </main>
    );
  }

  if (registerOpen) {
    return (
      <Mark_DriverAuth
        onBack={() => setRegisterOpen(false)}
      />
    );
  }

  return (
    <main className="driver-auth-page">
      <section className="driver-auth-card">
        <button
          type="button"
          className="auth-back"
          onClick={onBack}
          disabled={loading}
        >
          Back to Home
        </button>

        <header className="auth-header">
          <h1>EASYRIDE</h1>
          <p>Driver Login</p>
        </header>

        <form onSubmit={handleLogin}>
          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <div className="auth-field">
            <label htmlFor="driver-login-username">
              Username
            </label>

            <input
              id="driver-login-username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              maxLength={100}
              disabled={loading}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="driver-login-password">
              Password
            </label>

            <input
              id="driver-login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login as Driver"}
          </button>
        </form>

        <button
          type="button"
          className="auth-back driver-register-link"
          onClick={() => {
            setError("");
            setRegisterOpen(true);
          }}
          disabled={loading}
        >
          Create Driver Account
        </button>
      </section>
    </main>
  );
};

export default Mark_DriverPortal;