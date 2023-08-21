import { MdOutlineDashboard } from 'react-icons/md'
import { GiPostOffice } from 'react-icons/gi'
import { AiTwotoneSetting } from 'react-icons/ai'
import { PiBowlFoodFill } from 'react-icons/pi'
import { LuLogOut } from 'react-icons/lu'
import { BiSolidCartAdd } from 'react-icons/bi'
import { SiCodereview } from 'react-icons/si'


const Menus = {
    adminMenus: [
        { name: "Dashboard", link: '/', icon: MdOutlineDashboard },
        { name: "Add School", link: '/Auth/SignupForm', icon: BiSolidCartAdd },
        { name: "View Coupon", link: '/admin/ViewCoupon', icon: SiCodereview },
        { name: "Add Municipality", link: '/admin/AddMunicipality', icon: GiPostOffice },
        { name: "View Municipality", link: '/admin/ViewMunicipality', icon: GiPostOffice },
  

    ],

    municipalityMenus: [
        { name: "Dashboard", link: '/municipalityDashboard', icon: MdOutlineDashboard },
        { name: "Add Coupon", link: '/dashboard', icon: PiBowlFoodFill },
        { name: "View Coupon", link: '/dashboard', icon: PiBowlFoodFill },
        { name: "Add Employee", link: '/dashboard', icon: PiBowlFoodFill },
        { name: "View Employee", link: '/dashboard', icon: PiBowlFoodFill },
        { name: "Setting", link: '/dashboard', icon: AiTwotoneSetting },

    ],

    employeeMenus: [
        { name: "Dashboard", link: '/employeeDashboard', icon: MdOutlineDashboard },
        { name: "Add Coupon", link: '/dashboard', icon: PiBowlFoodFill },
        { name: "View Coupon", link: '/dashboard', icon: PiBowlFoodFill },
        { name: "Setting", link: '/dashboard', icon: AiTwotoneSetting },

    ]
}

export default Menus;