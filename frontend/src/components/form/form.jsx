import { motion } from "motion/react";
import React, { useRef, useState } from "react";

function Form() {
  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const userImage = useRef(null);
  const [userImgFile, setUserImgFile] = useState({
    img_set: false,
    img_name: "",
  });
  function submitData(defs) {
    defs.preventDefault();
    let formData = new FormData();
    let userImageFile = userImage.current.files[0];
    formData.append("name", inputName.current.value);
    formData.append("email", inputEmail.current.value);
    formData.append("userImg", userImageFile);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/`, {
      method: "POST",
      body: formData,
    })
      .then((raw_res) => raw_res.json())
      .then((res) => {
        console.log(res);
        if (res.cause === "Duplication Err!") {
          inputName.current.value = "";
          inputEmail.current.value = "";
          userImage.current.value = "";
          inputName.current.style.border = "1px solid red";
          inputEmail.current.style.border = "1px solid red";
          userImage.current.style.border = "1px solid red";
          setTimeout(() => {
            inputName.current.style.border = "1px solid white";
            inputEmail.current.style.border = "1px solid white";
            userImage.current.style.border = "1px solid white";
          }, 1500);
          window.alert("❌ You Are Already ON Fire! Get Out On All User Data 😄!");
        } else if (res.img_upload && res.write){
          inputName.current.value = "";
          inputEmail.current.value = "";
          userImage.current.value = "";
          window.alert("✅ You Are Already ON Fire! Get Out On All User Data!");
        }
      });
  }
  let data = {
    initial: { x: 0 },
    animation: { x: 0, scale: [0.1, 1.1, 0.9, 1], transition: { duration: 1 } },
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.form
        action={`${import.meta.env.VITE_BACKEND_URL}/`}
        onSubmit={(defs) => submitData(defs)}
        method="post"
        exit={{ y: -100 }}
        encType="multipart/form-data"
        transition={{ duration: 0.5 }}
        className="w-max h-max border flex flex-col bg-[#15d47b] p-[50px] text-white rounded-2xl shadow-[5px_10px_25px] shadow-[#d2c1ff]"
      >
        <motion.input
          type="text"
          variants={data}
          ref={inputName}
          initial="initial"
          animate="animation"
          name="name"
          className="border mb-6 rounded-[5px] w-[250px] pl-[15px] pt-1 pb-1 outline-none text-white"
          placeholder="Enter Your Name"
          required
        />
        <motion.input
          type="email"
          name="email"
          ref={inputEmail}
          initial="initial"
          animate="animation"
          variants={data}
          className="border mb-6 rounded-[5px] w-[250px] pl-[15px] pt-1 pb-1 outline-none"
          placeholder="Enter Your Name"
          required
        />
        <input
          type="file"
          id="user_img"
          ref={userImage}
          onChange={(defs) => {
            console.log(defs.target.files[0]);
            setUserImgFile((prev) => {
              return {
                ...prev,
                img_name: defs.target.files[0].name,
                img_set: true,
              };
            });
          }}
          className="w-[250px] overflow-hidden hidden"
          required
          accept=".jpg,.png,.gif,.webp,.jpeg"
        />
        <label
          htmlFor="user_img"
          className="w-[50%] h-[45px] mb-1 text-center transition-all duration-150 ease-in content-center cursor-pointer hover:bg-[rgba(255,255,255,0.1)] border-[white] border-[1px] rounded-[5px]"
        >
          Upload Image
        </label>
        {userImgFile.img_set ? (
          <div className="w-[180px] mb-1 h-fit text-start overflow-ellipsis overflow-hidden text-nowrap text-[13px]">
            {userImgFile.img_name}
          </div>
        ) : null}
        <button
          type="submit"
          className="border rounded-[5px] mt-12 w-[250px] py-1 transition-all active:scale-[0.95] duration-75 ease-initial outline-none cursor-pointer bg-cyan-700 hover:bg-cyan-900 text-white font-extrabold"
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
}
export default Form;
