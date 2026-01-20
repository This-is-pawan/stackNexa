import { TbSettings } from "react-icons/tb";
import { MdLiveHelp } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";


export const data = [
  {
    id: 1,
    title: "⋆ HTML, CSS",
    route: "first-course",
    style:
      "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-1 rounded-md  hover:text-white transition-all duration-300",
  },
  {
    id: 2,
    title: "⋆ HTML5 CSS3, JS",
    route: "second-course",
    style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-1 rounded-md  hover:text-white transition-all duration-300",
  },
  {
    id: 3,
    title: "⋆ HTML Advanced",
    route: "third-course",
    style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-1 rounded-md  hover:text-white transition-all duration-300",
  },
  {
    id: 4,
    title: "⋆ React + Vite",
    route: "fourth-course",
    style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-1 rounded-md hover:text-white transition-all duration-300",
  },
  {
    id: 5,
    title: "⋆ MERN STACK",
    route: "mern-stack",
    style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-1 rounded-md  hover:text-white transition-all duration-300",
  },
];

 

export const projects = [
  {
    id: 1,
    title: "Payment Integration",
    style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-2 hover:text-white   transition-all duration-300",
    route:'payment-integration'
  },
  {
    id: 2,
    title: "Ecommerce",
    style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-2 hover:text-white  transition-all duration-300",
    route:'ecommerce'
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-2 hover:text-white transition-all duration-300",
     route:'saas-dashboard'
  },
  {
    id: 4,
    title: "Business Application",
    style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-2 hover:text-white transition-all duration-300",
     route:'business-application'
  },
  
];

export const sidebarfooter = [
  { id: 1, text: "Setting", icon: TbSettings ,route:'setting', style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-2 rounded-md  hover:text-white transition-all duration-300",},
  { id: 2, text: "Help", icon: MdLiveHelp ,route:'help', style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-2 hover:text-white   transition-all duration-300",},
  { id: 3, text: "Billing", icon: GiPayMoney ,route:'billing', style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-2 hover:text-white   transition-all duration-300",},
  { id: 4, text: "PrivacyPolicy" ,route:'privacy-policy', style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-2 hover:text-white   transition-all duration-300",},
  { id: 5, text: "Terms & Conditions" ,route:'term-condition', style: "w-[200px] flex items-center gap-3 text-sm capitalize px-4 py-2 hover:text-white   transition-all duration-300",},
  
];
export const sidebarSmall = [
  { id: 1, text: "Setting", icon: TbSettings ,route:'setting',title:'Setting'},
  { id: 2, text: "Help", icon: MdLiveHelp ,route:'help',title:'Help'},
  { id: 3, text: "Billing", icon: GiPayMoney ,route:'billing',title:'Billing'},
  

];
