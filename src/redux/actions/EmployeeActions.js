import axios from "axios";

export const CompanWorkers = (config) => (dispatch) => {
  return axios
    .get("/employee", config)
    .then((result) => {
      dispatch({
        type: "COMPANY_EMPLOYEES",
        payload: result.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const Login = (employeeLogin) => async (dispatch) => {
  await axios
    .post("/employee/login", employeeLogin)
    .then((result) => {
      const time = new Date(Date.now());
      dispatch({
        type: "LOGIN",
        payload: result.data,
        status: result.status,
        timeLogin: time
      });
    })
    .catch((err) => {
      const mute = err;
      dispatch({
        type: "ERRLOGIN",
        errLogin: true,
      });
    });
};

export const SignUp = (employeeSignUp) => async (dispatch) => {
  await axios
    .post("/employee/signup", employeeSignUp)
    .then((result) => {
      dispatch({
        type: "SIGNUP",
        payload: result.data,
        status: result.status,
      });
    })
    .catch((err) => {
      const mute = err;
      dispatch({
        type: "ERRSIGNUP",
        errSignUp: true,
      });
    });
};

export const SignUpToCompanyAction = (employeeSignUp, token) => async (dispatch) => {
  await axios
    .post(`/employee/signup/${token}`, employeeSignUp)
    .then((result) => {
      dispatch({
        type: "SIGNUP",
        payload: result.data,
        status: result.status,
      });
    })
    .catch((err) => {
      const mute = err;
      dispatch({
        type: "ERRSIGNUP",
        errSignUp: true,
      });
    });
};

export const Logout = (employeeToUpdate, config) => async (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};

export const notifications = (notif) => async (dispatch) => {
  dispatch({
    type: "NOTIFICATIONS_CHANGE",
    payload: notif
  });
};

export const ChangeSelectedChat = (chat) => async (dispatch) => {
  dispatch({
    type: "SELECTEDCHAT_CHANGE",
    payload: chat
  });
};

export const ChatFetcher = (config) => async (dispatch) => {
  await axios
    .get("/chat", config)
    .then((result) => {
      dispatch({
        type: "CHAT_FETCHER",
        payload: result.data,
      });
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

export const ChangeCheckPresence = (checkPresence) => dispatch => {
  dispatch({
    type: 'CHANGE_CHECK_PRESENCE',
    payload: checkPresence
  })
}

export const UpdateEmployee = (data,config) => async (dispatch) => {
  await axios
  .put("/employee/updateemployee",data,config)
  .then((result)=>{
    console.log(result.data)
    // dispatch({
    //   type: "UPDATE_EMPLOYEE",
    //   payload: result.data
    // });
  })
}
  // await axios
  //   .put(`/employee/updatehours`, employeeToUpdate.connectedEmployee, config)
  //   .then((result) => {
      //   })
  //   .catch((err) => {
  //     const mute = err;
  //   });