import React, { useState } from "react";
import { useEffect } from "react";

function UserData() {
  let [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/data", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((raw_res) => {
        return raw_res.json();
      })
      .then((res) => {
        setUserData((prev) => {
          return [...res];
        });
      });
  }, []);
  return (
    <>
      <div className="w-full bg-cyan-600 h-[80%] flex items-center justify-center gap-5 p-[75px] overflow-y-scroll overflow-x-hidden flex-wrap">
        {userData.map((eachData, index) => {
          return (
            <div
              key={index}
              className="border-[1px] border-[rgba(255,255,255,0.15)] border-solid p-5 bg-cyan-600 flex flex-col gap-3 rounded-2xl shadow-[0px_0px_15px] shadow-[#0000002d]"
            >
              <span className="text-white text-[18px]">{eachData.name}</span>
              <hr className="w-full border-none bg-[rgba(255,255,255,0.25)] h-[0.5px]" />
              <span className="text-white text-[18px]">{eachData.email}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UserData;
