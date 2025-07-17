import { Navigate } from "react-router-dom";
import {useUser} from "../context/userContext"

const PublicRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default PublicRoute;
