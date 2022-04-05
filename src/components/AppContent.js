import React, { lazy, Suspense } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../routes";
// routes config

export default function AppContent() {
  return (
    <Suspense fallback={<div>LOADING...</div>}>
      <Switch>
        {routes.map((route, idx) => {
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => (
                  <>
                    <route.component {...props} />
                  </>
                )}
              />
            )
          );
        })}
        <Redirect from="/home" to="/home/dashboard" />
      </Switch>
    </Suspense>
  );
}
