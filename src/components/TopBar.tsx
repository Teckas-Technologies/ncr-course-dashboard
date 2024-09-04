"use client";
import {
  ArrowRightCircleIcon,
  MenuIcon,
  MenuSquareIcon,
  PanelRightCloseIcon,
  ShieldCloseIcon,
  SidebarCloseIcon,
  SidebarOpen,
  SidebarOpenIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState, useContext } from "react";
import "../app/style.css";
import ProgressComp from "./Progress";
import SocialMedia from "./SocialMedia";
import Link from "next/link";
import { NearContext } from "@/wallet/walletSelector";
import { useFetchStudentById, useSaveStudent } from "@/hook/StudentHook";
import { Student } from "@/types/types";
import { useFetchCourseModules } from "@/hook/CourseModuleHook";
import { usePathname } from "next/navigation";
import { adminId } from "../../utils/Constant";
import MintComponent from "../../utils/useMint";
import { useAccountIds } from "@/hook/AccountIdHook";
import { proxyContractAddress } from "../../utils/Constant";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import { getTxnStatus } from "@mintbase-js/rpc";
type PartialStudent = Pick<Student, "id">;
export default function TopBar() {
  const pathname = usePathname();
  const menus = [
    {
      name: "Home",
      path: "/",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { wallet, signedAccountId } = useContext(NearContext);
  const { saveStudent } = useSaveStudent();
  const { fetchStudentById } = useFetchStudentById();
  const { courseModules, error, loading } = useFetchCourseModules();
  const [student, setStudent] = useState<Student | null | undefined>(null);
  const { storeAccountIdData, fetchAccountById, fetchTransactionHash } =
    useAccountIds();
  const completedHomework =
    student?.homework.filter((lesson) => lesson.completed).length || 0;
  const totalLessons = courseModules?.reduce(
    (total: number, theModule: any) => total + theModule.lessons.length,
    0
  );
  let progress = 0;
  if (totalLessons) {
    let completedLessons: number = student?.homework.length || 0;
    progress = Math.round((completedLessons / totalLessons) * 100);
  }
  let currentModule = 0;
  let currentLesson = 0;
  if (student) {
    currentModule = student?.currentModule + 1;
    currentLesson = student?.currentLesson + 1;
  }

  const handleSignout = async () => {
    console.log("clicked logout");
    return wallet?.signOut();
  };

  const handleSignIn = async () => {
    console.log("clicked login");
    return wallet?.signIn();
  };
  const handleClose = () => {
    setShowSuccessPopup(false);
    window.location.href = "/course";
  };
  // const handleSave = async () => {
  //   console.log("Input value:", inputValue);

  //   try {
  //     await handleMint();
  //     console.log("Minting was successful");

  //     if (activeAccountId) {
  //       await storeId([activeAccountId]);
  //       console.log("Active Account ID stored after mint:", activeAccountId);
  //     }
  //   } catch (error) {
  //     console.error("Minting failed:", error);
  //   }
  // };

  useEffect(() => {
    if (signedAccountId) {
      const student: PartialStudent = {
        id: signedAccountId.toString(),
      };
      console.log("Active Account : ", signedAccountId);
      saveStudent(student);
    }
  }, [signedAccountId]);

  useEffect(() => {
    // if (isConnected) {
    if (signedAccountId) {
      fetchStudentById(signedAccountId.toString()).then((res) => {
        setStudent(res);
      });
    }
    // }
  }, [signedAccountId]);

  useEffect(() => {
    const fetchTransactionStatusAndHandleAccount = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const txnHash = searchParams.get("transactionHashes") || "";
      console.log("hash>>", txnHash);

      if (signedAccountId) {
        try {
          if (txnHash) {
            // Check if the transaction hash already exists in the database
            const existingTxn = await fetchTransactionHash(txnHash);

            if (existingTxn) {
              console.log("Transaction hash already exists in the database.");
            } else {
              const senderId = signedAccountId;
              const rpcUrl = "https://rpc.testnet.near.org";
              const txnStatus = await getTxnStatus(txnHash, senderId, rpcUrl);
              console.log("Transaction Status:", txnStatus);

              if (txnStatus === "success") {
                console.log("Storing ID and transaction hash...");
                console.log("Active Account ID:", signedAccountId);
                console.log("Transaction Hash:", txnHash);
                await storeAccountIdData(signedAccountId, txnHash);
                setShowSuccessPopup(true);
              }
            }
          }

          const storedData = await fetchAccountById(signedAccountId);
          console.log("Retrieved account>>", storedData);

          if (!storedData) {
            console.log("Active account ID not found in the database.");
            setShowAlert(true);
          } else {
            console.log(
              "Active account ID is already present in the database."
            );
            setShowAlert(false);
          }
        } catch (error) {
          console.error(
            "Error fetching transaction status or account data:",
            error
          );
        }
      } else {
        console.log("No transaction hash found in the URL.");
      }
    };

    fetchTransactionStatusAndHandleAccount();
  }, [signedAccountId]);

  // const handleSignIn = async () => {
  //     console.log("clicked login", activeAccountId);
  //     await connect().then(() => {
  //         if(activeAccountId){
  //             const student: PartialStudent = {
  //                 id: activeAccountId.toString()
  //             };
  //             console.log("Active Account : ", activeAccountId);
  //             saveStudent(student);
  //         }
  //     });
  //     return;
  // };

  // Pass arguments to MintComponent
  const { handleMint } = MintComponent();
  return (
    <>
      <div className="main-header">
        <div className="main-header-logo-icon">
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XIcon style={{ color: "#fff", height: "42px", width: "52px" }} />
            ) : (
              <MenuIcon
                style={{ color: "#fff", height: "42px", width: "52px" }}
              />
            )}{" "}
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 25, color: "#fff" }}>
            <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
              <span style={{ color: "#DF3276" }}> NCR</span> Course
            </Link>
          </h2>
        </div>
        <div className="header-right">
          <div className="profile-pic">
            {/* <img className='profile-pic' src="https://i.pinimg.com/originals/f8/f5/98/f8f598fb70de7de910b93b10ef7fb9e5.jpg" alt="pro" /> */}
          </div>
          <div className="navbar">
            {menus.map((menu, index) => (
              <Link
                href={menu.path}
                key={index}
                className={`nav-link ${pathname === menu.path ? "active" : ""}`}
              >
                {menu.name}
              </Link>
            ))}
            {signedAccountId && (
              <Link
                href="/course"
                className={`nav-link ${pathname === "/course" ? "active" : ""}`}
              >
                Course
              </Link>
            )}
            {signedAccountId && adminId.includes(signedAccountId) && (
              <Link
                href="/facilitator"
                className={`nav-link ${
                  pathname === "/facilitator" ? "active" : ""
                }`}
              >
                Facilitator
              </Link>
            )}
            {signedAccountId ? (
              <Link
                href="/profile"
                className={`nav-link ${
                  pathname === "/profile" ? "active" : ""
                }`}
              >
                Profile
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="header-profile-details">
            {signedAccountId ? (
              <div className="flex items-center gap-2">
                {/* <p className="text-white">{activeAccountId}</p> */}
                <button
                  className="px-4 py-2 flex action-btn rounded"
                  style={{
                    width: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 400,
                    backgroundColor: "#fff",
                  }}
                  onClick={handleSignout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18px"
                    viewBox="0 -960 960 960"
                    width="17px"
                    fill="#5f6368"
                  >
                    <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="px-4 py-2 flex action-btn rounded"
                style={{
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 400,
                  backgroundColor: "#fff",
                }}
                onClick={handleSignIn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="17px"
                  fill="#5f6368"
                >
                  <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
                </svg>
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
             {signedAccountId && (
              <div className="side-bar-list">
                <Link href="/course">
                  <div className="menu-item">
                    <p>Course</p>
                    <div className="arrow">
                      <ArrowRightCircleIcon />
                    </div>
                  </div>
                </Link>
              </div>
            )}
            {signedAccountId && adminId.includes(signedAccountId) && (
              <div className="side-bar-list">
                <Link href="/facilitator">
                  <div className="menu-item">
                    <p>Facilitator</p>
                    <div className="arrow">
                      <ArrowRightCircleIcon />
                    </div>
                  </div>
                </Link>
              </div>
            )}
            {signedAccountId && (
              <div className="side-bar-list">
                <Link href="/profile">
                  <div className="menu-item">
                    <p>Profile</p>
                    <div className="arrow">
                      <ArrowRightCircleIcon />
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <div className="top-bar-progress">
            {signedAccountId && student ? (
              <ProgressComp
                value={progress}
                currentModule={currentModule}
                currentLesson={currentLesson}
                homework={completedHomework}
              />
            ) : (
              <ProgressComp
                value={progress}
                currentModule={0}
                currentLesson={0}
                homework={completedHomework}
              />
            )}
            <SocialMedia />
          </div>
        </div>
      </div>
      {/* AlertDialog component */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogTrigger asChild>
          <div className="inline-block cursor-pointer">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Open Dialog
            </button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Welcome! Register here to claim your NFT and kickstart your
              learning journey🚀
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              onClick={handleMint}
              className="bg-[#df3276] text-white px-4 py-2 rounded-md"
            >
              Register
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <AlertDialogTrigger asChild>
          <div className="inline-block cursor-pointer">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Open Dialog
            </button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              You&apos;ve successfully claimed your NFT! 🎉 Now, jump in and
              start exploring your learning path 📚🚀
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              onClick={handleClose}
              className="bg-[#df3276] text-white px-4 py-2 rounded-md"
            >
              Get Started
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
