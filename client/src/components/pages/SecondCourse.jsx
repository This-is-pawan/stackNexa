import React from "react";
import { SecondCourse as secondcourseData } from "./data";
import { useAppContext } from "../ContextApi";
import { Link } from "react-router-dom";
import ProjectSlider from "./ProjectSlider";

const SecondCourse = () => {
  const { theme ,setBar,bar,setOpen,open} = useAppContext();

  return (
    <div
      className={`
        w-full min-h-screen transition-all duration-300
        ${
          theme === "dark"
            ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
            : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
        }
      `}
     onClick={()=>{
    setBar(false)
 setOpen(false)
   }}  >
      {/* Container */}
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-wide">
            Second Course Projects
          </h1>
          <p className="text-sm opacity-70 mt-2">
            Beginner-friendly projects with source code & deployment
          </p>
        </div>

        {/* Cards */}
        <div className="grid  grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 gap-8 place-items-center">
          {secondcourseData.map((project,index) => (
            <div
              key={index}
              className={`
                group relative rounded-2xl overflow-hidden
                shadow-xl transition-all duration-300
                hover:scale-[1.03]
                ${
                  theme === "dark"
                    ? "bg-white text-black"
                    : "bg-gray-900 text-white"
                }
              `}
            >
              
              
   
              

              <ProjectSlider images={project.images} />

              {/* Content */}
              <div className="p-4">
                <h2 className="font-semibold text-lg">
                  {project.title}
                </h2>
                <p className="text-xs opacity-70 mt-1">
                  {project.level}
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
  {project.deploy?.map((link, i) => (
  <a key={i} href={link} target="_blank" className="text-xs text-blue-500 block">
    🔗 Live Demo {i+1 }
  </a>
))}

</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondCourse;