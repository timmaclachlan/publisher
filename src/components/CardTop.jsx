import React from "react";

import CloseIcon from "@mui/icons-material/Close";

import { Box, Stack, Typography, Button, IconButton } from "@mui/material";

const CardTop = (props) => {
  return (
    <Box
      sx={{
        backgroundColor: props.themeColor ? props.themeColor : "primary.main",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          {props.icon && (
            <Typography variant="caption" color="white" sx={{ pl: 1, pt: 0.5 }}>
              {props.icon}
            </Typography>
          )}

          <Typography variant="h7" color="white" sx={{ pl: 1 }}>
            {props.title}
          </Typography>
        </Stack>
        {props.allowEdit && (
          <Button
            variant="text"
            size="small"
            color="whitepanel"
            onClick={props.onEditClick}
          >
            Edit
          </Button>
        )}
        {props.allowClose && !props.closeIsText && (
          <IconButton color="whitepanel" onClick={props.onCloseClick}>
            <CloseIcon />
          </IconButton>
        )}
        {props.allowClose && props.closeIsText && (
          <Button
            variant="text"
            color="whitepanel"
            onClick={props.onCloseClick}
          >
            Close
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default CardTop;
