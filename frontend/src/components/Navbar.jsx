import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();

  // safe parsing (prevents crash if null)
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
  const toastId = toast.info(
    ({ closeToast }) => (
      <div>
        <p>Are you sure you want to logout?</p>

        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");

              toast.success("Logged out successfully 👋");
              closeToast();

              navigate("/");
            }}
            style={{
              background: "red",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Yes
          </button>

          <button
            onClick={closeToast}
            style={{
              background: "#444",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
    }
  );
};

  return (
    <nav className="navbar">
      {/* LEFT SIDE */}
      <div className="nav-left">
  <img src={logo} alt="logo" className="logo-img" />
  <span className="logo-text">MockMate AI</span>
</div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        <span className="username">
          {user?.name || "User"}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}