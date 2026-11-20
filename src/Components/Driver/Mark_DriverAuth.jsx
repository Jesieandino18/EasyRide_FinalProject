import { useState } from "react";

const initialForm = {
  full_name: "",
  address: "",
  contact_number: "",
  plate_number: "",
  username: "",
  password: "",
};

const registrationFields = [
  {
    name: "full_name",
    label: "Full Name",
    type: "text",
    maxLength: 150,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    maxLength: 255,
  },
  {
    name: "contact_number",
    label: "Contact Number",
    type: "tel",
    maxLength: 20,
  },
  {
    name: "plate_number",
    label: "Plate Number",
    type: "text",
    maxLength: 30,
  },
  {
    name: "username",
    label: "Username",
    type: "text",
    maxLength: 100,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    maxLength: 64,
  },
];

const Mark_DriverAuth = ({ onBack }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const driverData = {
      full_name: form.full_name.trim(),
      address: form.address.trim(),
      contact_number: form.contact_number.trim(),
      plate_number: form.plate_number.trim().toUpperCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
    };

    setError("");
    setMessage("");

    if (Object.values(driverData).some((value) => !value)) {
      setError("Please complete all required fields.");
      return;
    }

    if (
      driverData.password.length < 8 ||
      driverData.password.length > 64
    ) {
      setError("Password must be 8 to 64 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/driver/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driverData),
      });

      const result = await response.json().catch(() => null);

      if (!result || typeof result.message !== "string") {
        throw new Error(
          "Invalid server response. Check the backend and Vite proxy."
        );
      }

      if (!response.ok) {
        throw new Error(result.message);
      }

      setForm({ ...initialForm });
      setMessage("Driver registered successfully!");
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? "Cannot connect to the server. Please try again."
          : requestError.message || "Unable to register."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="driver-auth-page">
      <div className="driver-auth-card">
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
          <p>Driver and Vehicle Registration</p>
        </header>

        <form onSubmit={handleRegister}>
          <h2>Register as Driver</h2>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          {message && (
            <p className="auth-success" role="status">
              {message}
            </p>
          )}

          {registrationFields.map((field) => (
            <div className="auth-field" key={field.name}>
              <label htmlFor={`driver-${field.name}`}>
                {field.label}
              </label>

              <input
                id={`driver-${field.name}`}
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
                maxLength={field.maxLength}
                minLength={field.name === "password" ? 8 : undefined}
                autoComplete={
                  field.name === "password"
                    ? "new-password"
                    : field.name === "username"
                      ? "username"
                      : undefined
                }
                disabled={loading}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register as Driver"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Mark_DriverAuth;