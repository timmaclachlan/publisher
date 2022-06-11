import React from "react";

import { Grid } from "@mui/material";

import BalanceIcon from "@mui/icons-material/Balance";
import PaymentsIcon from "@mui/icons-material/Payments";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";

import HistorySummary from "./HistorySummary";

const AuthorRoyalties = ({ author, loading }) => {
  const renderHistorySummary = (
    title,
    datakey,
    icon,
    label1,
    label2,
    label3,
    value1,
    value2,
    value3,
    isCurrency,
    viewDetails
  ) => {
    return (
      <HistorySummary
        authorId={author.id}
        loading={loading}
        width={100}
        height={30}
        headerTitle={title}
        headerIcon={icon}
        label1={label1}
        label2={label2}
        label3={label3}
        value1={value1}
        value2={value2}
        value3={value3}
        datakey={datakey}
        isCurrency={isCurrency}
        viewDetails={viewDetails}
      />
    );
  };

  return (
    <>
      <Grid item md={4}>
        {renderHistorySummary(
          "Current Financials",
          "balance",
          <BalanceIcon />,
          "Balance",
          "Owed Gross",
          "Owed Net",
          author.balance,
          author.grossowed,
          author.netowed,
          true,
          true
        )}
      </Grid>

      <Grid item md={4}>
        {renderHistorySummary(
          "Royalties",
          "royalties",
          <BarChartIcon />,
          "This Period",
          "Previous Period",
          "Total Royalties",
          author.royaltiesthisperiod,
          author.royaltiesprevperiod,
          author.royaltiestotal
        )}
      </Grid>

      <Grid item md={4}>
        {renderHistorySummary(
          "Tax",
          "tax",
          <PaymentsIcon />,
          "This Period",
          "",
          "Total Tax",
          author.tax,
          undefined,
          author.taxtotal
        )}
      </Grid>

      <Grid item md={4}>
        {renderHistorySummary(
          "Payments",
          "payments",
          <PaymentsIcon />,
          "This Period",
          "Previous Period",
          "Total Payments",
          author.paymentsthisperiod,
          author.paymentsprevperiod,
          author.paymentstotal
        )}
      </Grid>

      <Grid item md={4}>
        {renderHistorySummary(
          "Paid Sales",
          "paidsales",
          <ShowChartIcon />,
          "This Period",
          "Previous Period",
          "Total Sales",
          author.paidsalesthisperiod,
          author.paidsalesprevperiod,
          author.paidsalestotal,
          false
        )}
      </Grid>

      <Grid item md={4}>
        {renderHistorySummary(
          "Free Sales",
          "freesales",
          <ShowChartIcon />,
          "This Period",
          "Previous Period",
          "Total Sales",
          author.freesalesthisperiod,
          author.freesalesprevperiod,
          author.freesalestotal,
          false
        )}
      </Grid>
    </>
  );
};

export default AuthorRoyalties;
