import React from "react";
import { useAppContext } from "../ContextApi";
import { MdWorkspacePremium ,MdLiveHelp} from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import {  TbSettings } from "react-icons/tb";
import { data, projects as pro, sidebarfooter } from "../data";
import stackNexaLogo from "../../assets/stackNexaLogo.png"; 
import { Link } from "react-router-dom";
const NavLinks = () => {
  const { bar, theme, auth ,Googleuser} = useAppContext();

const isLoggedIn = auth?.isAuthenticated || Boolean(Googleuser?.isAuthenticated) 
  const currentUser = auth?.user || Googleuser?.Guser;
  "User";
  return (
    <div
      className={`
        fixed top-[4rem] left-0
    w-[18rem]
    h-[calc(100vh-4rem)]
    overflow-y-auto

        transition-transform duration-200 ease-in-out
        ${
          bar
            ? "translate-x-0 min-[900px]:-translate-x-full"
            : "-translate-x-full"
        }
        ${
          theme === "dark"
            ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300  "
            : "bg-gray-900 text-white transition-all duration-300 shadow-sm"
        }
      `}
    >
 
             <img src={stackNexaLogo}
                          alt="StackNexa"
                          className=" w-full h-16  mx-auto object-cover "
                        />
      <h2 className="w-[4rem] h-[1.5rem] m-auto text-sm text-center  pb-2  border-blue-400/40 text-green-300 border-none rounded-lg bg-blue-600/30 ">
        <Link to="/">Home</Link>
      </h2>
      <h2 className="text-sm text-center mt-4 pb-2 border-b border-green-400/40 text-green-300">
        Basic(free) & Advanced{" "}
      </h2>
      {/* routees */}
    
       
      <div> 
      <ul className="mt-4 space-y-2 px-3">
        {data.map(({ id, style, title, route }) => (
          <li key={id} className={style}>
             <Link to={isLoggedIn ? `/dashboard/${route}` : "/register"}  >
    {title}
  </Link>
          </li>
        ))}
      </ul>
      <h2 className="flex justify-center items-center gap-2 mt-5 pb-2 border-b border-blue-500/40 text-blue-300 uppercase">
        Pro
        <MdWorkspacePremium className="text-blue-400 animate-pulse" />
      </h2>
      <ul className="mt-3 space-y-2 px-3">
        {pro.map(({ id, style, title, route }) => (
          <li key={id} className={style}>
           <Link to={isLoggedIn ? `/dashboard/${route}` : "/register"}  >
    {title}
  </Link>
          </li>
        ))}
      </ul>

      </div>
<article className="border-t border-green-400/40 mt-4 pt-3">
  <ul className="capitalize tracking-wide text-sm ">
  {sidebarfooter.map(({ id, text, icon ,route,style}) => {
    const Icon = icon;

    return (
      <li
        key={id}
        className="w-full pl-3 flex items-center  gap-3"
      >
        <Link to={isLoggedIn ? `/dashboard/${route}` : "/register"} className={style}  >
          {Icon && <Icon className="text-lg" />}
          <span>{text}</span>
        </Link>
      </li>
    );
  })}
</ul>

</article>

    </div>
  );
};

export default NavLinks;