import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "../Loading/loading";
async function fetchUsersData() {
  let data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/data`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((raw_res) => {
      return raw_res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("something went wrong!");
    });
  return data;
}
function UserData() {
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUsersData,
  });
  return (
    <>
      <div className="w-full bg-cyan-600 h-[80%] flex items-center justify-center gap-5 p-[75px] overflow-y-scroll overflow-x-hidden flex-wrap">
        {(!isLoading) ? data.map((eachData, index) => {
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
        }) : (isError) ? <h1 className="text-white font-bold text-[32px]">Something Goes Wrong!!</h1>: <Loading />}
      </div>
      <a href="https://lordicon.com/" className="absolute bottom-4 right-12 text-[rgba(255,255,255,0.6)] hover:underline">Animated icons by Lordicon.com</a>
    </>
  );
}

export default UserData;
