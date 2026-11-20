import { useEffect, useState } from "react";

const Mark_DriverLocation = () => {
  const [sharing, setSharing] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Location sharing is stopped.");

  useEffect(() => {
    const controller = new AbortController();

    const loadLocation = async () => {
      try {
        const response = await fetch("/driver/location", {
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Unable to load location.");
        }

        if (!controller.signal.aborted) {
          setLocation(result.location);
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError("Unable to load the last saved location.");
        }
      }
    };

    loadLocation();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!sharing) return;

    let cancelled = false;
    let timer;
    const controller = new AbortController();

    const scheduleNext = () => {
      if (!cancelled) {
        timer = window.setTimeout(updateLocation, 30000);
      }
    };

    const updateLocation = () => {
      if (cancelled) return;

      setStatus("Getting device location...");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (cancelled) return;

          try {
            setStatus("Saving location...");

            const response = await fetch("/driver/location", {
              method: "POST",
              credentials: "include",
              signal: controller.signal,
              headers: {
                "Content-Type": "application/json",
                "X-EasyRide-Request": "1",
              },
              body: JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
              }),
            });

            const result = await response.json();

            if (!response.ok) {
              if (response.status === 401 && !cancelled) {
                setSharing(false);
              }

              throw new Error(
                result.message || "Unable to save location."
              );
            }

            if (!result.location) {
              throw new Error("Saved location was not returned.");
            }

            if (!cancelled) {
              setLocation(result.location);
              setError("");
              setStatus("Location saved. Waiting for the next update.");
            }
          } catch (requestError) {
            if (!cancelled) {
              setError(
                requestError.message || "Unable to update location."
              );
              setStatus("Location update failed.");
            }
          } finally {
            scheduleNext();
          }
        },
        (gpsError) => {
          if (cancelled) return;

          const message =
            gpsError.code === 1
              ? "Location permission denied. Allow location access to continue."
              : gpsError.code === 2
                ? "Device location is unavailable."
                : "Location request timed out. Please try again.";

          setError(message);
          setStatus("Location update failed.");

          if (gpsError.code === 1) {
            setSharing(false);
          } else {
            scheduleNext();
          }
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 20000,
        }
      );
    };

    updateLocation();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [sharing]);

  const startSharing = () => {
    setError("");

    if (!window.isSecureContext) {
      setError("Location access requires HTTPS or localhost.");
      return;
    }

    if (!navigator.geolocation) {
      setError("This browser does not support location access.");
      return;
    }

    setSharing(true);
  };

  const stopSharing = () => {
    setSharing(false);
    setStatus("Location sharing is stopped.");
  };

  return (
    <section className="driver-location-panel">
      <h2>GPS Location Information</h2>

      <p>
        Share your device location while this Driver page is open.
        Updates are requested approximately every 30 seconds.
      </p>

      <p role="status">
        {sharing ? status : "Location sharing is stopped."}
      </p>

      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}

      {location ? (
        <dl className="driver-profile-details">
          <dt>Last Saved Latitude</dt>
          <dd>{Number(location.latitude).toFixed(7)}</dd>

          <dt>Last Saved Longitude</dt>
          <dd>{Number(location.longitude).toFixed(7)}</dd>

          <dt>Reported Accuracy</dt>
          <dd>{Math.round(location.accuracy)} meters</dd>

          <dt>Last Successful Update</dt>
          <dd>
            {new Date(location.recorded_at).toLocaleString()}
          </dd>
        </dl>
      ) : (
        <p>No saved location yet.</p>
      )}

      <button
        type="button"
        className="auth-submit"
        onClick={sharing ? stopSharing : startSharing}
      >
        {sharing
          ? "Stop Location Sharing"
          : "Start Location Sharing"}
      </button>

      <p>
        A saved location does not confirm terminal arrival.
        Sharing stops when you leave this page or log out.
      </p>
    </section>
  );
};

export default Mark_DriverLocation;