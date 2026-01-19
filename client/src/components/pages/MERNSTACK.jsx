import React from "react";
import { MERNSTACK as MERNSTACKData } from "../../components/pages/data";
import { useAppContext } from "../ContextApi";
import ProjectSlider from "../../components/pages/ProjectSlider";

const MERNSTACK = () => {
  const { theme,setBar,bar,setOpen,open } = useAppContext();

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-yellow-300"
          : "bg-black text-white"
      }`}
    onClick={()=>{
    setBar(false)
 setOpen(false)
   }} >
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-10">
          MERN STACK Course Projects
        </h1>

        <div className="grid  grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 gap-8 place-items-center ">
          {MERNSTACKData.map((project, index) => (
            <div
              key={index}
              className={`
                 rounded-2xl overflow-hidden shadow-xl transition-all
                ${
                  theme === "dark"
                    ? "bg-white text-black"
                    : "bg-gray-900 text-white"
                }`}
            >
              {/* Slider */}
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

export default MERNSTACK;