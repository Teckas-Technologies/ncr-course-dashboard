import React from "react";
import { ChevronLeft } from "lucide-react";
interface ButtonPrevious {
  setshowProfileDetails: (value: boolean) => void;
}

export default function NearProfileDetails({
  setshowProfileDetails,
}: ButtonPrevious) {
  function handleBack() {
    setshowProfileDetails(false);
  }
  return (
    <div className="account-settings">
      <div className="settings-header">
        <button className="btn settings" onClick={handleBack}>
          {" "}
          <ChevronLeft className="chevron-icon" />
          Back
        </button>
      </div>
      <div className="user-info">
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter Your Name" />
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input type="file" placeholder="Enter Your Name" />
        </div>
        <div className="form-group">
          <label>Background Image</label>
          <input type="file" placeholder="Enter Your Name" />
        </div>
        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            placeholder="Rust, Engineer, Artist, nft, learner"
          />
        </div>
        <div className="form-group">
          <label>About</label>
          <textarea placeholder="Enter about yourself"></textarea>
        </div>
        <div className="form-group">
          <label>Twitter</label>
          <input type="text" placeholder="Enter twitter account" />
        </div>
        <div className="form-group">
          <label>Github</label>
          <input type="text" placeholder="Enter Github account" />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input type="text" placeholder="Enter website url" />
        </div>
        <div className="form-group">
          <label>Telegram</label>
          <input type="text" placeholder="Enter telegram account" />
        </div>
        <div className="form-buttons">
          <button className="btn save">Save</button>
        </div>
      </div>
    </div>
  );
}
