import React from "react";
import { LoginScreen } from "./login-screen";
import { FeedScreen } from "./feed-screen";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./protected-route";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/login"} component={LoginScreen} />
        <ProtectedRoute path="/feed">
          <Route exact path={"/feed"} component={FeedScreen} />
        </ProtectedRoute>
        <Redirect to={"/feed"} />
      </Switch>
    </BrowserRouter>
  );
};
