import "./index.css";
import "./App.css";
import Aos from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/src/collapse.js";
import NavbarDesktop from "./Components/NavbarDesktop";
import NavbarResponsive from "./Components/NavBarResponsive";
import NavbarMobile from "./Components/NavbarMobile";

function App() {
  Aos.init();
  return (
    <div>
      {/* Les 2 navbar fixe top */}
      <NavbarMobile />
      <NavbarDesktop />

      {/* navbar version mobile */}
      <NavbarResponsive />
    </div>
  );
}

export default App;
