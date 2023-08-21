import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import {logout} from '../redux/reducerSlice/userSlice'


function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
}

export default function Header() {
    const { fullname, role, municipality } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [currentDate, setCurrentDate] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        setCurrentDate(getCurrentDate());
    }, []);

    const handleProfileClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div className={`bg-gray-300 h-300 text-black pt-4 p-2 flex justify-between`}>
            <div className="items-center">
                <h2>Welcome ! {fullname} ({role})</h2>
            </div>
            <div className="flex flex-row">
                <h1 className="mr-2">Today's Date: </h1>
                <p>{currentDate}</p>
            </div>
            <div className="relative">
                <div onClick={handleProfileClick}>
                    <Image src="/profile.jpg" width={50} height={50} alt="profilepic" className="rounded-full cursor-pointer" />
                </div>
                {isDropdownVisible && (
                    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-md">
                        <ul>
                            <Link href={'/viewProfile'}><li className="px-2 py-1 hover:bg-gray-100 cursor-pointer ">View Profile</li></Link>
                            <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
