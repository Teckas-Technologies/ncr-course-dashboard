'use client';
import { type Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import { Bold, Code, Heading2, Italic, List, ListOrdered, Strikethrough, TableIcon, TableRowsSplit } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

type Props = {
    editor: Editor | null
}


export function Toolbar({editor}: Props) {
    if(!editor) {
        return null;
    }

    return (
        <>
        <div className="border border-input bg-transparent rounded flex flex-row gap-1 p-1">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Toggle 
                        size="sm"
                        pressed={editor.isActive("heading")}
                        onPressedChange={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                    >
                        <Heading2 className="h-4 w-4"/>
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
                        <Bold className="h-4 w-4"/>
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
                        <Italic className="h-4 w-4"/>
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
                        <Strikethrough className="h-4 w-4"/>
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
                        <List className="h-4 w-4"/>
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
                        <ListOrdered className="h-4 w-4"/>
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
                        <Code className="h-4 w-4"/>
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
                        onPressedChange={() => editor.chain().focus().insertTable({ rows: 3, cols: 4, withHeaderRow: true }).run()}
                    >
                        <TableIcon className="h-4 w-4"/>
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
                        <TableRowsSplit className="h-4 w-4"/>
                    </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add Table Row</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
    
        </div>
        </>
    )
}