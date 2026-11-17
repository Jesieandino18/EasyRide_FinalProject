
const AccessModal = ({
  accessOpen,
  setAccessOpen,

}) => {
  if (!accessOpen) return null;

  const closeModal = () => {
    setAccessOpen(false);
  };

  return (
    <div
      className="access-modal-backdrop"
      onClick={closeModal}
    >
      <div
        className="access-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="access-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="access-modal-close"
          onClick={closeModal}
          aria-label="Close"
        >
          ×
        </button>

        <div className="modal-heading">
          <span className="modal-label">
            WELCOME TO EASYRIDE
          </span>

          <h2 id="access-modal-title">
            Choose Your Access
          </h2>

          <p className="modal-description">
            Select your role to continue.
          </p>
        </div>

        <div className="access-cards modal-access-cards">
          {/* PASSENGER */}
          <article className="access-card disabled-access-card">
            <img
              className="access-card-image"
              src="/images/passenger.png"
              alt="Passenger inside a van"
            />

            <div className="access-card-overlay"></div>

            <div className="access-card-content">
              <span className="card-role">
                FOR TRAVELERS
              </span>

              <h3>Passenger</h3>

              <p>
                View van availability, available seats,
                and travel information.
              </p>

              <span className="card-link disabled-card-link">
                Continue as Passenger →
              </span>
            </div>
          </article>

          {/* DRIVER */}
          <article className="access-card disabled-access-card">
            <img
              className="access-card-image"
              src="/images/driver.png"
              alt="UV Express driver"
            />

            <div className="access-card-overlay"></div>

            <div className="access-card-content">
              <span className="card-role">
                FOR DRIVERS
              </span>

              <h3>Driver</h3>

              <p>
                Log in or create your driver account
                to access your dashboard.
              </p>

              <button
                type="button"
                className="card-link"
                disabled
              >
                Continue as Driver →
              </button>
            </div>
          </article>

          {/* DISPATCHER */}
          <article className="access-card disabled-access-card">
            <img
              className="access-card-image"
              src="/images/dispatcher.png"
              alt="UV Express van at terminal"
            />

            <div className="access-card-overlay"></div>

            <div className="access-card-content">
              <span className="card-role">
                FOR TERMINAL STAFF
              </span>

              <h3>Dispatcher</h3>

              <p>
                Manage vehicle information and
                terminal operations.
              </p>

              <span className="card-link disabled-card-link">
                Continue as Dispatcher →
              </span>
            </div>
          </article>
        </div>

        <p className="modal-note">
          Role access will be available in a future update.
        </p>
      </div>
    </div>
  );
};

export default AccessModal;

