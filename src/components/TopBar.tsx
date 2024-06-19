'use client';
import { ArrowRightCircleIcon, MenuIcon, MenuSquareIcon, PanelRightCloseIcon, ShieldCloseIcon, SidebarCloseIcon, SidebarOpen, SidebarOpenIcon, XIcon } from "lucide-react";
import { useState } from "react";
import '../app/style.css'
import ProgressComp from "./Progress";
import SocialMedia from "./SocialMedia";
import Link from "next/link";
import { useMbWallet } from "@mintbase-js/react";


export default function TopBar() {

    const menus = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Course",
            path: "/course"
        },
        {
            name: "Facilitator",
            path: "/facilitator"
        }
    ]
    const [isOpen, setIsOpen] = useState(false);

    const { isConnected, selector, connect, activeAccountId } = useMbWallet();

    const handleSignout = async () => {
        console.log("clicked logout");
        const wallet = await selector.wallet();
        return wallet.signOut();
    };
    
    const handleSignIn = async () => {
        console.log("clicked login");
        return connect();
    };

    return (
        <>
            <div className="main-header">
                <div className='main-header-logo-icon'>
                    <div className="hamburger" onClick={()=>setIsOpen(!isOpen)}>{isOpen? <XIcon style={{color:'#fff', height:'42px', width:'52px'}} />: <MenuIcon style={{color:'#fff', height:'42px', width:'52px'}} />} </div>
                    <h2 style={{fontWeight: 700, fontSize: 25, color: "#fff"}}><span style={{color: "#DF3276"}}> NCR</span> Course</h2>
                </div>
                <div className='header-right'>
                    <div className='profile-pic'>
                        {/* <img className='profile-pic' src="https://i.pinimg.com/originals/f8/f5/98/f8f598fb70de7de910b93b10ef7fb9e5.jpg" alt="pro" /> */}
                    </div>
                    <div className='header-profile-details'>
                        {isConnected ? (
                            <button className="px-4 py-2 flex action-btn rounded" style={{width: 'auto', display: 'flex', alignItems:'center', gap:8, fontSize:14, fontWeight:400, backgroundColor: "#fff"}} onClick={handleSignout}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="17px" fill="#5f6368"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
                                Logout
                            </button>
                        ) : (
                            <button className="px-4 py-2 flex action-btn rounded" style={{width: 'auto', display: 'flex', alignItems:'center', gap:8, fontSize:14, fontWeight:400, backgroundColor: "#fff"}} onClick={handleSignIn}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="17px" fill="#5f6368"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
                                Sign Up / Sign In
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className={isOpen ? "side-bar-open" : "side-bar-close"}>
                <div className="side-bar">
                <div className="my-6">
                {menus.map((menu, i) => (
                    <div className="side-bar-list" key={i}>
                        <Link href={menu.path}>
                            <div className="menu-item">
                                <p>{menu.name}</p>
                                <div className="arrow">
                                    <ArrowRightCircleIcon />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
                </div>
                <div className="top-bar-progress">
                    <ProgressComp />
                    <SocialMedia />
                </div>
                </div>
            </div>
        </>
    )

}