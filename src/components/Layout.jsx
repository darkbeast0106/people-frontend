import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Layout() {
    const navItems = [
        { href: "/", displayText: "Emberek listázása" },
        { href: "create", displayText: "Ember felvétele" }
    ];
  return (
    <>
      <Nav navItems={navItems} />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
