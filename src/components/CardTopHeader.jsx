import React from "react";

import { CardHeader } from "@mui/material";

import CardTop from "./CardTop";

const CardTopHeader = (props) => {
  return (
    <CardHeader
      sx={{ p: 0, m: 0 }}
      subheader={
        <CardTop
          title={props.title}
          icon={props.icon}
          allowEdit={props.allowEdit}
          editMode={props.editMode}
          onEditClick={props.onEditClick}
        />
      }
    />
  );
};

export default CardTopHeader;
