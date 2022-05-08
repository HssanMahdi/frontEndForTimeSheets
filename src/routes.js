import React from "react";

const Main = React.lazy(() => import("./components/main/Main"));
const Calendar = React.lazy(() => import("./components/calendar/Calendar"));
const FileEdit = React.lazy(() => import("./components/fileEdit/FileEdit"));
const fileUploader = React.lazy(() => import("./components/fileUploader/fileUploader"));
const Chat = React.lazy(() => import("./components/chat/Chat"));
const VideoCall = React.lazy(() => import("./components/videoCall/VideoCall"));
const Salary = React.lazy(() => import("./components/Salary/Salary"));
const Add_popup = React.lazy(() => import("./components/Salary/Add_salary"));
const Payroll_items = React.lazy(() => import("./components/Salary/Payroll_items"));
const Overtime = React.lazy(() => import("./components/Salary/Overtime"));
const Deduction = React.lazy(() => import("./components/Salary/Deductions"));
const Add_addition = React.lazy(() => import("./components/Salary/Add_additions"));
const Add_overtime = React.lazy(() => import("./components/Salary/Add_overtime"));
const Add_deduction = React.lazy(() => import("./components/Salary/Add_deductions"));
const Holiday = React.lazy(() => import("./components/Holiday/Holidays"));
const Add_holiday = React.lazy(() => import("./components/Holiday/Add_holiday"));
const Profile = React.lazy(() => import("./components/userProfile/Profile"));
const SignUpToCompany = React.lazy(() => import("./components/authentification/signUpToCompany/SignUpToCompany"));
const ResetPassword = React.lazy(() => import("./components/authentification/resetpassword/ResetPassword"));
const Employees = React.lazy(() => import("./components/employees/Employees"));
const Project = React.lazy(() => import("./components/projectManagement/Project"));
const UpdateProject = React.lazy(() => import("./components/projectManagement/updateProject/UpdateProject"));
const DetailsProject = React.lazy(() => import("./components/projectManagement/detailsProject/DetailsProject"));
const SearchEmployees = React.lazy(() => import("./components/projectManagement/searchEmployeesComponent/searchEmployee"));
const rating = React.lazy(() => import("./components/projectManagement/rating"));
const cv=React.lazy(() => import("./components/projectManagement/Cv"));
const ProjectPlanning = React.lazy(() =>
  import("./components/projectPlanning/ProjectPlanning")
);
const GroupCall = React.lazy(() => import("./components/GroupVideoCall/Room"));
const MakeGroupCall = React.lazy(() =>
  import("./components/GroupVideoCall/CreateRoom")
);
const SearchGoogle = React.lazy(() =>
  import("./components/searchGoogle/SearchGoogle")
);
const EmpLeaves = React.lazy(() => import("./components/leaves/empLeaves"));
const AdminLeaves = React.lazy(() => import("./components/leaves/adminLeaves"));
const Add_leaves = React.lazy(() => import("./components/leaves/Forms/addLeave"));
const routes = [
  { path: "/", exact: true, name: "Login" },
  // {path : "/signup/:token" , name:"signUp" , component: SignUpToCompany},
  // {path : "/resetpassword/:token" , name:"resetPassword" , component: ResetPassword},
  { path: "/home/dashboard", name: "Dashboard", component: Main },
  { path: "/home/employees", name: "Employees", component: Employees },
  { path: "/home/Calendar", name: "Calendar", component: Calendar },
  { path: "/home/FileEdit/documents/:id", name: "FileEdit", component: FileEdit }, 
  { path: "/home/fileUploader", name: "fileUploader", component: fileUploader }, 
  { path: "/home/chat", name: "Chat", component: Chat },
  { path: "/home/search", name: "searchG", component: SearchGoogle },
  { path: "/home/videocall/:roomID", name: "videoCall", component: VideoCall },
  { path: "/home/profile", name: "profile", component: Profile },
{ path: '/home/employee_salary', name: 'employee_salary', component: Salary },
  { path: '/add_salary', name: 'add_salary',component: Add_popup  },
  { path: '/home/payroll_items', name: 'payroll_items',component: Payroll_items  },
  { path: '/home/overtime', name: 'overtime',component: Overtime  },
  { path: '/home/deductions', name: 'deductions',component: Deduction  },
  { path: '/add_addition', name: 'add_addition',component: Add_addition },
  { path: '/add_overtime', name: 'add_overtime',component: Add_overtime  },
  { path: '/add_deduction', name: 'add_deduction',component: Add_deduction  },
  { path: '/home/holidays', name: 'holidays',component: Holiday  },
  { path: '/add_holiday', name: 'add_holiday',component: Add_holiday  },
  { path: '/home/emp_leaves', name: 'emp_leaves',component: EmpLeaves  },
  { path: '/home/admin_leaves', name: 'admin_leaves',component: AdminLeaves  },
  { path: '/add_leaves', name: 'add_leaves',component:Add_leaves  },
  {
    path: "/home/projectPlanning",
    name: "projectPlanning",
    component: ProjectPlanning,
  },
  {
    path: "/home/makecall/:roomID",
    name: "groupcallId",
    component: GroupCall,
  },
  {
    path: "/home/projectPlanning",
    name: "projectPlanning",
    component: ProjectPlanning,
  },
  { path:"/Project", name:'project' ,component:Project},
  { path:"/updateProject", name:'updateProject' ,component:UpdateProject},
  { path:"/detailsProject", name:'detailsProject' ,component:DetailsProject},
  { path:"/searchEmployees", name:'searchEmployees' ,component:SearchEmployees},
  { path:"/rating", name:'rating' ,component:rating},
  { path:"/cv", name:'cv' ,component:cv}
];

export default routes;
