
const Routes = () => {
  return (
    <section className="routes-section" id="routes">
      <div className="section-heading">
        <span>OUR ROUTE</span>

        <h2>Balayan to Pasay</h2>

        <p>
          EasyRide provides travel information for the
          Balayan UV Express route going to Pasay via CALAX.
        </p>
      </div>

      <div className="route-card">
        <div className="route-point">
          <span className="route-dot"></span>

          <div>
            <small>ORIGIN</small>

            <h3>Balayan, Batangas</h3>

            <p>UV Express Terminal</p>
          </div>
        </div>

        <div className="route-connector"></div>

        <div className="route-point">
          <span className="route-dot destination"></span>

          <div>
            <small>DESTINATION</small>

            <h3>Pasay</h3>

            <p>Via CALAX</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Routes;
