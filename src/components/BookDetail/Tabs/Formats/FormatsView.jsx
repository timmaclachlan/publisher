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
  Box,
} from "@mui/material";

import { getFormattedCurrency } from "../../../../utils";

import {
  PAPERBACK,
  HARDBACK,
  EBOOK,
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_PAGECOUNT,
  FIELD_ESTPAGECOUNT,
  FIELD_UNITCOST,
  FIELD_ESTUNITCOST,
  FIELD_PAPERSTOCK,
  FIELD_COVERLAMINATE,
  getFormatDetails,
  getFormatFields,
  getFormatEnabled,
  renderFormatFieldDetail,
} from "./FormatsHelper";

const FormatsView = ({ formats }) => {
  let paperbackEnabled = getFormatEnabled(formats, PAPERBACK);
  let hardbackEnabled = getFormatEnabled(formats, HARDBACK);
  let ebookEnabled = getFormatEnabled(formats, EBOOK);

  const CardTop = (props) => {
    return (
      <Box sx={{ backgroundColor: "primary.main" }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" color="white" sx={{ pl: 1 }}>
            {props.title}
          </Typography>
          <Typography variant="h6" color="white">
            {getFormattedCurrency(
              getFormatDetails(formats, props.format, "price")
            )}
          </Typography>

          <Typography variant="h6" color="white">
            {getFormatDetails(formats, props.format, "isbn")}
          </Typography>

          <Typography variant="h6" color="white" sx={{ pr: 1 }}>
            Ingram Spark
          </Typography>
        </Stack>
      </Box>
    );
  };

  const renderFormatCard = (format, formatDisplay) => {
    const fields = getFormatFields(format);

    const isInFields = (field) => {
      return fields.includes(field);
    };

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
                  {isInFields(FIELD_WIDTH) && (
                    <>
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Width
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                          {renderFormatFieldDetail(format, "width")}
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                    </>
                  )}

                  {isInFields(FIELD_HEIGHT) && (
                    <>
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Height
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                          {renderFormatFieldDetail(formats, format, "height")}
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                    </>
                  )}

                  {isInFields(FIELD_ESTPAGECOUNT) && (
                    <>
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Est. Page Count
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                          {renderFormatFieldDetail(
                            formats,
                            format,
                            "estpagecount"
                          )}
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                    </>
                  )}

                  {isInFields(FIELD_PAGECOUNT) && (
                    <Stack sx={{ flex: 0.5 }}>
                      <Typography variant="subtitle2" align="center">
                        Act. Page Count
                      </Typography>

                      <Typography variant="subtitle1" align="center">
                        {renderFormatFieldDetail(formats, format, "pagecount")}
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                <Stack direction="row" spacing={1}>
                  {isInFields(FIELD_ESTUNITCOST) && (
                    <>
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Est. Unit Cost
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                          {renderFormatFieldDetail(
                            formats,
                            format,
                            "estunitcost"
                          )}
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                    </>
                  )}

                  {isInFields(FIELD_UNITCOST) && (
                    <>
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Act. Unit Cost
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                          {renderFormatFieldDetail(formats, format, "unitcost")}
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                    </>
                  )}

                  {isInFields(FIELD_PAPERSTOCK) && (
                    <>
                      <Stack sx={{ flex: 0.5 }}>
                        <Typography variant="subtitle2" align="center">
                          Paper Stock
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                          {renderFormatFieldDetail(
                            formats,
                            format,
                            "paperstock"
                          )}
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                    </>
                  )}

                  {isInFields(FIELD_COVERLAMINATE) && (
                    <Stack sx={{ flex: 0.5 }}>
                      <Typography variant="subtitle2" align="center">
                        Cover Laminate
                      </Typography>

                      <Typography variant="subtitle1" align="center">
                        {renderFormatFieldDetail(
                          formats,
                          format,
                          "coverlaminate"
                        )}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={2}>
          <Box sx={{ pt: 5 }}>
            <Barcode
              value={getFormatDetails(formats, format, "isbn")}
              height={50}
              width={1}
            />
          </Box>
        </Grid>
      </>
    );
  };

  return (
    <Grid container spacing={2}>
      {paperbackEnabled && renderFormatCard(PAPERBACK, "Paperback")}
      {hardbackEnabled && renderFormatCard(HARDBACK, "Hardback")}
      {ebookEnabled && renderFormatCard(EBOOK, "E-Book")}
    </Grid>
  );
};

export default FormatsView;
