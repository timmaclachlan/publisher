import React from "react";

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
  FIELD_PRICE,
  FIELD_ISBN,
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_PAGECOUNT,
  FIELD_ESTPAGECOUNT,
  FIELD_UNITCOST,
  FIELD_ESTUNITCOST,
  FIELD_PAPERSTOCK,
  FIELD_COVERLAMINATE,
  FIELD_DISTRIBUTOR,
  getFormatDetails,
  getFormatEnabled,
  renderFormatFieldDetail,
  getDistributorDisplayLabel,
  getPaperStockDisplayLabel,
  getCoverLaminateDisplayLabel,
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
              getFormatDetails(formats, props.format, FIELD_PRICE)
            )}
          </Typography>

          <Typography variant="h6" color="white">
            {getFormatDetails(formats, props.format, FIELD_ISBN)}
          </Typography>

          <Typography variant="h6" color="white" sx={{ pr: 1 }}>
            {getDistributorDisplayLabel(
              getFormatDetails(formats, props.format, FIELD_DISTRIBUTOR)
            )}
          </Typography>
        </Stack>
      </Box>
    );
  };

  const renderFormatCard = (format, formatDisplay) => {
    return (
      <>
        <Grid item md={2}>
          <img src={`/assets/${formatDisplay}.jpg`} alt={formatDisplay} />
        </Grid>
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
                      {renderFormatFieldDetail(formats, format, FIELD_WIDTH)}
                    </Typography>
                  </Stack>
                  <Divider orientation="vertical" flexItem />

                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Height
                    </Typography>

                    <Typography variant="subtitle1" align="center">
                      {renderFormatFieldDetail(formats, format, FIELD_HEIGHT)}
                    </Typography>
                  </Stack>
                  <Divider orientation="vertical" flexItem />

                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Est. Page Count
                    </Typography>

                    <Typography variant="subtitle1" align="center">
                      {renderFormatFieldDetail(
                        formats,
                        format,
                        FIELD_ESTPAGECOUNT
                      )}
                    </Typography>
                  </Stack>
                  <Divider orientation="vertical" flexItem />

                  <Stack sx={{ flex: 0.5 }}>
                    <Typography variant="subtitle2" align="center">
                      Act. Page Count
                    </Typography>

                    <Typography variant="subtitle1" align="center">
                      {renderFormatFieldDetail(
                        formats,
                        format,
                        FIELD_PAGECOUNT
                      )}
                    </Typography>
                  </Stack>
                </Stack>

                {format !== EBOOK && (
                  <Stack direction="row" spacing={1}>
                    <Stack sx={{ flex: 0.5 }}>
                      <Typography variant="subtitle2" align="center">
                        Est. Unit Cost
                      </Typography>

                      <Typography variant="subtitle1" align="center">
                        {renderFormatFieldDetail(
                          formats,
                          format,
                          FIELD_ESTUNITCOST
                        )}
                      </Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />

                    <Stack sx={{ flex: 0.5 }}>
                      <Typography variant="subtitle2" align="center">
                        Act. Unit Cost
                      </Typography>

                      <Typography variant="subtitle1" align="center">
                        {renderFormatFieldDetail(
                          formats,
                          format,
                          FIELD_UNITCOST
                        )}
                      </Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />

                    <Stack sx={{ flex: 0.5 }}>
                      <Typography variant="subtitle2" align="center">
                        Paper Stock
                      </Typography>

                      <Typography variant="subtitle1" align="center">
                        {getPaperStockDisplayLabel(
                          getFormatDetails(formats, format, FIELD_PAPERSTOCK)
                        )}
                      </Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />

                    <Stack sx={{ flex: 0.5 }}>
                      <Typography variant="subtitle2" align="center">
                        Cover Laminate
                      </Typography>

                      <Typography variant="subtitle1" align="center">
                        {getCoverLaminateDisplayLabel(
                          getFormatDetails(formats, format, FIELD_COVERLAMINATE)
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>
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
