import React from 'react';
import { Link } from "react-router-dom";


export default function NotFound() {
  return(
  <>
    <div className='d-flex flex-column align-items-center'>
      <h3>Sorry! The page you are looking for is no longer available.</h3>
      <Link to='/home' ><a href="#" className="w-nav-brand"><h4>Back to Home</h4></a></Link>
    </div>
  </>)
}
