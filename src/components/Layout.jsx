import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const Layout = () => {
  const navList = [
    { href: "/", displayText: "Emberek listázása" },
    { href: "create", displayText: "Ember felvétele" },
    {
      href: "https://github.com/darkbeast0106/people-frontend",
      displayText: "GitHub",
      attributes: { target: "_blank" }
    },
  ];
  return (
    <>
      <Nav navItems={navList} />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
