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
    queryKey: ["userData"],
    queryFn: fetchUsersData,
  });
  return (
    <>
      <div className="w-full bg-cyan-600 h-[80%] flex items-center justify-center gap-5 p-[15px] overflow-y-scroll overflow-x-hidden flex-wrap">
        {!isLoading ? (
          data["users_data"].map((eachUser, userIndex) => {
            return eachUser.name && eachUser.email ? (
              <div
                key={userIndex}
                className="border-[1px] border-[rgba(255,255,255,0.15)] w-[320px] border-solid p-5 overflow-hidden bg-cyan-600 flex flex-col gap-3 rounded-2xl shadow-[0px_0px_15px] shadow-[#0000002d]"
              >
                {data["img_parsed_data"].map((each_user_img, userImgIndex) => {
                  if (each_user_img.user_email === eachUser.email) {
                    return (
                      <div
                        className="w-[70px] h-[70px] p-[2px] border-[2px] border-[white] overflow-hidden rounded-[50%] relative flex items-center justify-start mb-2"
                        key={userImgIndex}
                      >
                        <img
                          src={each_user_img.user_cloud_img}
                          className="w-full h-full rounded-[50%] object-cover"
                          alt="Your Damn Face"
                        />
                      </div>
                    );
                  }
                })}
                <span className="text-white text-[18px] overflow-ellipsis text-nowrap">{eachUser.name}</span>
                <hr className="w-full border-none bg-[rgba(255,255,255,0.25)] h-[0.5px]" />
                <span className="text-white text-[18px]">{eachUser.email}</span>
              </div>
            ) : null;
          })
        ) : isError ? (
          <h1 className="text-white font-bold text-[32px]">
            Something Goes Wrong!!
          </h1>
        ) : (
          <Loading />
        )}
      </div>
      <a
        href="https://lordicon.com/"
        className="absolute bottom-4 right-12 text-[rgba(255,255,255,0.6)] hover:underline"
      >
        Animated icons by Lordicon.com
      </a>
    </>
  );
}

export default UserData;
