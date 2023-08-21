"use client"
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import { HiMenuAlt3 } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import Menus from '../components/menus'
const role = ["Admin","School"]
const Sidebar = () => {

    const { role,municipality } = useSelector(state => state.user)


    const menus = role === 'Admin' ? Menus.adminMenus : role === 'municipality' ? Menus.municipalityMenus : role === 'employee' ? Menus.employeeMenus : [];

    const [open, setOpen] = useState(true)

    return (
        <div className={`bg-[#3925d1]  min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 text-gray-200 px-4 `} >
            <div className="py-3 flex justify-between  ">
                {open ?
                    <div className="flex  justify-center">
                        <Image src={'/logo.png'} width={60} height={50} alt="logo" className="rounded-lg" />
                        <h2 className="text-center overflow-auto mx-3">{municipality}</h2>
                    </div> : <></>}

                    <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />

            </div>
            <div className="mt-4 flex flex-col gap-4 relative ">
                {
                    menus?.map((menu, i) => (
                        <Link href={menu?.link} key={i}
                            className=" group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ">
                            <div>
                                {React.createElement(menu?.icon, { size: '20' })}
                                {/* <HiMenuAlt3 /> */}
                            </div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 1}00ms`
                                }}
                                className={` whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}</h2>
                            <h2 className={` ${open && 'hidden'} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover: duration-300 group-hover:w-fit`}>{menu?.name}</h2>
                        </Link>

                    ))

                }



            </div>




        </div>

    );
};

export default Sidebar;