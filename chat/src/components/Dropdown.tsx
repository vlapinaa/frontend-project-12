import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import {
  openModalEdit,
  openModalRemove,
  setChannelId,
} from "store/modalsSlice";

interface DropdownProps {
  id: string;
}

function Dropdown({ id }: DropdownProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="channel-list__dropdown">
      <span className="visually-hidden">Управление каналом</span>
      <NavDropdown
        id="nav-dropdown-dark-example"
        title=""
        onClick={() => dispatch(setChannelId(id))}
      >
        <NavDropdown.Item
          onClick={() => {
            dispatch(openModalRemove());
          }}
        >
          {t("chat.channels.dropdown.delete")}
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={() => {
            dispatch(openModalEdit());
          }}
        >
          {t("chat.channels.dropdown.editName")}
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}

export default Dropdown;
