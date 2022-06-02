import React from "react";

import {
  Typography,
  Grid,
  Checkbox,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

import {
  PAPERBACK,
  HARDBACK,
  EBOOK,
  FIELD_COVERLAMINATE,
  FIELD_PAGECOUNT,
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_UNITCOST,
  FIELD_ESTUNITCOST,
  FIELD_PAPERSTOCK,
  FIELD_ESTPAGECOUNT,
  FIELD_PRICE,
  FIELD_ISBN,
  FIELD_DISTRIBUTOR,
  getFormatEnabled,
  getFormatDetails,
  getDistributorPairs,
  getPaperStockPairs,
  getCoverLaminiatePairs,
} from "./FormatsHelper";

const FormatsEdit = ({
  formats,
  onChange,
  onPaperbackCheckChange,
  onHardbackCheckChange,
  onEbookCheckChange,
}) => {
  let paperbackEnabled = getFormatEnabled(formats, PAPERBACK);
  let hardbackEnabled = getFormatEnabled(formats, HARDBACK);
  let ebookEnabled = getFormatEnabled(formats, EBOOK);

  debugger;

  const distributorPairs = getDistributorPairs();
  const distributorValues = Object.keys(distributorPairs);
  const paperstockPairs = getPaperStockPairs();
  const paperstockValues = Object.keys(paperstockPairs);
  const coverlaminatePairs = getCoverLaminiatePairs();
  const coverlaminateValues = Object.keys(coverlaminatePairs);

  const renderFormat = (format, formatDisplay, enabledFlag, onChecked) => {
    const renderPair = (pair, pairDisplay) => {
      return pair.map((value, index) => {
        return (
          <MenuItem key={value} value={value}>
            {pairDisplay[value]}
          </MenuItem>
        );
      });
    };

    return (
      <>
        <Grid item md={12}></Grid>

        {/* Row 1 */}
        <Grid item md={1}>
          <Checkbox
            checked={enabledFlag}
            sx={{ ml: 4, mt: -0.5 }}
            onChange={onChecked}
          />
        </Grid>

        <Grid item md={2}>
          <Typography variant="h6" align="start">
            {formatDisplay}
          </Typography>
        </Grid>

        <Grid item md={2}>
          <TextField
            variant="outlined"
            disabled={!enabledFlag}
            label="Price"
            value={getFormatDetails(formats, format, FIELD_PRICE)}
            onChange={(ev, format, field) => onChange(ev, format, FIELD_PRICE)}
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            variant="outlined"
            label="Isbn"
            disabled={!enabledFlag}
            value={getFormatDetails(formats, format, FIELD_ISBN)}
            onChange={(ev) => onChange(ev, format, FIELD_ISBN)}
          />
        </Grid>

        <Grid item md={4}>
          <FormControl fullWidth>
            <InputLabel id="distributor">Distributor</InputLabel>
            <Select
              labelId="distributor"
              label="Distributor"
              disabled={!enabledFlag}
              value={getFormatDetails(formats, format, FIELD_DISTRIBUTOR)}
              onChange={(ev) => onChange(ev, format, FIELD_DISTRIBUTOR)}
            >
              <MenuItem value="">
                <em>[Not Set]</em>
              </MenuItem>
              {renderPair(distributorValues, distributorPairs)}
            </Select>
          </FormControl>
        </Grid>

        {/* Row 2 */}
        <Grid item md={3}></Grid>

        <Grid item md={2.5}>
          <TextField
            variant="outlined"
            disabled={!enabledFlag}
            label="Est. Page Count"
            value={getFormatDetails(formats, format, FIELD_ESTPAGECOUNT)}
            onChange={(ev) => onChange(ev, format, FIELD_ESTPAGECOUNT)}
          ></TextField>
        </Grid>

        {format !== EBOOK && (
          <Grid item md={2}>
            <TextField
              variant="outlined"
              disabled={!enabledFlag}
              label="Est. Unit Cost"
              value={getFormatDetails(formats, format, FIELD_ESTUNITCOST)}
              onChange={(ev) => onChange(ev, format, FIELD_ESTUNITCOST)}
            ></TextField>
          </Grid>
        )}

        <Grid item md={1.5}>
          <TextField
            variant="outlined"
            disabled={!enabledFlag}
            label="Width"
            value={getFormatDetails(formats, format, FIELD_WIDTH)}
            onChange={(ev) => onChange(ev, format, FIELD_WIDTH)}
          ></TextField>
        </Grid>
        {format === EBOOK && (
          <>
            <Grid item md={1.5}>
              <TextField
                variant="outlined"
                disabled={!enabledFlag}
                label="Height"
                value={getFormatDetails(formats, format, FIELD_HEIGHT)}
                onChange={(ev) => onChange(ev, format, FIELD_HEIGHT)}
              ></TextField>
            </Grid>
            <Grid item md={2.5}>
              <TextField
                variant="outlined"
                disabled={!enabledFlag}
                label="Act. Page Count"
                value={getFormatDetails(formats, format, FIELD_PAGECOUNT)}
                onChange={(ev) => onChange(ev, format, FIELD_PAGECOUNT)}
              ></TextField>
            </Grid>
          </>
        )}

        {format !== EBOOK && (
          <Grid item md={3}>
            <FormControl fullWidth>
              <InputLabel id="paperstock">Paper Stock</InputLabel>
              <Select
                labelId="paperstock"
                label="Paper Stock"
                disabled={!enabledFlag}
                value={getFormatDetails(formats, format, FIELD_PAPERSTOCK)}
                onChange={(ev) => onChange(ev, format, FIELD_PAPERSTOCK)}
              >
                <MenuItem value="">
                  <em>[Not Set]</em>
                </MenuItem>
                {renderPair(paperstockValues, paperstockPairs)}
              </Select>
            </FormControl>
          </Grid>
        )}

        {/* Row 3 */}

        <Grid item md={3}></Grid>

        {format !== EBOOK && (
          <>
            <Grid item md={2.5}>
              <TextField
                variant="outlined"
                disabled={!enabledFlag}
                label="Act. Page Count"
                value={getFormatDetails(formats, format, FIELD_PAGECOUNT)}
                onChange={(ev) => onChange(ev, format, FIELD_PAGECOUNT)}
              ></TextField>
            </Grid>

            <Grid item md={2}>
              <TextField
                variant="outlined"
                disabled={!enabledFlag}
                label="Act. Unit Cost"
                value={getFormatDetails(formats, format, FIELD_UNITCOST)}
                onChange={(ev) => onChange(ev, format, FIELD_UNITCOST)}
              ></TextField>
            </Grid>

            <Grid item md={1.5}>
              <TextField
                variant="outlined"
                disabled={!enabledFlag}
                label="Height"
                value={getFormatDetails(formats, format, FIELD_HEIGHT)}
                onChange={(ev) => onChange(ev, format, FIELD_HEIGHT)}
              ></TextField>
            </Grid>
            <Grid item md={3}>
              <FormControl fullWidth>
                <InputLabel id="coverlaminate">Cover Laminate</InputLabel>
                <Select
                  labelId="coverlaminate"
                  label="Cover Laminate"
                  disabled={!enabledFlag}
                  value={getFormatDetails(formats, format, FIELD_COVERLAMINATE)}
                  onChange={(ev) => onChange(ev, format, FIELD_COVERLAMINATE)}
                >
                  <MenuItem value="">
                    <em>[Not Set]</em>
                  </MenuItem>
                  {renderPair(coverlaminateValues, coverlaminatePairs)}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
      </>
    );
  };

  return (
    <Grid container spacing={2}>
      {renderFormat(
        PAPERBACK,
        "Paperback",
        paperbackEnabled,
        onPaperbackCheckChange
      )}
      {renderFormat(
        HARDBACK,
        "Hardback",
        hardbackEnabled,
        onHardbackCheckChange
      )}
      {renderFormat(EBOOK, "E-Book", ebookEnabled, onEbookCheckChange)}
    </Grid>
  );
};

export default FormatsEdit;
