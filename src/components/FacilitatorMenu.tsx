import React, { useState,useContext } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useFeedDesc } from "@/hook/useFeed";
import { NearContext } from "@/wallet/walletSelector";
const menuList = [
    {
        name: "Add Course Module",
    },
    {
        name: "Student List",
    }
];

export default function FacilitatorMenu({ setPageComponent }: any) {
    const [activeMenu, setActiveMenu] = useState<string>(menuList[0].name);
    const { data, isLoading } = useFeedDesc();
    const { wallet, signedAccountId } = useContext(NearContext);
    const handleMenuClick = (menuName: string) => {
        setActiveMenu(menuName);
        setPageComponent(menuName);
    };
    const mediaUrl = data?.mb_views_nft_tokens?.[0]?.media || "";
    console.log("Extracted media URL from facilitator:", mediaUrl);
    return (
        <>
            <div className="facilitator-menu">
                <Card>
                    <CardHeader className="border-b-2 mb-5">
                        <CardTitle className="flex flex-row items-center gap-3">
                            <Avatar>
                                <AvatarImage src={mediaUrl} alt="@shadcn" />
                                {/* <AvatarFallback>CN</AvatarFallback> */}
                            </Avatar>
                            <div className="account flex flex-col gap-1">
                                <h3>My Account</h3>
                                <CardDescription>{signedAccountId}</CardDescription>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="facilitator-menu-list flex-col flex gap-4 pr-2">
                            {menuList.map((menu: any, i: any) => (
                                <li
                                    onClick={() => handleMenuClick(menu.name)}
                                    key={i}
                                    className={`flex justify-between align-center  ${activeMenu === menu.name ? 'active' : ''}`}
                                >
                                    <h2>{menu.name}</h2> 
                                    <ArrowRightIcon className={`menu-icon ${activeMenu === menu.name ? 'active-icon' : ''}`} />
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
