import React from "react";

const Header = () => {
  return (
    <header className="p-5">
      <a href="/" className=" flex w-fit text-white gap-2  ">
        <lord-icon
          className="cursor-pointer"
          src="https://cdn.lordicon.com/hrrhosyf.json"
          trigger="hover"
          stroke="bold"
          colors="primary:#ffffff,secondary:#e4e4e4"
        ></lord-icon>
        <h1 className="text-2xl md:text-3xl cursor-pointer  w-fit font-bold font-[Poppins]">
          Password Manager
        </h1>
      </a>
    </header>
  );
};

export default Header;
