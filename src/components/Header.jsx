import React from "react";

const Header = () => {
  return (
    <header className="p-5 text-white flex gap-2  ">
      <lord-icon
        src="https://cdn.lordicon.com/hrrhosyf.json"
        trigger="hover"
        stroke="bold"
        colors="primary:#ffffff,secondary:#e4e4e4"
      ></lord-icon>
      <h1 className="text-2xl md:text-3xl  w-fit font-bold font-[Poppins]">
        Password Manager
      </h1>
    </header>
  );
};

export default Header;
