import React from "react";

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
} from "@mui/material";

import LoadingOverlay from "../../LoadingOverlay";

import { isEmptyObject } from "../../../utils";

const PAPERBACK = 1;
const HARDBACK = 2;
const EBOOK = 28;
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

  const renderControls = () => {
    if (!editMode) {
      return (
        <>
          {loading && <LoadingOverlay />}
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Card>
                <CardHeader subheader="Formats"></CardHeader>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <Stack sx={{ flex: 0.25 }}>
                        <Typography variant="subtitle2" align="center">
                          Format
                        </Typography>
                        {renderFormatDetail("Paperback")}
                        {renderFormatDetail("Hardback")}
                        {renderFormatDetail("E-Book")}
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.25 }}>
                        <Typography variant="subtitle2" align="center">
                          Price
                        </Typography>
                        {renderFormatFieldDetail(PAPERBACK, "price")}
                        {renderFormatFieldDetail(HARDBACK, "price")}
                        {renderFormatFieldDetail(EBOOK, "price")}
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.75 }}>
                        <Typography variant="subtitle2" align="center">
                          Isbn
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          {renderFormatFieldDetail(PAPERBACK, "isbn")}
                          {renderFormatFieldDetail(HARDBACK, "isbn")}
                          {renderFormatFieldDetail(EBOOK, "isbn")}
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Distributor
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                          {renderFormatDetail("Ingram Spark")}
                          {renderFormatDetail("Ingram Spark")}
                          {renderFormatDetail("Ingram Spark")}
                        </Typography>
                      </Stack>

                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Width
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                          {renderFormatFieldDetail(PAPERBACK, "width")}
                          {renderFormatFieldDetail(HARDBACK, "width")}
                          {renderFormatFieldDetail(EBOOK, "width")}
                        </Typography>
                      </Stack>

                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Height
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                          {renderFormatFieldDetail(PAPERBACK, "height")}
                          {renderFormatFieldDetail(HARDBACK, "height")}
                          {renderFormatFieldDetail(EBOOK, "height")}
                        </Typography>
                      </Stack>

                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Page Count
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                          {renderFormatFieldDetail(PAPERBACK, "pagecount")}
                          {renderFormatFieldDetail(HARDBACK, "pagecount")}
                          {renderFormatFieldDetail(EBOOK, "pagecount")}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
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
