import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { databases, client } from "./lib/appwrite.js";
import { ID, Query } from "appwrite";
import CryptoJS, { enc } from "crypto-js";
import { ToastContainer, toast, Bounce } from "react-toastify";

const App = () => {
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(0);
  const [fetchedData, setFetchedData] = useState({});
  const [hidePassword, setHidePassword] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState(null);

  const handleToggle = (id) => {
    setExpandedItemId((prevId) => (prevId === id ? null : id));
  };
  const decryptedpass = (cipherText) => {
    var bytes = CryptoJS.AES.decrypt(
      cipherText,
      import.meta.env.VITE_SECRET_KEY
    );
    var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    return originalPassword;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Encryption
    const ciphertext = CryptoJS.AES.encrypt(
      password,
      import.meta.env.VITE_SECRET_KEY
    ).toString();

    const response = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      ID.unique(),
      { site, username, password: ciphertext }
    );
    toast.success("Saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setPassword("");
    setUsername("");
    setSite("");
  };

  const fetchData = async () => {
    let response = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID
    );
    setFetchedData(response.documents);
    setData(response.total);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
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
                className="text-white text-xl  w-full outline-none border border-zinc-800 rounded-md py-2 pr-9 pl-2 "
                type={hidePassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {hidePassword ? (
                <img
                  className="absolute right-1.5 top-2 cursor-pointer w-7"
                  src="/eyeopen.png"
                  alt="eyeopen"
                  onClick={() => {
                    setHidePassword(!hidePassword);
                  }}
                />
              ) : (
                <img
                  className="absolute right-1.5 top-2 cursor-pointer w-7"
                  src="/eyeclose.png"
                  alt="eyeclose"
                  onClick={() => {
                    setHidePassword(!hidePassword);
                  }}
                />
              )}
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
          {data == 0 ? (
            <h5 className="text-lg">Nothing to show.</h5>
          ) : (
            <div className="flex flex-col gap-2">
              {fetchedData.map((item) => (
                <div
                  key={item.$id}
                  className="group transition-all duration-300 ease-out"
                >
                  <div
                    className="flex items-center justify-between p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer transition-colors duration-200"
                    onClick={() => handleToggle(item.$id)}
                  >
                    <p className="text-lg font-medium text-white">
                      {item.site}
                    </p>
                    <lord-icon
                      className="h-6 w-6 transition-transform duration-300"
                      src="https://cdn.lordicon.com/tylxcnti.json"
                      trigger="click"
                      colors="primary:#ffffff"
                      style={{
                        transform:
                          expandedItemId === item.$id
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    ></lord-icon>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedItemId === item.$id
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-4 bg-zinc-750 rounded-b-lg border-t border-zinc-600">
                      <div className="flex items-center gap-2">
                        <p className="text-zinc-300">
                          Username: {item.username}
                        </p>
                        <lord-icon
                          className="cursor-pointer"
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="click"
                          colors="primary:#ffffff"
                          onClick={(e) => {
                            toast.success("Copied!", {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: false,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                              transition: Bounce,
                            });
                            navigator.clipboard.writeText(item.username);
                          }}
                        ></lord-icon>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-zinc-300">Password: ********</p>
                        <lord-icon
                          className="cursor-pointer"
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="click"
                          colors="primary:#ffffff"
                          onClick={(e) => {
                            let encryptedPassword = item.password;

                            let originalPassword =
                              decryptedpass(encryptedPassword);
                            navigator.clipboard.writeText(originalPassword);
                            toast.success("Copied!", {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: false,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                              transition: Bounce,
                            });
                          }}
                        ></lord-icon>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* For Desktop */}
        <div className="text-white px-10 py-8 hidden md:block ">
          <h3 className="text-2xl">Your Passwords</h3>
          {data == 0 ? (
            <h5 className="text-lg">Nothing to show.</h5>
          ) : (
            <>
              <div className="grid grid-cols-3 bg-zinc-900 p-2 rounded-md font-bold">
                <h2>Website</h2>
                <h2>Username</h2>
                <h2>Password</h2>
              </div>
              {fetchedData.map((item) => (
                <div key={item.$id} className="flex flex-col py-2 gap-2">
                  <div className="grid grid-cols-3 p-2  bg-zinc-800 rounded-sm">
                    <p className="flex items-center gap-2">
                      {item.site}{" "}
                      <lord-icon
                        className="cursor-pointer"
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="click"
                        colors="primary:#ffffff"
                        onClick={(e) => {
                          toast.success("Copied!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                          });
                          navigator.clipboard.writeText(
                            e.target.parentElement.innerText
                          );
                        }}
                      ></lord-icon>
                    </p>
                    <p className="flex items-center gap-2">
                      {item.username}{" "}
                      <lord-icon
                        className="cursor-pointer"
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="click"
                        colors="primary:#ffffff"
                        onClick={(e) => {
                          toast.success("Copied!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                          });
                          navigator.clipboard.writeText(item.username);
                        }}
                      ></lord-icon>
                    </p>
                    <p
                      className="flex items-center gap-2"
                      value={item.password}
                    >
                      **********
                      <lord-icon
                        className="cursor-pointer"
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="click"
                        colors="primary:#ffffff"
                        onClick={(e) => {
                          let encryptedPassword = item.password;
                          let originalPassword =
                            decryptedpass(encryptedPassword);
                          navigator.clipboard.writeText(originalPassword);
                          toast.success("Copied!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                          });
                        }}
                      ></lord-icon>
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default App;
