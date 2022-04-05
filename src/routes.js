import React from "react";

const Main = React.lazy(() => import("./components/main/Main"));
const Calendar = React.lazy(() => import("./components/calendar/Calendar"));
const Chat = React.lazy(() => import("./components/chat/Chat"));
const VideoCall = React.lazy(() => import("./components/videoCall/VideoCall"));
const Profile = React.lazy(() => import("./components/userProfile/Profile"));
const SignUpToCompany = React.lazy(() => import("./components/authentification/signUpToCompany/SignUpToCompany"));
const ResetPassword = React.lazy(() => import("./components/authentification/resetpassword/ResetPassword"));
const Employees = React.lazy(() => import("./components/employees/Employees"));
const ProjectPlanning = React.lazy(() =>
  import("./components/projectPlanning/ProjectPlanning")
);

const routes = [
  { path: "/", exact: true, name: "Login" },
  {path : "/signup/:token" , name:"signUp" , component: SignUpToCompany},
  {path : "/resetpassword/:token" , name:"resetPassword" , component: ResetPassword},
  { path: "/home/dashboard", name: "Dashboard", component: Main },
  { path: "/home/employees", name: "Employees", component: Employees },
  { path: "/Calendar", name: "Calendar", component: Calendar },
  { path: "/home/chat", name: "Chat", component: Chat },
  { path: "/home/videocall", name: "videoCall", component: VideoCall },
  { path: "/home/profile", name: "profile", component: Profile },
  {
    path: "/home/projectPlanning",
    name: "projectPlanning",
    component: ProjectPlanning,
  },
];

export default routes;
