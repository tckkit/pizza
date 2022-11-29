import axios from "axios";

export const LOGIN_CAMPUS_SUCCESS_ACTION = "LOGIN_CAMPUS_SUCCESS_ACTION";
export const LOGIN_FAMILY_SUCCESS_ACTION = "LOGIN_FAMILY_SUCCESS_ACTION";
export const LOGIN_FAILURE_ACTION = "LOGIN_FAILURE_ACTION";
export const LOGOUT_NOW_ACTION = "LOGOUT_NOW_ACTION";

//Action creators
export const loginCampusSuccessAction = () => {
  return {
    type: LOGIN_CAMPUS_SUCCESS_ACTION,
  };
};

export const loginFamilySuccessAction = () => {
  return {
    type: LOGIN_FAMILY_SUCCESS_ACTION,
    message: "Sign up successful, thank you!",
  };
};

export const loginFailureAction = (message) => {
  return {
    type: LOGIN_FAILURE_ACTION,
    message: message,
  };
};

export const logoutNowAction = () => {
  return {
    type: LOGOUT_NOW_ACTION,
  };
};

//Thunk action
//=============
export const signUpFamilyThunk = (email, password, firstName, lastName) => {
  return async (dispatch) => {
    try {
      const body = {
        fristName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      console.log(body, "requestBody");
      const { data } = await axios.post(
        `http://localhost:5000/Member/New`,
        body
      );
      //if successful, data = {token: token}
      //wrong pw, data = {message: 'Wrong pw'}
      if (data == null) {
        dispatch(loginFailureAction("Unknown error"));
      } else {
        console.log("successful family sign up");
        dispatch(loginFamilySuccessAction());
      }
    } catch (err) {
      console.log(err, "thissss");
    }
  };
};

// Get account details (firstName, lastName)
const getAccountInfo = async (accountId) => {
  if (accountId) {
    axios
      .get(`http://localhost:5000/Member/Pofile/${accountId}`)
      .then((res) => {
        const data = res.data;
        localStorage.setItem("accountFname", data.fristName);
        localStorage.setItem("accountLname", data.lastName);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Login handle here
export const loginFamilyThunk = (email, password) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/Member/Login`, {
        email: email,
        password: password,
      });

      getAccountInfo(data.id);

      localStorage.setItem("isLogin", true);
      localStorage.setItem("accountId", data.id);

      if (data["isAdmin"]) {
        dispatch(loginCampusSuccessAction());
        return console.log("Success login as Admin");
      }
      dispatch(loginFamilySuccessAction());
      return console.log("Success login as Family");
    } catch (err) {
      console.log(err);
    }
  };
};

// Logout handle here
export const logoutNowThunk = () => {
  return (dispatch) => {
    localStorage.setItem("isLogin", false);
    localStorage.setItem("accountId", "");
    localStorage.setItem("accountFname", "");
    localStorage.setItem("accountLname", "");
    window.location.reload();
    dispatch(logoutNowAction());
  };
};
