import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUserLoading } from "../redux/slices/user.slice";
import useAuthGuard from "../hooks/useAuth";
import { Skeleton } from ".";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectUserLoading);
  const { checkedSession } = useAuthGuard();

  if (!checkedSession || loading) {
    return <Skeleton/>;
  }

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default PublicRoute;
