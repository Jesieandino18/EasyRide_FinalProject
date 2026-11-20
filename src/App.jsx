import { useEffect, useState } from "react";
import "./style.css";

import Navbar from "./Components/Home/Navbar";
import Hero from "./Components/Home/Hero";
import QuickInfo from "./Components/Home/QuickInfo";
import About from "./Components/Home/About";
import Features from "./Components/Home/Features";
import Routes from "./Components/Home/Routes";
import PassengerPreview from "./Components/Home/PassengerPreview";
import Contact from "./Components/Home/Contact";
import Footer from "./Components/Home/Footer";
import AccessModal from "./Components/Home/AccessModal";
import Mark_DriverPortal from "./Components/Driver/Mark_DriverPortal";

const getCurrentPage = () => {
  return window.location.hash === "#driver"
    ? "driverRegistration"
    : "home";
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(getCurrentPage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);

  const goHome = () => {
    window.location.hash = "home";
    setCurrentPage("home");
    setMenuOpen(false);
    setAccessOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openDriver = () => {
    window.location.hash = "driver";
    setCurrentPage("driverRegistration");
    setMenuOpen(false);
    setAccessOpen(false);
    window.scrollTo(0, 0);
  };

  const goToSection = (section) => {
    setCurrentPage("home");
    setMenuOpen(false);
    setAccessOpen(false);
    window.location.hash = section;

    setTimeout(() => {
      const target = document.getElementById(section);

      if (!target) return;

      const navbarHeight =
        document.querySelector(".navbar")?.offsetHeight || 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getCurrentPage());
      setMenuOpen(false);
      setAccessOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, []);

  if (currentPage === "driverRegistration") {
    return <Mark_DriverPortal onBack={goHome} />;
  }

  return (
    <div className="easyride-app">
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
        goToSection={goToSection}
      />

      <AccessModal
        accessOpen={accessOpen}
        setAccessOpen={setAccessOpen}
        openDriver={openDriver}
      />

      <Hero setAccessOpen={setAccessOpen} />

      <QuickInfo />
      <About />
      <Features />
      <Routes />
      <PassengerPreview />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;