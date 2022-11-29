import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginFamilyThunk } from "../Redux/auth/actions";
import { useNavigate } from "react-router-dom";

export const LoginFormFamily = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authRole = useSelector((state) => state.authStore.authRole);
  const message = useSelector((state) => state.authStore.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (e) => {
    console.log("normal login");
    e.preventDefault();
    dispatch(loginFamilyThunk(email, password));
  };

  // When authRole is changed,
  useEffect(() => {
    if (authRole !== "") {
      navigate("/menu");
    }
  }, [authRole]);

  return (
    <>
      <div className="login wf-section loginSection">
        <div className="form-block w-form">
          <h3 className="form-heading">Login</h3>
          <form
            id="email-form"
            name="email-form"
            data-name="Email Form"
            method="get"
            className="form loginFormAr"
          >
            <label className="form-label">Email</label>
            <input
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
              type="email"
              className="w-input"
              maxlength="256"
              name="Email"
              data-name="Email"
              id="Email-2"
            />
            <label className="form-label">Password</label>
            <input
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
              type="password"
              className="w-input"
              maxlength="256"
              name="Password"
              data-name="Password"
              id="Password"
              required=""
            />
            <input
              onClick={login}
              type="submit"
              value="Login"
              data-wait="Please wait..."
              className="button login w-button"
            />
          </form>
          <div className="sign-up-msg">
            {authRole != "" ? null : (
              <h5 className="login-fail-msg text-center">{message}</h5>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

