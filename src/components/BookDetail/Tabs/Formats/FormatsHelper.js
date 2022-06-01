import { Typography } from "@mui/material";

export const PAPERBACK = 1;
export const HARDBACK = 2;
export const EBOOK = 3;
//const EBOOKNA = 32;
//const KUPAGESREAD = 64;

export const FIELD_WIDTH = "width";
export const FIELD_HEIGHT = "height";
export const FIELD_PAGECOUNT = "pagecount";
export const FIELD_ESTPAGECOUNT = "estpagecount";
export const FIELD_UNITCOST = "unitcost";
export const FIELD_ESTUNITCOST = "estunitcost";
export const FIELD_PAPERSTOCK = "paperstock";
export const FIELD_COVERLAMINATE = "coverlaminate";

const EBOOK_FIELDS = [FIELD_PAGECOUNT, FIELD_ESTPAGECOUNT];
const PAPERBACK_FIELDS = [
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_PAGECOUNT,
  FIELD_ESTPAGECOUNT,
  FIELD_UNITCOST,
  FIELD_ESTUNITCOST,
  FIELD_PAPERSTOCK,
  FIELD_COVERLAMINATE,
];
const HARDBACK_FIELDS = [
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_PAGECOUNT,
  FIELD_ESTPAGECOUNT,
  FIELD_UNITCOST,
  FIELD_ESTUNITCOST,
  FIELD_PAPERSTOCK,
  FIELD_COVERLAMINATE,
];

export const getFormatDetails = (formats, format, field) => {
  if (Array.isArray(formats)) {
    let selectedFormat = getFormatData(formats, format);
    if (selectedFormat !== null) {
      if (selectedFormat.hasOwnProperty(field)) return selectedFormat[field];
    }
  }
  return null;
};

export const getFormatFields = (format) => {
    switch (format) {
      case PAPERBACK:
        return PAPERBACK_FIELDS;
      case HARDBACK:
        return HARDBACK_FIELDS;
      case EBOOK:
        return EBOOK_FIELDS;
      default:
    }
  };

const getFormatData = (formats, format) => {
  if (Array.isArray(formats)) {
    let selectedFormats = formats.filter(
      (item) => item.format === parseInt(format)
    );
    if (selectedFormats.length > 0) {
      return selectedFormats[0];
    }
  }
  return null;
};

export const getFormatEnabled = (formats, format) => {
    let selectedFormat = getFormatData(formats, format);
    if (selectedFormat) {
      if (selectedFormat.enabled === undefined) return true;
      return selectedFormat.enabled;
    }
};
  
export const renderFormatFieldDetail = (formats, format, field) => {
    let detail = "";
    if (formats) {
      detail = getFormatDetails(formats, format, field);
    }
    return renderFormatDetail(detail);
};
  
export const renderFormatDetail = (text) => {
    let outputText = "-";
    if (text) {
      outputText = text;
    }
    return (
      <Typography variant="subtitle1" align="center">
        {outputText}
      </Typography>
    );
  };