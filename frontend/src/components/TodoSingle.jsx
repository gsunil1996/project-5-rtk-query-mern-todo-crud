import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import { useGetSingleTodoQuery } from "../redux/features/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const TodoSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isError, error, isFetching } = useGetSingleTodoQuery(id ? id : skipToken);

  // console.log("singleTodoData", data, isError, error, isFetching)


  return isFetching ? (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <LinearProgress />
    </div>
  ) : isError ? (
    <h1>{error?.status}</h1>
  ) : (
    <div>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        style={{ marginTop: "20px" }}
      >
        Back
      </Button>
      <h1>Name : {data?.text}</h1>
      <h2>ID: {data?._id}</h2>
    </div>
  );
}

export default TodoSingle