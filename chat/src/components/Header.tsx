import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import routes from "helpers/routes";

function Header() {
  const { t } = useTranslation();
  const handleExit = () => {
    localStorage.removeItem("token");
    window.location.href = routes.login;
  };

  return (
    <div className="header">
      <Link to={routes.main} className="header__logo">
        <img src="https://i.ibb.co/P10WgvT/felix-Logo.png" alt="felix" />
        <p className="header__text">Felix Chat</p>
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
