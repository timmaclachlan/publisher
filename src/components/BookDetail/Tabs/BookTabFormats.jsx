import React from "react";
import Barcode from "react-barcode";

import {
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Divider,
  Checkbox,
  TextField,
  Box,
} from "@mui/material";

import LoadingOverlay from "../../LoadingOverlay";

import { isEmptyObject, getFormattedCurrency } from "../../../utils";

const PAPERBACK = 1;
const HARDBACK = 2;
const EBOOK = 3;
//const EBOOKNA = 32;
//const KUPAGESREAD = 64;

const BookTabFormats = ({ formats, editMode, onChange, onEnableChange }) => {
  const loading = isEmptyObject(formats);

  const getFormatData = (format) => {
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

  const getFormatEnabled = (format) => {
    let selectedFormat = getFormatData(format);
    if (selectedFormat) {
      if (selectedFormat.enabled === undefined) return true;
      return selectedFormat.enabled;
    }
  };

  let paperbackEnabled = getFormatEnabled(PAPERBACK);
  let hardbackEnabled = getFormatEnabled(HARDBACK);
  let ebookEnabled = getFormatEnabled(EBOOK);

  const onPaperbackCheckChange = (ev) => {
    onEnableChange(PAPERBACK, ev.target.checked);
  };

  const onHardbackCheckChange = (ev) => {
    onEnableChange(HARDBACK, ev.target.checked);
  };

  const onEbookCheckChange = (ev) => {
    onEnableChange(EBOOK, ev.target.checked);
  };

  const renderFormatDetail = (text) => {
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

  const getFormatDetails = (format, field) => {
    if (Array.isArray(formats)) {
      let selectedFormat = getFormatData(format);
      if (selectedFormat !== null) {
        if (selectedFormat.hasOwnProperty(field)) return selectedFormat[field];
      }
    }
    return null;
  };

  const renderFormatFieldDetail = (format, field) => {
    let detail = "";
    if (formats) {
      detail = getFormatDetails(format, field);
    }
    return renderFormatDetail(detail);
  };

  const CardTop = (props) => {
    return (
      <Box sx={{ backgroundColor: "primary.main" }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" color="white" sx={{ pl: 1 }}>
            {props.title}
          </Typography>
          <Typography variant="h6" color="white">
            {getFormattedCurrency(getFormatDetails(props.format, "price"))}
          </Typography>

          <Typography variant="h6" color="white">
            {getFormatDetails(props.format, "isbn")}
          </Typography>

          <Typography variant="h6" color="white" sx={{ pr: 1 }}>
            Ingram Spark
          </Typography>
        </Stack>
      </Box>
    );
  };

  const renderFormatCard = (format, formatDisplay) => {
    return (
      <>
        <Grid item md={10}>
          <Card>
            <CardHeader
              sx={{ p: 0, m: 0 }}
              subheader={<CardTop format={format} title={formatDisplay} />}
            ></CardHeader>
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Width
                    </Typography>

                    <Typography variant="subtitle1" align="center">
                      {renderFormatFieldDetail(format, "width")}
                    </Typography>
                  </Stack>
                  <Divider orientation="vertical" flexItem />

                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Height
                    </Typography>

                    <Typography variant="subtitle1" align="center">
                      {renderFormatFieldDetail(format, "height")}
                    </Typography>
                  </Stack>
                  <Divider orientation="vertical" flexItem />

                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Est. Page Count
                    </Typography>

                    <Typography variant="subtitle1" align="center">
                      {renderFormatFieldDetail(format, "estpagecount")}
                    </Typography>
                  </Stack>

                  <Divider orientation="vertical" flexItem />
                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Act. Page Count
                    </Typography>

                    <Typography variant="subtitle1" align="center">
                      {renderFormatFieldDetail(format, "pagecount")}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Est. Unit Cost
                    </Typography>

                    <Typography variant="subtitle1" align="center">
                      {renderFormatFieldDetail(format, "estunitcost")}
                    </Typography>
                  </Stack>

                  <Divider orientation="vertical" flexItem />
                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Act. Unit Cost
                    </Typography>

                    <Typography variant="subtitle1" align="center">
                      {renderFormatFieldDetail(format, "unitcost")}
                    </Typography>
                  </Stack>

                  <Divider orientation="vertical" flexItem />
                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Paper Stock
                    </Typography>

                    <Typography variant="subtitle1" align="center">
                      {renderFormatFieldDetail(format, "paperstock")}
                    </Typography>
                  </Stack>

                  <Divider orientation="vertical" flexItem />
                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Cover Laminate
                    </Typography>

                    <Typography variant="subtitle1" align="center">
                      {renderFormatFieldDetail(format, "coverlaminate")}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={2}>
          <Box sx={{ pt: 5 }}>
            <Barcode
              value={getFormatDetails(format, "isbn")}
              height={50}
              width={1}
            />
          </Box>
        </Grid>
      </>
    );
  };

  const renderControls = () => {
    if (!editMode) {
      return (
        <>
          {loading && <LoadingOverlay />}
          <Grid container spacing={2}>
            {paperbackEnabled && renderFormatCard(PAPERBACK, "Paperback")}
            {hardbackEnabled && renderFormatCard(HARDBACK, "Hardback")}
            {ebookEnabled && renderFormatCard(EBOOK, "E-Book")}
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Card>
                <CardHeader subheader="Edit Formats"></CardHeader>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <Stack sx={{ flex: 0.25 }} spacing={4}>
                        <Typography variant="subtitle2" align="center">
                          Format
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          <Stack direction="row">
                            <Checkbox
                              checked={paperbackEnabled}
                              sx={{ padding: 0, pr: 1 }}
                              onChange={onPaperbackCheckChange}
                            />
                            Paperback
                          </Stack>
                        </Typography>

                        <Stack direction="row" sx={{ pt: 1 }}>
                          <Checkbox
                            checked={hardbackEnabled}
                            sx={{ padding: 0, pr: 1 }}
                            onChange={onHardbackCheckChange}
                          />

                          <Typography variant="subtitle1" align="center">
                            Hardback
                          </Typography>
                        </Stack>

                        <Stack direction="row" sx={{ pt: 1 }}>
                          <Checkbox
                            checked={ebookEnabled}
                            sx={{ padding: 0, pr: 1 }}
                            onChange={onEbookCheckChange}
                          />
                          <Typography variant="subtitle1" align="center">
                            E-Book
                          </Typography>
                        </Stack>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.25 }} spacing={2}>
                        <Typography variant="subtitle2" align="center">
                          Price
                        </Typography>
                        <TextField
                          variant="outlined"
                          disabled={!paperbackEnabled}
                          value={getFormatDetails(PAPERBACK, "price")}
                          onChange={(ev, format, field) =>
                            onChange(ev, PAPERBACK, "price")
                          }
                        />
                        <TextField
                          variant="outlined"
                          disabled={!hardbackEnabled}
                          value={getFormatDetails(HARDBACK, "price")}
                          onChange={(ev) => onChange(ev, HARDBACK, "price")}
                        />
                        <TextField
                          variant="outlined"
                          disabled={!ebookEnabled}
                          value={getFormatDetails(EBOOK, "price")}
                          onChange={(ev) => onChange(ev, EBOOK, "price")}
                        />
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.75 }} spacing={2}>
                        <Typography variant="subtitle2" align="center">
                          Isbn
                        </Typography>
                        <TextField
                          variant="outlined"
                          disabled={!paperbackEnabled}
                          value={getFormatDetails(PAPERBACK, "isbn")}
                          onChange={(ev) => onChange(ev, PAPERBACK, "isbn")}
                        />
                        <TextField
                          variant="outlined"
                          disabled={!hardbackEnabled}
                          value={getFormatDetails(HARDBACK, "isbn")}
                          onChange={(ev) => onChange(ev, HARDBACK, "isbn")}
                        />
                        <TextField
                          variant="outlined"
                          disabled={!ebookEnabled}
                          value={getFormatDetails(EBOOK, "isbn")}
                          onChange={(ev) => onChange(ev, EBOOK, "isbn")}
                        />
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Distributor
                        </Typography>

                        {renderFormatDetail("Ingram Spark")}
                        {renderFormatDetail("Ingram Spark")}
                        {renderFormatDetail("Ingram Spark")}
                      </Stack>

                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }} spacing={2}>
                        <Typography variant="subtitle2" align="center">
                          Width
                        </Typography>

                        <TextField
                          variant="outlined"
                          disabled={!paperbackEnabled}
                          value={getFormatDetails(PAPERBACK, "width")}
                          onChange={(ev) => onChange(ev, PAPERBACK, "width")}
                        />
                        <TextField
                          variant="outlined"
                          disabled={!hardbackEnabled}
                          value={getFormatDetails(HARDBACK, "width")}
                          onChange={(ev) => onChange(ev, HARDBACK, "width")}
                        />
                        <TextField
                          variant="outlined"
                          disabled={!ebookEnabled}
                          value={getFormatDetails(EBOOK, "width")}
                          onChange={(ev) => onChange(ev, EBOOK, "width")}
                        />
                      </Stack>

                      <Stack sx={{ flex: 0.5 }} spacing={2}>
                        <Typography variant="subtitle2" align="center">
                          Height
                        </Typography>

                        <TextField
                          variant="outlined"
                          disabled={!paperbackEnabled}
                          value={getFormatDetails(PAPERBACK, "height")}
                          onChange={(ev) => onChange(ev, PAPERBACK, "height")}
                        />
                        <TextField
                          variant="outlined"
                          disabled={!hardbackEnabled}
                          value={getFormatDetails(HARDBACK, "height")}
                          onChange={(ev) => onChange(ev, HARDBACK, "height")}
                        />
                        <TextField
                          variant="outlined"
                          disabled={!paperbackEnabled}
                          value={getFormatDetails(EBOOK, "height")}
                          onChange={(ev) => onChange(ev, EBOOK, "height")}
                        />
                      </Stack>

                      <Stack sx={{ flex: 0.5 }} spacing={2}>
                        <Typography variant="subtitle2" align="center">
                          Page Count
                        </Typography>

                        <TextField
                          variant="outlined"
                          disabled={!paperbackEnabled}
                          value={getFormatDetails(PAPERBACK, "pagecount")}
                          onChange={(ev) =>
                            onChange(ev, PAPERBACK, "pagecount")
                          }
                        ></TextField>
                        <TextField
                          variant="outlined"
                          disabled={!hardbackEnabled}
                          value={getFormatDetails(HARDBACK, "pagecount")}
                          onChange={(ev) => onChange(ev, HARDBACK, "pagecount")}
                        ></TextField>
                        <TextField
                          variant="outlined"
                          disabled={!ebookEnabled}
                          value={getFormatDetails(EBOOK, "pagecount")}
                          onChange={(ev) => onChange(ev, EBOOK, "pagecount")}
                        ></TextField>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      );
    }
  };
  return (
    <Grid container spacing={2}>
      {renderControls()}
    </Grid>
  );
};

export default BookTabFormats;
