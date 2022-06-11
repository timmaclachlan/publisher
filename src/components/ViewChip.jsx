import React from "react";

import { Chip, Tooltip } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { ValueCache } from "ag-grid-community";

const ViewChip = ({
  label,
  value,
  mykey,
  color,
  tooltipTrue,
  tooltipFalse,
  tooltip,
  size,
  variant,
  width,
  onClick,
}) => {
  const getVariant = () => {
    if (variant) return variant;
    if (value) return "contained";
    if (!value) return "outlined";
    return "contained";
  };

  const renderViewChip = (text, key) => {
    let tooltipTitle = "";

    if (tooltip) {
      tooltipTitle = tooltip;
    } else {
      if (tooltipTrue && value) {
        tooltipTitle = tooltipTrue;
      } else {
        tooltipTitle = tooltipFalse;
      }
    }
    if (tooltipTitle) {
      return (
        <Tooltip title={tooltipTitle}>
          <Chip
            key={key}
            label={text}
            color={color ? color : "primary"}
            variant={getVariant()}
            icon={value ? <DoneIcon /> : <CloseIcon />}
            size={size}
            sx={{ width: width, mr: 1 }}
            onClick={onClick}
          />
        </Tooltip>
      );
    } else {
      return (
        <Chip
          key={key}
          label={text}
          color={color ? color : "primary"}
          variant={getVariant()}
          icon={value ? <DoneIcon /> : <CloseIcon />}
          size={size}
          sx={{ width: width, mr: 1 }}
          onClick={onClick}
        />
      );
    }
  };

  if (label) {
    let chips = label.split(",");
    if (chips.length > 1) {
      return chips.map((text, index) => {
        return renderViewChip(text, "service-" + index);
      });
    } else {
      return renderViewChip(label, mykey);
    }
  }
  return null;
};

export default ViewChip;
