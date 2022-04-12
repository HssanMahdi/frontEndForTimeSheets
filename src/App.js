import React from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import ResetPassword from "./components/authentification/resetpassword/ResetPassword";

export default function App() {
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );
  const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
  const Login = React.lazy(() =>
    import("./components/authentification/Authentification")
  );
  const SignUpToCompany = React.lazy(() =>
    import("./components/authentification/signUpToCompany/SignUpToCompany")
  );
  const ForgetPassword = React.lazy(() =>
    import("./components/authentification/forgetpassword/ForgetPassword")
  );
  const ResetPassword = React.lazy(() =>
    import("./components/authentification/resetpassword/ResetPassword")
  );
  const Employees = React.lazy(() =>
    import("./components/employees/Employees")
  );
  const VideoChat = React.lazy(() =>
    import("./components/videoCall/VideoCall")
  );
  const Test = React.lazy(() => import("./components/test/Test"));
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/"
            name="Login"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/forgetpassword"
            name="forgetPassword"
            render={(props) => <ForgetPassword {...props} />}
          />
          <Route
            exact
            path="/resetpassword"
            name="resetPassword"
            render={(props) => <ResetPassword {...props} />}
          />
          <Route
            exact
            path="/signup/:token"
            name="signuptocompany"
            render={(props) => <SignUpToCompany {...props} />}
          />
          <Route
            path="/home"
            name="Home"
            render={(props) => <DefaultLayout {...props} />}
          />
          <Route
            path="/employees"
            name="employees"
            render={(props) => <Employees {...props} />}
          />
          <Route
            path="/videocall"
            name="VideoCall"
            render={(props) => <VideoChat {...props} />}
          />
          <Route
            path="/test"
            name="test"
            render={(props) => <Test {...props} />}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}
