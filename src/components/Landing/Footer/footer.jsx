import React from "react";
import "./footer.css";

const footer = () => {
  return (
    <footer>
      <div className="footer_bg" id="footerBg">
        <div className="footer_container_container">
          <div className="main_footer">
            <div className="footer_info">
              <img className="footer_img" src="/assets/logowhite.png"></img>
              <h3>Leafy</h3>
              <p className="info2" id="info2">
                Find us On
              </p>
            </div>
            <div className="footer_social">
              <a href="https://www.linkedin.com/in/angelos-tsounis/">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
              <a href="https://github.com/AngelosTsounis">
                <ion-icon name="logo-github"></ion-icon>
              </a>
              <a href="mailto:aggelostsounis@hotmail.com">
                <ion-icon name="mail-outline"></ion-icon>
              </a>
            </div>
          </div>
          <div className="footer_copy">
            2025 &#169; Leafy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
