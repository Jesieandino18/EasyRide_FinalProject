
const Hero = ({ setAccessOpen }) => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="hero-label">
          PUV TERMINAL MANAGEMENT SYSTEM
        </span>

        <h1>
          Your Journey,
          <br />
          <span>Made Easier.</span>
        </h1>

        <p>
          A convenient way to check UV Express van availability
          and travel information from Balayan to Pasay.
        </p>

        <div className="hero-start-wrapper">
          <button
            className="hero-get-started"
            onClick={() => setAccessOpen(true)}
          >
            GET STARTED <span>→</span>
          </button>
        </div>

        <div className="hero-route">
          <span>Balayan</span>
          <span className="route-line">━━━━━━➜</span>
          <span>Pasay</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
