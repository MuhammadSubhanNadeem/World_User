import { motion } from "motion/react";
import React, { useRef } from "react";

function Form() {
  const inputName = useRef(null);
  const inputEmail = useRef(null);
  function submitData(defs) {
    defs.preventDefault();
    let data = {
      name: inputName.current.value,
      email: inputEmail.current.value,
    };
    fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((raw_res) => raw_res.json())
      .then((res) => {
        console.log(res);
      });
  }
  let data = {
    initial: { x: 0 },
    animation: { x: 0, scale: [0.1, 1.1, 0.9, 1], transition: { duration: 1 } },
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.form
        action="http://localhost:3000/"
        onSubmit={(defs) => submitData(defs)}
        method="post"
        exit={{ y: -100 }}
        transition={{ duration: 0.5 }}
        className="w-max h-max border flex flex-col gap-[50px] bg-[#15d47b] p-[50px] text-white rounded-2xl shadow-[5px_10px_25px] shadow-[#d2c1ff]"
      >
        <motion.input
          type="text"
          variants={data}
          ref={inputName}
          initial="initial"
          animate="animation"
          name="name"
          className="border rounded-[5px] w-[250px] pl-[15px] pt-1 pb-1 outline-none text-white"
          placeholder="Enter Your Name"
        />
        <motion.input
          type="email"
          name="email"
          ref={inputEmail}
          initial="initial"
          animate="animation"
          variants={data}
          className="border rounded-[5px] w-[250px] pl-[15px] pt-1 pb-1 outline-none"
          placeholder="Enter Your Name"
        />
        <button
          type="submit"
          className="border rounded-[5px] w-[250px] py-1 transition-all active:scale-[0.95] duration-75 ease-initial outline-none cursor-pointer bg-cyan-700 hover:bg-cyan-900 text-white font-extrabold"
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
}
export default Form;
