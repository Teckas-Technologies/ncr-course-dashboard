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
  YoutubeIcon,
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
  toolbar?: boolean;
};

export function Toolbar({
  editor,
  setEditable,
  disabled,
  disableEdit,
  setDisableEdit,
  toolbar,
}: Props) {
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkPosition, setLinkPosition] = useState({ top: 0, left: 0 });

  const [showTYLinkDialog, setShowYTLinkDialog] = useState(false);
  const [YTLinkUrl, setYTLinkUrl] = useState("");

  const [isDisabled, setIsDisabled] = useState(disabled);
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isYTUrlValid, setIsYTUrlValid] = useState(false);

  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    setIsDisabled(disableEdit);
    setDisableEdit();
  }, [disableEdit]);

  const setEditableTool = () => {
    setIsDisabled(false);
    setEditable();
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

  const addVideo = () => {
    setShowYTLinkDialog(!showTYLinkDialog);
  };

  const handleYTLinkSubmit = () => {
    if (editor && YTLinkUrl.trim() !== "") {
      const embedUrl = YTLinkUrl.replace("watch?v=", "embed/");
      editor
        .chain()
        .focus()
        .setYoutubeVideo({ src: embedUrl })
        .run();
      setYTLinkUrl("");
    }
    setShowYTLinkDialog(false);
  };

  const handleYTLinkCancel = () => {
    setShowYTLinkDialog(false);
  };

  const handleYTUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setYTLinkUrl(url);
    setIsYTUrlValid(url.startsWith("https://"));
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
                  editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
                }
                pressed={editor.isActive("heading")}
                onPressedChange={() =>
                  toolbar &&
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
                className={editor.isActive("bold") ? "bg-gray-300" : ""}
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  toolbar &&
                  !isDisabled &&
                  editor.chain().focus().toggleBold().run()
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
                className={editor.isActive("italic") ? "bg-gray-300" : ""}
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  toolbar &&
                  !isDisabled &&
                  editor.chain().focus().toggleItalic().run()
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
                className={editor.isActive("strike") ? "bg-gray-300" : ""}
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                  toolbar &&
                  !isDisabled &&
                  editor.chain().focus().toggleStrike().run()
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
                className={editor.isActive("bulletList") ? "bg-gray-300" : ""}
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                  toolbar &&
                  !isDisabled &&
                  editor.chain().focus().toggleBulletList().run()
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
                className={editor.isActive("orderedList") ? "bg-gray-300" : ""}
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                  toolbar &&
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
                className={toolbar ? "bg-gray-300" : ""}
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
                    className={editor.isActive("codeBlock") ? "bg-gray-300" : ""}
                    pressed={editor.isActive("codeBlock")}
                    onPressedChange={() =>
                      toolbar &&
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
                    className={editor.isActive("link") ? "bg-gray-300" : ""}
                    pressed={editor.isActive("link")}
                    onPressedChange={() => toolbar && !isDisabled && addLink()}
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
                    className={editor.isActive("table") ? "bg-gray-300" : ""}
                    pressed={editor.isActive("table")}
                    onPressedChange={() =>
                      toolbar &&
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
                    className={editor.isActive("rowAfter") ? "bg-gray-300" : ""}
                    pressed={editor.isActive("rowAfter")}
                    onPressedChange={() =>
                      toolbar &&
                      !isDisabled &&
                      editor.chain().focus().addRowAfter().run()
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
                    className={editor.isActive("undo") ? "bg-gray-300" : ""}
                    pressed={editor.isActive("undo")}
                    onPressedChange={() =>
                      toolbar &&
                      !isDisabled &&
                      editor.chain().focus().undo().run()
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
                    className={editor.isActive("redo") ? "bg-gray-300" : ""}
                    pressed={editor.isActive("redo")}
                    onPressedChange={() =>
                      toolbar &&
                      !isDisabled &&
                      editor.chain().focus().redo().run()
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Toggle
                    size="sm"
                    className={editor.isActive("link") ? "bg-gray-300" : ""}
                    pressed={editor.isActive("link")}
                    onPressedChange={() => toolbar && !isDisabled && addVideo()}
                  >
                    <YoutubeIcon className="h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Youtube</p>
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
                  className={editor.isActive("link") ? "bg-gray-300" : ""}
                  pressed={editor.isActive("table")}
                  onPressedChange={() => toolbar && !isDisabled && addLink()}
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
                  className={editor.isActive("table") ? "bg-gray-300" : ""}
                  pressed={editor.isActive("table")}
                  onPressedChange={() =>
                    toolbar &&
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
                  className={editor.isActive("rowAfter") ? "bg-gray-300" : ""}
                  pressed={editor.isActive("rowAfter")}
                  onPressedChange={() =>
                    toolbar &&
                    !isDisabled &&
                    editor.chain().focus().addRowAfter().run()
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
                  className={editor.isActive("undo") ? "bg-gray-300" : ""}
                  pressed={editor.isActive("undo")}
                  onPressedChange={() =>
                    toolbar &&
                    !isDisabled &&
                    editor.chain().focus().undo().run()
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
                  className={editor.isActive("redo") ? "bg-gray-300" : ""}
                  pressed={editor.isActive("redo")}
                  onPressedChange={() =>
                    toolbar &&
                    !isDisabled &&
                    editor.chain().focus().redo().run()
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
          <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Toggle
                    size="sm"
                    className={editor.isActive("link") ? "bg-gray-300" : ""}
                    pressed={editor.isActive("link")}
                    onPressedChange={() => toolbar && !isDisabled && addVideo()}
                  >
                    <YoutubeIcon className="h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Youtube</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </div>
      )}

      <AlertDialog open={showTYLinkDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter the video URL</AlertDialogTitle>
          </AlertDialogHeader>
          <FormItem className="py-2">
            <FormControl>
              <Input
                type="text"
                placeholder="Enter the youtube video URL here..."
                value={YTLinkUrl}
                onChange={handleYTUrlChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleYTLinkCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleYTLinkSubmit}
              disabled={!isYTUrlValid}
            >
              Add URL
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
