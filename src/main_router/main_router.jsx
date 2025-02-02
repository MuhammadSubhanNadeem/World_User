import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Access_data from "../components/Access_Data/access_data";
import Form from "../components/form/form";
import UserData from "../components/userData/userData";
import { AnimatePresence } from "motion/react";
function Main_router() {
  return (
    <AnimatePresence exitBeforeEnter>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Access_data name="All User Data" to="/data" />
                <Form />
              </>
            }
          />
          <Route
            path="/data"
            element={
              <>
                <Access_data name="Enter Your Data" to="/" />
                <UserData />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default Main_router;
