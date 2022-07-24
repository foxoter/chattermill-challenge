import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../services/auth";

type Props = {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
};

const ProtectedRoute: React.FC<Props> = ({ children, ...rest }) => {
  const auth = useAuth();

  useEffect(() => {
    auth?.checkAuth();
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth?.user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default React.memo(ProtectedRoute);
