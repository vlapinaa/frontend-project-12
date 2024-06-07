import React from "react";
import felixLogo from "images/felixLogo.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Header() {
  const { t } = useTranslation();
  const handleExit = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="header">
      <Link to="/" className="header__logo">
        <img src={felixLogo} alt="felix" />
        <p className="header__logo__text">Hexlet Chat</p>
      </Link>
      {localStorage.getItem("token") && (
        <button type="button" className="exit-chat" onClick={handleExit}>
          {t("header.buttonExit")}
        </button>
      )}
    </div>
  );
}

export default Header;
