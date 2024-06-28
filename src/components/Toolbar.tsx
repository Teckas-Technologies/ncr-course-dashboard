'use client';
import { useEffect, useState } from 'react';
import { type Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import { Bold, Code, Heading2, Italic, List, ListOrdered, Redo, Strikethrough, TableIcon, TableRowsSplit, Undo, MoreHorizontal, LinkIcon, CheckIcon, PencilIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { FormControl, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

type Props = {
    editor: Editor | null
    setEditable: ()=>void
    disabled:boolean
}

export function Toolbar({ editor, setEditable, disabled }: Props) {

    const [showMore, setShowMore] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const [showLinkDialog, setShowLinkDialog] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkPosition, setLinkPosition] = useState({ top: 0, left: 0 });

    const [isDisabled, setIsDisabled] = useState(disabled);

    useEffect(() => {
        setIsDisabled(disabled);
    }, [disabled]);

    const setEditableTool = () => {
        setIsDisabled(false);
        setEditable();
    }

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const addLink = () => {
        setShowLinkDialog(!showLinkDialog); 
    };

    const handleLinkSubmit = () => {
        if (editor && linkUrl.trim() !== '') {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
            setLinkUrl('');
        }
        setShowLinkDialog(false); 
    };

    const handleLinkCancel = () => {
        setShowLinkDialog(false); 
    };

    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="toolbar relative border border-input bg-transparent rounded flex flex-row gap-1 p-1 mt-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive("heading")}
                                onPressedChange={() => !isDisabled && editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            >
                                <Heading2 className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Heading 2</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive("bold")}
                                onPressedChange={() => !isDisabled && editor.chain().focus().toggleBold().run()}
                            >
                                <Bold className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Bold</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive("italic")}
                                onPressedChange={() => !isDisabled && editor.chain().focus().toggleItalic().run()}
                            >
                                <Italic className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Italic</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive("strike")}
                                onPressedChange={() => !isDisabled && editor.chain().focus().toggleStrike().run()}
                            >
                                <Strikethrough className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Strike</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive("bulletList")}
                                onPressedChange={() => !isDisabled && editor.chain().focus().toggleBulletList().run()}
                            >
                                <List className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Bullet Points</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive("orderedList")}
                                onPressedChange={() => !isDisabled && editor.chain().focus().toggleOrderedList().run()}
                            >
                                <ListOrdered className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Ordered List</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Toggle
                                        size="sm"
                                        onPressedChange={setEditableTool}
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </Toggle>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                
                {isMobile && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Toggle
                                    size="sm"
                                    onPressedChange={() => setShowMore(!showMore)}
                                >
                                    <MoreHorizontal className="h-4 w-4 more-btn" />
                                </Toggle>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>More</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}

                {!isMobile && (
                    <>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive("codeBlock")}
                                        onPressedChange={() => !isDisabled && editor.chain().focus().toggleCodeBlock().run()}
                                    >
                                        <Code className="h-4 w-4" />
                                    </Toggle>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Code Block</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive("table")}
                                        onPressedChange={()=> !isDisabled && addLink()}
                                    >
                                        <LinkIcon className="h-4 w-4" />
                                    </Toggle>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Link</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive("table")}
                                        onPressedChange={() => !isDisabled && editor.chain().focus().insertTable({ rows: 3, cols: 4, withHeaderRow: true }).run()}
                                    >
                                        <TableIcon className="h-4 w-4" />
                                    </Toggle>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add Table</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive("rowAfter")}
                                        onPressedChange={() => !isDisabled && editor.chain().focus().addRowAfter().run()}
                                    >
                                        <TableRowsSplit className="h-4 w-4" />
                                    </Toggle>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add Table Row</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Toggle
                                        size="sm"
                                        onPressedChange={() => !isDisabled && editor.chain().focus().undo().run()}
                                    >
                                        <Undo className="h-4 w-4" />
                                    </Toggle>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Undo</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Toggle
                                        size="sm"
                                        onPressedChange={() => !isDisabled && editor.chain().focus().redo().run()}
                                    >
                                        <Redo className="h-4 w-4" />
                                    </Toggle>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Redo</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </>
                )}
            </div>
            {isMobile && showMore && (
                <div className="submenu relative border border-input bg-transparent rounded flex flex-row gap-1 p-1 mt-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Toggle
                                    size="sm"
                                    pressed={editor.isActive("table")}
                                    onPressedChange={()=> !isDisabled && addLink()}
                                >
                                    <LinkIcon className="h-4 w-4" />
                                </Toggle>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Link</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Toggle
                                size="sm"
                                onPressedChange={()=> !isDisabled && addLink()}
                            >
                                <LinkIcon className="h-4 w-4" />
                            </Toggle>
                        </DropdownMenuTrigger>
                        {showLinkDialog && (
                            <div className="absolute left-[0] bottom-[100%] w-56 mr-4">
                                <FormItem className="py-2">
                                    <div className='flex items-center gap-3'>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter the URL here..." value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                                    </FormControl>
                                    <Button onClick={handleLinkSubmit}><CheckIcon /></Button>
                                    </div>
                                </FormItem>
                            </div>
                        )}
                    </DropdownMenu> */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Toggle
                                    size="sm"
                                    pressed={editor.isActive("table")}
                                    onPressedChange={() => !isDisabled && editor.chain().focus().insertTable({ rows: 3, cols: 4, withHeaderRow: true }).run()}
                                >
                                    <TableIcon className="h-4 w-4" />
                                </Toggle>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add Table</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Toggle
                                    size="sm"
                                    pressed={editor.isActive("rowAfter")}
                                    onPressedChange={() => !isDisabled && editor.chain().focus().addRowAfter().run()}
                                >
                                    <TableRowsSplit className="h-4 w-4" />
                                </Toggle>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add Table Row</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Toggle
                                    size="sm"
                                    onPressedChange={() => !isDisabled && editor.chain().focus().undo().run()}
                                >
                                    <Undo className="h-4 w-4" />
                                </Toggle>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Undo</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Toggle
                                    size="sm"
                                    onPressedChange={() => !isDisabled && editor.chain().focus().redo().run()}
                                >
                                    <Redo className="h-4 w-4" />
                                </Toggle>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Redo</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            )}

            <AlertDialog open={showLinkDialog} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Enter the URL</AlertDialogTitle>
                    </AlertDialogHeader>
                    <FormItem className="py-2">
                        <FormControl>
                            <Input type="text" placeholder="Enter the URL here..." value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleLinkCancel}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLinkSubmit}>Add URL</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
