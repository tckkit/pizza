import React from "react";
import {
  Routes,
  BrowserRouter as Router,
  Link,
  Route,
  Navigate,
  Outlet,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function FamilyNav() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(familyGetSuccessThunk());
  // }, []);
  return (
    <div>
      <div className="content">
        <div className="profile-nav d-flex justify-content-center">
          <div>
          <Link to="/myaccount/calendar" className="nav-item nav-link w-nav-link">
            My Calendar
          </Link>
          <Link to="/myaccount/info" className="nav-item nav-link w-nav-link">
            My Family Profile
          </Link>
          <Link to="/myaccount/review" className="nav-item nav-link w-nav-link">
            My Reviews
          </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
