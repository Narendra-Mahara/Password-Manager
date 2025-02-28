import { use, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { databases } from "./lib/appwrite.js";
import { ID, Query } from "appwrite";

const App = () => {
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      ID.unique(),
      { site, username, password }
    );
    console.log(response);

    setPassword("");
    setUsername("");
    setSite("");
  };

  return (
    <div className="min-h-svh relative">
      <div className="absolute top-0 z-[-2] min-h-full w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_50%_at_20%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] md:bg-[radial-gradient(ellipse_30%_50%_at_10%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Header />
      <form
        className="p-5 md:px-15 md:py-5 flex flex-col gap-2"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          value={site}
          type="url"
          name="url"
          id="url"
          className="text-white w-full text-xl outline-none border border-zinc-800 rounded-md p-2"
          placeholder="Enter website URL"
          required
          onChange={(e) => {
            setSite(e.target.value);
          }}
        />
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            value={username}
            className="text-white w-full md:w-3/4 text-xl outline-none border border-zinc-800 rounded-md p-2"
            type="text"
            name="text"
            id="text"
            placeholder="Username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <div className="relative  w-full  md:w-1/2">
            <input
              value={password}
              className="text-white text-xl  w-full outline-none border border-zinc-800 rounded-md py-2 pr-8 pl-2 "
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <lord-icon
              className="absolute right-0 top-2 cursor-pointer"
              src="https://cdn.lordicon.com/iykgtsbt.json"
              trigger="hover"
              colors="primary:#ffffff"
            ></lord-icon>
          </div>
        </div>
        <div className="text-white flex items-center justify-center gap-1 mt-5">
          <button
            type="submit"
            className="text-xl  flex items-center rounded-md p-1 ring-2 ring-zinc-500 hover:cursor-pointer"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
            ></lord-icon>
            Save
          </button>
        </div>
      </form>

      {/* For Mobiles */}
      <div className="text-white py-9 px-5 md:hidden">
        <h3 className="text-2xl font-bold">Your Passwords</h3>
        <h5 className="text-lg">Nothing to show.</h5>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-lg p-2  bg-zinc-800 rounded-sm">
            <p>http://narendrais.live</p>
            <lord-icon
              className="h-5"
              src="https://cdn.lordicon.com/tylxcnti.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#ffffff"
            ></lord-icon>
          </div>
        </div>
      </div>

      {/* For Desktop */}
      <div className="text-white px-10 py-8 hidden md:block ">
        <h3 className="text-2xl">Your Passwords</h3>
        <h5 className="text-lg">Nothing to show.</h5>
        <div className="grid grid-cols-3 bg-zinc-900 p-2 rounded-md font-bold">
          <h2>Website</h2>
          <h2>Username</h2>
          <h2>Password</h2>
        </div>
        <div className="flex flex-col py-2 gap-2">
          <div className="grid grid-cols-3 p-2  bg-zinc-800 rounded-sm">
            <p>https://narendrais.live</p>
            <p>narendra</p>
            <p>password123</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
