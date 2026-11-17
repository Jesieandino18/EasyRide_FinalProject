
const Navbar = ({
  menuOpen,
  setMenuOpen,
  goHome,
  goToSection,
}) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <a
          href="#home"
          className="brand"
          onClick={goHome}
        >
          <img
            src="/logo.png"
            alt="EasyRide Logo"
          />

          <div className="brand-text">
            <strong>EASYRIDE</strong>
            <span>Balayan UV Express</span>
          </div>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a
            href="#home"
            onClick={() => goToSection("home")}
          >
            Home
          </a>

          <a
            href="#about"
            onClick={() => goToSection("about")}
          >
            About
          </a>

          <a
            href="#routes"
            onClick={() => goToSection("routes")}
          >
            Routes
          </a>

          <a
            href="#contact"
            onClick={() => goToSection("contact")}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
