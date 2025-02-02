import React from "react";
import { NavLink } from "react-router";
function Access_data(props) {
  return (
    <NavLink to={props.to}>
      <button
        type="button"
        className="w-[180px] h-[40px] text-[18px] transition-all duration-100 text-white ease-linear font-extrabold rounded-[5px] border fixed top-12 left-[50%] translate-x-[-50%] cursor-pointer hover:bg-[rgba(0,0,0,0.1)]"
      >
        {props.name}
      </button>
    </NavLink>
  );
}

export default Access_data;
