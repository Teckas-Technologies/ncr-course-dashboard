import React, { useState, useEffect, useContext } from "react";
import { Copy } from "lucide-react";
import InlineSVG from "react-inlinesvg";
import Link from "next/link";
import { useFeedDesc } from "@/hook/useFeed";
import { NearContext } from "@/wallet/walletSelector";
import useNearSocialDB from "../../utils/useNearSocial";
import { useImage } from "../../utils/socialImage";
import { NEARSocialUserProfile } from "@/types/types";
import { adminId } from "../../utils/Constant";

export default function NearProfile() {
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState<NEARSocialUserProfile>();
  const [images, setImages] = useState<string[]>();
  const [showHeaderText, setShowHeaderText] = useState(true);
  const [showLinks, setShowLinks] = useState(false);
  const { getSocialProfile } = useNearSocialDB();
  const { data, isLoading } = useFeedDesc();
  const { getImage } = useImage();
  const { wallet, signedAccountId } = useContext(NearContext);

  const defaultImageUrl =
    "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg?w=768";

  const handleCopyClick = () => {
    const textToCopy = document.querySelector(".acc_id")?.textContent || "";
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 2000);
        })
        .catch((error) => {
          console.error("Failed to copy:", error);
        });
    }
  };

  // Extract the media URL from the data
  const mediaUrl = data?.mb_views_nft_tokens?.[0]?.media || "";
  console.log("Extracted media URL:", mediaUrl);

  useEffect(() => {
    if (signedAccountId) {
      const fetchProfile = async () => {
        try {
          const profileData = await getSocialProfile(signedAccountId);
          console.log("Near Data>>", profileData);

          setProfile(profileData);
          if (profileData) {
            const image = getImage({
              image: profileData?.image,
              type: "image",
            });
            const backgroundImage = getImage({
              image: profileData?.backgroundImage,
              type: "backgroundImage",
            });

            const images = await Promise.all([image, backgroundImage]);
            setImages(images);
          }
        } catch (err) {
          console.log("Error >> ", err);
        }
      };

      fetchProfile();
    }
  }, [signedAccountId, accountId, edit]);

  const handleIconClick = () => {
    setShowHeaderText(!showHeaderText);
    setShowLinks(!showLinks);
  };

  return (
    <>
      <div className="background">
        <div className="background-color" />
      </div>
      <div className="profile-container">
        <div className="profile-info">
          <img
            className="profile-image"
            src={images?.[0] || defaultImageUrl}
            alt="Profile"
          />
        </div>
        <div className="profile-details">
          <h2>{profile?.name || ""}</h2>
          {signedAccountId && (
            <div className="acc-id-container">
              <p className="acc_id">{signedAccountId}</p>
              <div className="copy_id" style={{ position: "relative" }}>
                <Copy className="copy-icon" onClick={handleCopyClick} />
                <div className={`toast-container ${showToast ? "show" : ""}`}>
                  Copied
                </div>
              </div>
            </div>
          )}
          {signedAccountId && (
            <div className="nft-badge">
              <div className="circle">
                <img
                  className="nft-image"
                  src={mediaUrl || defaultImageUrl}
                  alt="NFT"
                />
              </div>
              <div className="rectangle">
                <span className="role-text">
                  {adminId.includes(signedAccountId)
                    ? "Facilitator"
                    : "Student"}
                </span>
              </div>
            </div>
          )}

          {/* Social Links Section */}
          {(profile?.linktree?.github ||
            profile?.linktree?.telegram ||
            profile?.linktree?.twitter ||
            profile?.linktree?.website) && (
            <div
              className={`social-links ${showLinks ? "expanded" : ""}`}
              id="card-social"
            >
              <div className="social-links-header" onClick={handleIconClick}>
                <InlineSVG
                  src="/images/plus.svg"
                  className={`icon ${showLinks ? "rotated" : ""}`}
                />
                {showHeaderText && (
                  <span className="header-text">My social networks</span>
                )}
              </div>

              <ul className={`social-links-list ${showLinks ? "show" : ""}`}>
                {profile?.linktree?.twitter && (
                  <li>
                    <Link
                      href={`${
                        profile?.linktree?.twitter?.includes("https://x.com/")
                          ? profile?.linktree?.twitter
                          : `https://x.com/${profile?.linktree?.twitter}`
                      }`}
                      className="social-link"
                    >
                      <InlineSVG
                        src="/images/twitter.svg"
                        className="social-icon"
                      />
                    </Link>
                  </li>
                )}
                {profile?.linktree?.telegram && (
                  <li>
                    <Link
                      href={`${
                        profile?.linktree?.telegram?.includes("https://t.me/")
                          ? profile?.linktree?.telegram
                          : `https://t.me/${profile?.linktree?.telegram}`
                      }`}
                      className="social-link"
                    >
                      <InlineSVG
                        src="/images/telegram.svg"
                        className="social-icon"
                      />
                    </Link>
                  </li>
                )}
                {profile?.linktree?.github && (
                  <li>
                    <Link
                      href={`${
                        profile?.linktree?.github?.includes(
                          "https://github.com/"
                        )
                          ? profile?.linktree?.github
                          : `https://github.com/${profile?.linktree?.github}`
                      }`}
                      className="social-link"
                    >
                      <InlineSVG
                        src="/images/github.svg"
                        className="social-icon"
                      />
                    </Link>
                  </li>
                )}
                {profile?.linktree?.website && (
                  <li>
                    <Link
                      href={`${
                        profile?.linktree?.website?.includes("http")
                          ? profile?.linktree?.website
                          : `https://${profile?.linktree?.website}`
                      }`}
                      className="social-link"
                    >
                      <InlineSVG
                        src="/images/website.svg"
                        className="social-icon"
                      />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
