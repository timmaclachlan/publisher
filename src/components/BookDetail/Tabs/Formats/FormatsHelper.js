import { Typography } from "@mui/material";

export const PAPERBACK = 1;
export const HARDBACK = 2;
export const EBOOK = 3;
//const EBOOKNA = 32;
//const KUPAGESREAD = 64;

export const FIELD_PRICE = "price";
export const FIELD_ISBN = "isbn";
export const FIELD_WIDTH = "width";
export const FIELD_HEIGHT = "height";
export const FIELD_PAGECOUNT = "pagecount";
export const FIELD_ESTPAGECOUNT = "estpagecount";
export const FIELD_UNITCOST = "unitcost";
export const FIELD_ESTUNITCOST = "estunitcost";
export const FIELD_PAPERSTOCK = "paperstock";
export const FIELD_COVERLAMINATE = "coverlaminate";
export const FIELD_DISTRIBUTOR = "distributor";

export const getFormatDetails = (formats, format, field) => {
  if (Array.isArray(formats)) {
    let selectedFormat = getFormatData(formats, format);
    if (selectedFormat !== null) {
      if (selectedFormat.hasOwnProperty(field)) return selectedFormat[field];
    }
  }
  return null;
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

export const getDistributorPairs = () => {
  let dict = {
    KDP: "Kindle Direct Publishing",
    IS: "Ingram Spark",
    LS: "Lightning Source",
    PODWW: "Print on Demand World Wide",
  };
  return dict;
};

export const getPaperStockPairs = () => {
  let dict = {
    MCR: "Mono Creme",
    MWH: "Mono White",
    CSTD: "Colour 70/Standard",
    PREM: "Premium",
  };
  return dict;
};

export const getCoverLaminiatePairs = () => {
  let dict = {
    GLS: "Gloss",
    MAT: "Matt",
    GLSJ: "Gloss with Jacket",
    MATJ: "Matte with Jacket",
    GDCNJ: "Grey Digital Cloth NJ",
    BDCNJ: "Blue Digital Cloth NJ",
    GDCWJ: "Grey Digital Cloth WJ",
    BDCWJ: "Blue Digital Cloth WJ",
  };
  return dict;
};

export const getDistributorDisplayLabel = (value) => {
  let dict = getDistributorPairs();
  return dict[value];
};

export const getPaperStockDisplayLabel = (value) => {
  let dict = getPaperStockPairs();
  return dict[value];
};

export const getCoverLaminateDisplayLabel = (value) => {
  let dict = getCoverLaminiatePairs();
  return dict[value];
};
