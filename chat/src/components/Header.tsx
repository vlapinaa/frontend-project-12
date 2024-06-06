import React from "react";
import felixLogo from "images/felixLogo.png";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();
  const handleExit = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="header">
      <a href="http://localhost:3000/login">
        <img src={felixLogo} alt="felix" className="header__logo" />
      </a>
      {localStorage.getItem("token") && (
        <button type="button" className="exit-chat" onClick={handleExit}>
          {t("header.buttonExit")}
        </button>
      )}
    </div>
  );
}

export default Header;
