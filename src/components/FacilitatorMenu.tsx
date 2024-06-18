import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const menuList = [
    {
        name: "Add Course Module",
    },
    {
        name: "Student List",
    }
]

export default function FacilitatorMenu({setPageComponent} : any) {
    
    return (
        <>
        <div className="facilitator-menu">
            <Card>
                <CardHeader className="border-b-2 mb-5">
                    <CardTitle className="flex flex-row items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="account flex flex-col gap-1">
                            <h3>My Account </h3>
                            {/* <p className="font-normal">id : RC5421</p> */}
                            <CardDescription>id : RC5421</CardDescription>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="facilitator-menu-list flex-col flex gap-4 pr-2">
                    {menuList.map((menu:any, i:any) => (
                        <li onClick={() => setPageComponent(menu.name)} key={i} className="flex justify-between align-center hover:pr-4"><h2>{menu.name}</h2> <ArrowRightIcon className="menu-icon" /></li>
                    ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
        </>
    )

}