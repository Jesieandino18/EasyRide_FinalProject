
const Features = () => {
  return (
    <section className="features-section" id="features">
      <div className="section-heading">
        <span>WHAT EASYRIDE OFFERS</span>

        <h2>Designed for Better Terminal Operations</h2>

        <p>
          A centralized system that helps organize vehicle,
          driver, and passenger travel information.
        </p>
      </div>

      <div className="features-grid">
        <article className="feature-card">
          <div className="feature-icon">🚐</div>

          <h3>Vehicle Information</h3>

          <p>
            Organize vehicle details, seating capacity,
            and availability status.
          </p>

          <span>01</span>
        </article>

        <article className="feature-card">
          <div className="feature-icon">👨‍✈️</div>

          <h3>Driver Coordination</h3>

          <p>
            Provide drivers with access to their accounts
            and vehicle status updates.
          </p>

          <span>02</span>
        </article>

        <article className="feature-card">
          <div className="feature-icon">📋</div>

          <h3>Passenger Information</h3>

          <p>
            Present van availability, available seats,
            and travel information for passengers.
          </p>

          <span>03</span>
        </article>
      </div>
    </section>
  );
};

export default Features;
