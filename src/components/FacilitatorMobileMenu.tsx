import { CheckIcon, LeafIcon, Menu, NotebookPenIcon, User } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";


const menuList = [
    {
        name: "Add Course Module",
    },
    {
        name: "Student List",
    }
]


export default function FacilitatorMobileMenu({setPageComponent} : any) {

    return (
        <>
         <div className="facilitator-mobile-menu flex flex-row w-full justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="hamburger1">
                    <Button variant="outline" className="flex-row gap-2"><Menu /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-4">
                    <DropdownMenuLabel className="flex flex-row items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="account">
                            <h2>My Account </h2>
                            <p className="font-normal">id : RC5421</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    {menuList.map((menu:any, i:any) => (
                        <DropdownMenuItem key={i}>
                            {menu.name === "Add Course Module" ? <NotebookPenIcon className="mr-2 h-4 w-4" /> : menu.name === "Student List" ? <User className="mr-2 h-4 w-4" /> : <LeafIcon className="mr-2 h-4 w-4" />}
                            <span><h2 onClick={()=>setPageComponent(menu.name)}>{menu.name}</h2></span>
                        </DropdownMenuItem>
                    ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
         </div>

            {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <LinkIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-4">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                        <FormItem className="py-2">
                            <FormControl>
                                <Input type="text" placeholder="Enter the URL here..." value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        <Button onClick={handleLinkSubmit}><CheckIcon/></Button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu> */}
        </>
    )

}