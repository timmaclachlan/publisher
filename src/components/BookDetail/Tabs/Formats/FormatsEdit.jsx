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

import {
  PAPERBACK,
  HARDBACK,
  EBOOK,
  getFormatEnabled,
  getFormatDetails,
  renderFormatDetail,
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

  return (
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
                    value={getFormatDetails(formats, PAPERBACK, "price")}
                    onChange={(ev, format, field) =>
                      onChange(ev, PAPERBACK, "price")
                    }
                  />
                  <TextField
                    variant="outlined"
                    disabled={!hardbackEnabled}
                    value={getFormatDetails(formats, HARDBACK, "price")}
                    onChange={(ev) => onChange(ev, HARDBACK, "price")}
                  />
                  <TextField
                    variant="outlined"
                    disabled={!ebookEnabled}
                    value={getFormatDetails(formats, EBOOK, "price")}
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
                    value={getFormatDetails(formats, PAPERBACK, "isbn")}
                    onChange={(ev) => onChange(ev, PAPERBACK, "isbn")}
                  />
                  <TextField
                    variant="outlined"
                    disabled={!hardbackEnabled}
                    value={getFormatDetails(formats, HARDBACK, "isbn")}
                    onChange={(ev) => onChange(ev, HARDBACK, "isbn")}
                  />
                  <TextField
                    variant="outlined"
                    disabled={!ebookEnabled}
                    value={getFormatDetails(formats, EBOOK, "isbn")}
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
                    value={getFormatDetails(formats, PAPERBACK, "width")}
                    onChange={(ev) => onChange(ev, PAPERBACK, "width")}
                  />
                  <TextField
                    variant="outlined"
                    disabled={!hardbackEnabled}
                    value={getFormatDetails(formats, HARDBACK, "width")}
                    onChange={(ev) => onChange(ev, HARDBACK, "width")}
                  />
                  <TextField
                    variant="outlined"
                    disabled={!ebookEnabled}
                    value={getFormatDetails(formats, EBOOK, "width")}
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
                    value={getFormatDetails(formats, PAPERBACK, "height")}
                    onChange={(ev) => onChange(ev, PAPERBACK, "height")}
                  />
                  <TextField
                    variant="outlined"
                    disabled={!hardbackEnabled}
                    value={getFormatDetails(formats, HARDBACK, "height")}
                    onChange={(ev) => onChange(ev, HARDBACK, "height")}
                  />
                  <TextField
                    variant="outlined"
                    disabled={!paperbackEnabled}
                    value={getFormatDetails(formats, EBOOK, "height")}
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
                    value={getFormatDetails(formats, PAPERBACK, "pagecount")}
                    onChange={(ev) => onChange(ev, PAPERBACK, "pagecount")}
                  ></TextField>
                  <TextField
                    variant="outlined"
                    disabled={!hardbackEnabled}
                    value={getFormatDetails(formats, HARDBACK, "pagecount")}
                    onChange={(ev) => onChange(ev, HARDBACK, "pagecount")}
                  ></TextField>
                  <TextField
                    variant="outlined"
                    disabled={!ebookEnabled}
                    value={getFormatDetails(formats, EBOOK, "pagecount")}
                    onChange={(ev) => onChange(ev, EBOOK, "pagecount")}
                  ></TextField>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FormatsEdit;
