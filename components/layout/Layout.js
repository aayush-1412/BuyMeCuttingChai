import Header from "./Header";

import { useState, createContext } from "react";



const App = createContext();

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
export { App };
