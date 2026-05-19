import {
  Navigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

const ProtectedRoute = ({
  children
}: {
  children: React.ReactNode;
}) => {

  const {
    token
  } = useAuth();

  // NOT LOGGED IN
  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // LOGGED IN
  return <>{children}</>;
};

export default ProtectedRoute;