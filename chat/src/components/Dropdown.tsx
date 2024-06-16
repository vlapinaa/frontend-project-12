import { NONAME } from "dns";
import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

interface DropdownProps {
  id: string;
  setId: (value: string) => void;
  setShow: (value: boolean) => void;
  setShowEdit: (value: boolean) => void;
}

function Dropdown({ id, setId, setShow, setShowEdit }: DropdownProps) {
  const { t } = useTranslation();
  return (
    <div className="channel-list__dropdown">
      <span className="visually-hidden">Управление каналом</span>
      <NavDropdown
        id="nav-dropdown-dark-example"
        title=""
        onClick={() => setId(id)}
      >
        <NavDropdown.Item
          onClick={() => {
            setShow(true);
          }}
        >
          {t("chat.channels.dropdown.delete")}
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={() => {
            setShowEdit(true);
          }}
        >
          {t("chat.channels.dropdown.editName")}
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}

export default Dropdown;
