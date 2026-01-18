import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SessionWatcher() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Date.now() / 1000;

        if (payload.exp < now) {
          localStorage.removeItem("token");
          alert("Session expired. Please login again.");
          navigate("/");
        }
      } catch {
        localStorage.removeItem("token");
        navigate("/");
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [navigate]);

  return null; // 👈 no UI
}

export default SessionWatcher;
