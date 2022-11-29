import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutNowThunk,
  signUpFamilyThunk,
  loginFailureAction,
} from "../Redux/auth/actions";
import { useNavigate } from "react-router-dom";

export const SignupFormFamily = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const authRole = useSelector((state) => state.authStore.authRole);
  const message = useSelector((state) => state.authStore.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      dispatch(
        loginFailureAction("Please input the same password for confirmation")
      );
    } else {
      dispatch(signUpFamilyThunk(email, password, firstName, lastName));
      console.log("family sign up");
    }
  };

  // When authRole is changed,
  useEffect(() => {
    if (authRole == "family") {
      setTimeout(() => {
        dispatch(logoutNowThunk());
        navigate("/login");
      }, 2000);
    }
  }, [authRole]);

  return (
    <>
      <div className="signup wf-section loginSection">
        <div className="form-block signup w-form">
          <h3 className="form-heading">Sign Up</h3>
          <form
            id="email-form"
            name="email-form"
            data-name="Email Form"
            method="get"
            className="form"
          >
            <div className="form-wrapper">
              <div className="input-wrapper">
                <label htmlFor="Password-Confirmation" className="form-label">
                  First Name
                </label>
                <input
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                  value={firstName}
                  className="half-text-field w-input"
                  maxLength="256"
                  name="Password-Confirmation"
                  data-name="Password Confirmation"
                  placeholder=""
                  id="Password-Confirmation"
                  required=""
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="Password-3" className="form-label">
                  Last Name
                </label>
                <input
                  onChange={(e) => setLastName(e.currentTarget.value)}
                  value={lastName}
                  className="half-text-field w-input"
                  maxLength="256"
                  name="Password-2"
                  data-name="Password 2"
                  placeholder=""
                  id="Password-2"
                  required=""
                />
              </div>
            </div>
            {/* Sign Up form */}
            <div className="input-wrapper">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.currentTarget.value)}
                value={email}
                type="email"
                className="w-input"
                maxLength="256"
                name="Email"
                data-name="Email"
                placeholder=""
                id="Email"
                required=""
              />
            </div>

            <div className="form-wrapper">
              <div className="input-wrapper">
                <label htmlFor="Password-Confirmation" className="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  value={password}
                  type="password"
                  className="half-text-field w-input"
                  maxLength="256"
                  name="Password-Confirmation"
                  data-name="Password Confirmation"
                  placeholder=""
                  id="Password-Confirmation"
                  required=""
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="Password-3" className="form-label">
                  Password Confirmation
                </label>
                <input
                  onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
                  value={passwordConfirm}
                  type="password"
                  className="half-text-field w-input"
                  maxLength="256"
                  name="Password-2"
                  data-name="Password 2"
                  placeholder=""
                  id="Password-2"
                  required=""
                />
              </div>
            </div>

            {/* Sign up button */}
            <input
              onClick={signup}
              type="submit"
              value="Sign Up"
              data-wait="Please wait..."
              className="signUpButton button login w-button"
            />
          </form>

          {/* Message */}
          <div className="sign-up-msg">
            {!message ? null : (
              <h5 className="signup-fail-msg text-center">{`Message: ${message}`}</h5>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
