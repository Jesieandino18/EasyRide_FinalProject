
const PassengerPreview = () => {
  return (
    <section className="passenger-section" id="passenger">
      <div className="section-heading">
        <span>FOR PASSENGERS</span>

        <h2>Travel Information at a Glance</h2>

        <p>
          Passenger information can be viewed once vehicle
          details have been entered and updated by the dispatcher.
        </p>
      </div>

      <div className="passenger-preview">
        <div className="preview-heading">
          <div>
            <span>PASSENGER INFORMATION</span>
            <h3>Van Status Overview</h3>
          </div>

          <span className="preview-badge">
            SAMPLE DISPLAY
          </span>
        </div>

        <div className="preview-table">
          <div className="preview-row preview-table-heading">
            <span>Vehicle</span>
            <span>Available Seats</span>
            <span>Current Status</span>
          </div>

          <div className="preview-row">
            <strong>Van 01</strong>
            <span>—</span>
            <span className="preview-empty">
              No data yet
            </span>
          </div>

          <div className="preview-row">
            <strong>Van 02</strong>
            <span>—</span>
            <span className="preview-empty">
              No data yet
            </span>
          </div>
        </div>

        <p className="preview-note">
          This is a sample layout only. Actual vehicle information
          will appear when records are available in the system.
        </p>
      </div>
    </section>
  );
};

export default PassengerPreview;
