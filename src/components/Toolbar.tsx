"use client";
import { useEffect, useState } from "react";
import { type Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import {
  Bold,
  Code,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  TableIcon,
  TableRowsSplit,
  Undo,
  MoreHorizontal,
  LinkIcon,
  CheckIcon,
  PencilIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { FormControl, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type Props = {
  editor: Editor | null;
  setEditable: () => void;
  disabled: boolean;
  disableEdit: boolean;
  setDisableEdit: () => void;
};

export function Toolbar({
  editor,
  setEditable,
  disabled,
  disableEdit,
  setDisableEdit,
}: Props) {
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkPosition, setLinkPosition] = useState({ top: 0, left: 0 });

  const [isDisabled, setIsDisabled] = useState(disabled);
  const [isUrlValid, setIsUrlValid] = useState(false);
  useEffect(() => {
    console.log("log 1 from tool bar :",isDisabled);
    setIsDisabled(disabled);
    console.log("log 1 from tool bar :",isDisabled);
    
  }, [disabled]);

  useEffect(() => {
    setIsDisabled(disableEdit);
    setDisableEdit();
  }, [disableEdit]);

  const setEditableTool = () => {
    setIsDisabled(false);
    setEditable();
    console.log("click the editor",setEditableTool);
    
  };
 
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addLink = () => {
    setShowLinkDialog(!showLinkDialog);
  };

  const handleLinkSubmit = () => {
    if (editor && linkUrl.trim() !== "") {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl("");
    }
    setShowLinkDialog(false);
  };

  const handleLinkCancel = () => {
    setShowLinkDialog(false);
  };
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setLinkUrl(url);
    setIsUrlValid(url.startsWith("https://"));
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
                className={
                  editor.isActive("heading", { level: 2 }) ? "activeIcon" : ""
                }
                pressed={editor.isActive("heading")}
                onPressedChange={() =>
                  !isDisabled &&
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
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
                className={editor.isActive("bold") ? "activeIcon" : ""}
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  !isDisabled && editor.chain().focus().toggleBold().run()
                }
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
                className={editor.isActive("italic") ? "activeIcon" : ""}
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  !isDisabled && editor.chain().focus().toggleItalic().run()
                }
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
                className={editor.isActive("strike") ? "activeIcon" : ""}
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                  !isDisabled && editor.chain().focus().toggleStrike().run()
                }
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
                className={editor.isActive("bulletList") ? "activeIcon" : ""}
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                  !isDisabled && editor.chain().focus().toggleBulletList().run()
                }
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
                className={editor.isActive("orderedList") ? "activeIcon" : ""}
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                  !isDisabled &&
                  editor.chain().focus().toggleOrderedList().run()
                }
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
                className={editor.isActive("pencil") ? "active" : ""}
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
                    className={editor.isActive("codeBlock") ? "active" : ""}
                    pressed={editor.isActive("codeBlock")}
                    onPressedChange={() =>
                      !isDisabled &&
                      editor.chain().focus().toggleCodeBlock().run()
                    }
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
                    className={editor.isActive("link") ? "active" : ""}
                    pressed={editor.isActive("link")}
                    onPressedChange={() => !isDisabled && addLink()}
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
                    className={editor.isActive("table") ? "active" : ""}
                    pressed={editor.isActive("table")}
                    onPressedChange={() =>
                      !isDisabled &&
                      editor
                        .chain()
                        .focus()
                        .insertTable({ rows: 3, cols: 4, withHeaderRow: true })
                        .run()
                    }
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
                    className={editor.isActive("rowAfter") ? "active" : ""}
                    pressed={editor.isActive("rowAfter")}
                    onPressedChange={() =>
                      !isDisabled && editor.chain().focus().addRowAfter().run()
                    }
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
                    className={editor.isActive("undo") ? "active" : ""}
                    onPressedChange={() =>
                      !isDisabled && editor.chain().focus().undo().run()
                    }
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
                    className={editor.isActive("redo") ? "active" : ""}
                    onPressedChange={() =>
                      !isDisabled && editor.chain().focus().redo().run()
                    }
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
                  className={editor.isActive("link") ? "active" : ""}
                  pressed={editor.isActive("table")}
                  onPressedChange={() => !isDisabled && addLink()}
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
                  className={editor.isActive("table") ? "active" : ""}
                  pressed={editor.isActive("table")}
                  onPressedChange={() =>
                    !isDisabled &&
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 4, withHeaderRow: true })
                      .run()
                  }
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
                  className={editor.isActive("rowAfter") ? "active" : ""}
                  pressed={editor.isActive("rowAfter")}
                  onPressedChange={() =>
                    !isDisabled && editor.chain().focus().addRowAfter().run()
                  }
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
                  className={editor.isActive("undo") ? "active" : ""}
                  onPressedChange={() =>
                    !isDisabled && editor.chain().focus().undo().run()
                  }
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
                  className={editor.isActive("redo") ? "active" : ""}
                  onPressedChange={() =>
                    !isDisabled && editor.chain().focus().redo().run()
                  }
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

      <AlertDialog open={showLinkDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter the URL</AlertDialogTitle>
          </AlertDialogHeader>
          <FormItem className="py-2">
            <FormControl>
              <Input
                type="text"
                placeholder="Enter the URL here..."
                value={linkUrl}
                onChange={handleUrlChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleLinkCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLinkSubmit}
              disabled={!isUrlValid}
            >
              Add URL
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
