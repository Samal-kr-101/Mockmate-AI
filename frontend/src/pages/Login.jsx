import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  setLoading(true);

  try {
    toast.info("Logging you in...");

    const res = await loginUser({ email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));

    toast.success("Welcome back 👋");

    navigate("/dashboard");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login failed. Try again."
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">Welcome back to MockMate AI</h1>

        <p className="auth-subtitle">
          Continue your interview practice and level up your confidence.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <input
            className="auth-input"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="auth-password-box">

            <input
              className="auth-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="auth-show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          <div className="auth-options">
            <label className="auth-remember">
              <input type="checkbox" />
              Remember Me
            </label>

            <span
              className="auth-forgot"
              onClick={() =>
                toast.info("Forgot Password feature coming soon!")
              }
            >
              Forgot Password?
            </span>
          </div>

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <div className="auth-divider">OR</div>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link className="auth-link" to="/register">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}




// import { useState } from "react";
// import { loginUser } from "../services/authService";
// import { useNavigate, Link } from "react-router-dom";
// import "./Login.css";
// import { toast } from "react-toastify";

// // 🔥 Firebase imports
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ✅ EMAIL / PASSWORD LOGIN (your backend)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (loading) return;

//     setLoading(true);

//     try {
//       toast.info("Logging you in...");

//       const res = await loginUser({ email, password });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data));

//       toast.success("Welcome back 👋");

//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Login failed. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔵 GOOGLE LOGIN (Firebase)
// const handleGoogleLogin = async () => {
//   if (loading) return;

//   try {
//     setLoading(true);
//     toast.info("Signing in with Google...");

//     const result = await signInWithPopup(auth, googleProvider);
//     const user = result.user;

//     // 🚨 IMPORTANT: create SAME structure as backend login
//     const userData = {
//       id: user.uid,
//       name: user.displayName,
//       email: user.email,
//       photo: user.photoURL,
//       provider: "google",

//       // ⚠️ IMPORTANT: fake token placeholder (for consistency)
//       token: "google-auth"
//     };

//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", "google-auth");

//     toast.success("Google login successful 🎉");

//     navigate("/dashboard", { replace: true });

//   } catch (error) {
//     console.log(error);
//     toast.error("Google login failed");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">

//         <h1 className="auth-title">
//           Welcome back to MockMate AI
//         </h1>

//         <p className="auth-subtitle">
//           Continue your interview practice and level up your confidence.
//         </p>

//         {/* EMAIL LOGIN FORM */}
//         <form className="auth-form" onSubmit={handleSubmit}>

//           <input
//             className="auth-input"
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <div className="auth-password-box">

//             <input
//               className="auth-input"
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <button
//               type="button"
//               className="auth-show-btn"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </button>

//           </div>

//           <div className="auth-options">

//             <label className="auth-remember">
//               <input type="checkbox" />
//               Remember Me
//             </label>

//             <span
//               className="auth-forgot"
//               onClick={() =>
//                 alert("Forgot Password feature coming soon!")
//               }
//             >
//               Forgot Password?
//             </span>

//           </div>

//           <button
//             className="auth-button"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>

//         </form>

//         {/* DIVIDER */}
//         <div className="auth-divider">OR</div>

//         {/* GOOGLE LOGIN BUTTON */}
//         <button
//           type="button"
//           className="auth-button google-btn"
//           onClick={handleGoogleLogin}
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Continue with Google"}
//         </button>

//         {/* FOOTER */}
//         <p className="auth-footer">
//           Don't have an account?{" "}
//           <Link className="auth-link" to="/register">
//             Create account
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }