const initialState = {
  connectedEmployee: {},
  companyEmployees: [],
  token: "",
  chats: [],
  todaysWorkedHours: 0,
  totalWorkedHours: 0,
  overTimeHours: 0,
  status: "",
  errLogin: false,
  errSignUp: false,
  timeLogin: "",
  longLatLogin: {},
  socket: "",
  notification: [],
  selectedChat: {},
  taskNow: {},
  checkPresence: []
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        connectedEmployee: action.payload.employee1,
        token: action.payload.token,
        status: action.status,
        errLogin: false,
        timeLogin: action.timeLogin,
      };
    case "COMPANY_EMPLOYEES":
      return {
        ...state,
        companyEmployees: action.payload,
      };
    case "CHAT_FETCHER":
      return {
        ...state,
        chats: action.payload,
      };
    case "ERRLOGIN":
      return {
        ...state,
        errLogin: action.errLogin,
      };
    case "ERRSIGNUP":
      return {
        ...state,
        errSignUp: action.errSignUp,
      };
    case "SIGNUP":
      return {
        ...state,
        connectedEmployee: action.payload.newEmployee,
        token: action.payload.token,
        status: action.status,
        errSignUp: false,
      };
    case "LOGOUT":
      return {
        connectedEmployee: {},
        companyEmployees: [],
        token: "",
        chats: [],
        todaysWorkedHours: 0,
        totalWorkedHours: 0,
        overTimeHours: 0,
        status: "",
        errLogin: false,
        errSignUp: false,
        timeLogin: "",
        longLatLogin: {},
        socket: "",
        notification: [],
        selectedChat: {},
        taskNow: {},
        checkPresence: []
      };
    case "LOCATION":
      return {
        ...state,
        longLatLogin: action.payload
      };
    case "SOCKET":
      return {
        ...state,
        socket: action.payload
      };
    case "TASKNOW":
      return {
        ...state,
        taskNow: action.payload
      };
    case 'CHANGE_CHECK_PRESENCE':
      return {
        ...state,
        checkPresence: action.payload
      }
    case "NOTIFICATIONS_CHANGE":
      return {
        ...state,
        notification: action.payload
      };
    case "SELECTEDCHAT_CHANGE":
      return {
        ...state,
        selectedChat: action.payload
      };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        connectedEmployee: action.payload
      };
    default:
      return state;
  }
}
