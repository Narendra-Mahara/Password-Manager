import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="h-svh">
      <div className="absolute top-0 z-[-2] h-svh w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_50%_at_20%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] md:bg-[radial-gradient(ellipse_30%_50%_at_10%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Header />
      <Footer />
    </div>
  );
};

export default App;
