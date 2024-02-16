import background from "../assets/background.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div>
        <Link to="/">
          <img
            style={{ width: "100vw" }}
            src={background}
            className="logo"
            alt="Tuga Voice Logo"
          />
        </Link>
      </div>
    </>
  );
}

export default Header;
