'use client';
import { useEffect, useState } from 'react';
import { type Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import { Bold, Code, Heading2, Italic, List, ListOrdered, Redo, Strikethrough, TableIcon, TableRowsSplit, Undo, MoreHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

type Props = {
    editor: Editor | null
}

export function Toolbar({ editor }: Props) {
    // const [showMore, setShowMore] = useState(false);

    const [showMore, setShowMore] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Function to handle window resize
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener to handle window resize
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="toolbar border border-input bg-transparent rounded flex flex-row gap-1 p-1 mt-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editor.isActive("heading")}
                                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
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
                                onPressedChange={() => editor.chain().focus().toggleBold().run()}
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
                                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
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
                                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
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
                                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
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
                                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
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
                                pressed={editor.isActive("codeBlock")}
                                onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
                            >
                                <Code className="h-4 w-4" />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Code Block</p>
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
                                        pressed={editor.isActive("table")}
                                        onPressedChange={() => editor.chain().focus().insertTable({ rows: 3, cols: 4, withHeaderRow: true }).run()}
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
                                        onPressedChange={() => editor.chain().focus().addRowAfter().run()}
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
                                        onPressedChange={() => editor.chain().focus().undo().run()}
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
                                        onPressedChange={() => editor.chain().focus().redo().run()}
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
                <div className="submenu border border-input bg-transparent rounded flex flex-row gap-1 p-1 mt-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Toggle
                                    size="sm"
                                    pressed={editor.isActive("table")}
                                    onPressedChange={() => editor.chain().focus().insertTable({ rows: 3, cols: 4, withHeaderRow: true }).run()}
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
                                    onPressedChange={() => editor.chain().focus().addRowAfter().run()}
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
                                    onPressedChange={() => editor.chain().focus().undo().run()}
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
                                    onPressedChange={() => editor.chain().focus().redo().run()}
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
        </>
    )
}
