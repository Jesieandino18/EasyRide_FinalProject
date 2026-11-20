import { useEffect, useState } from "react";

const readArrivalResponse = async (response) => {
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

const formatArrivalTime = (value) => {
  if (!value) return "Not yet confirmed";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "Unavailable"
    : date.toLocaleString();
};

const Mark_DriverArrival = () => {
  const [arrival, setArrival] = useState(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadArrival = async () => {
      try {
        const response = await fetch(
          "/driver/arrival-request",
          {
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        const result = await readArrivalResponse(response);

        if (!controller.signal.aborted) {
          setArrival(result.arrival);
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadArrival();

    return () => controller.abort();
  }, []);

  const refreshStatus = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "/driver/arrival-request",
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const result = await readArrivalResponse(response);
      setArrival(result.arrival);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (requestType) => {
    setAction(requestType);
    setError("");
    setMessage("");

    const endpoint =
      requestType === "submit"
        ? "/driver/arrival-request"
        : "/driver/arrival-check";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-EasyRide-Request": "1",
        },
      });

      const result = await readArrivalResponse(response);

      if (requestType === "submit") {
        setArrival(result.arrival);
      }

      setMessage(result.message);
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? "Cannot connect to the backend."
          : requestError.message
      );
    } finally {
      setAction("");
    }
  };

  const busy = loading || action !== "";

  return (
    <section className="driver-location-panel">
      <h2>Terminal Arrival Request</h2>

      <p>
        Open GPS Location, start sharing, and wait for a
        successful update before submitting your request.
      </p>

      {loading && (
        <p role="status">Loading arrival status...</p>
      )}

      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}

      {message && (
        <p role="status">{message}</p>
      )}

      {arrival ? (
        <div>
          <dl className="driver-profile-details">
            <dt>Request Number</dt>
            <dd>{arrival.id}</dd>

            <dt>Status</dt>
            <dd>{arrival.status}</dd>

            <dt>Requested At</dt>
            <dd>
              {formatArrivalTime(arrival.requested_at)}
            </dd>

            <dt>Confirmed At</dt>
            <dd>
              {formatArrivalTime(arrival.confirmed_at)}
            </dd>
          </dl>

          {arrival.status === "pending" && (
            <p>
              Waiting for dispatcher confirmation.
              No queue number has been assigned yet.
            </p>
          )}
        </div>
      ) : (
        !loading && <p>No arrival request yet.</p>
      )}

      <div className="driver-arrival-actions">
        <button
          type="button"
          className="auth-back"
          onClick={() => handleRequest("check")}
          disabled={busy}
        >
          {action === "check"
            ? "Checking..."
            : "Check Terminal Location"}
        </button>

        <button
          type="button"
          className="auth-submit"
          onClick={() => handleRequest("submit")}
          disabled={busy || Boolean(arrival?.is_active)}
        >
          {action === "submit"
            ? "Submitting..."
            : arrival?.is_active
              ? "Arrival Request Active"
              : "Submit Arrival Request"}
        </button>

        <button
          type="button"
          className="auth-back"
          onClick={refreshStatus}
          disabled={busy}
        >
          Refresh Status
        </button>
      </div>

      <p>
        Submitting a request does not automatically confirm
        arrival or assign a queue number.
      </p>
    </section>
  );
};

export default Mark_DriverArrival;