import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAddTodoMutation, useChangeTodoStatusMutation, useDeleteTodoMutation, useGetSingleTodoQuery, useGetTodosQuery, useUpdateTodoMutation } from '../redux/features/apiSlice';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const TodoBasic = () => {
  const navigate = useNavigate();

  const [rowId, setRowId] = useState("");

  const { data, isError, error, isFetching } = useGetTodosQuery();

  const [addTodo, { isLoading: createLoader, isError: isAddError, error: addError, isSuccess: addSuccess, reset: addReset }] = useAddTodoMutation();

  const [deleteTodo, { isLoading: deleteLoader, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError, reset: deleteReset, }] = useDeleteTodoMutation();

  const [updateTodo, { isLoading: updateLoader, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError, reset: updateReset }] = useUpdateTodoMutation();

  const [changeTodoStatus, { isLoading: todoStatusLoader, isSuccess: isTodoStatusSuccess, isError: isTodoStatusError, error: todoStatusError, reset: todoStatusReset }] = useChangeTodoStatusMutation()

  const { data: singleTodoData, isError: isSingleTodoError, error: singleTodoError, isFetching: isSingleTodoFetching, isSuccess: isSingleTodoSuccess, refetch: singleTodoRefetch, } = useGetSingleTodoQuery(rowId);


  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [open, setOpen] = React.useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [updateClicked, setUpdateClicked] = useState(false);
  const [todoStatusDropdown, setTodoStatusDropdown] = React.useState('');

  const handleTodoStatusDropdownChange = (event) => {
    setTodoStatusDropdown(event.target.value);
  };

  const handleAddTodo = () => {
    addTodo({ text: text });
    setText("");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSuccessMessage("")
    setErrorMessage("")
  };

  const handleUpdateClickClose = () => {
    setUpdateOpen(false);
    setEditText("")
  }

  const handleUpdateClickOpen = (id) => {
    setUpdateOpen(true);
    setRowId(id);
    setUpdateClicked(!updateClicked)
    singleTodoRefetch()
  }

  useEffect(() => {
    setEditText(singleTodoData?.text)
  }, [singleTodoData, updateClicked])


  useEffect(() => {
    if (addSuccess) {
      setSuccessMessage("Todo Added Successfully")
      setErrorMessage("");
      handleClickOpen();
      addReset()
    } else if (isAddError) {
      setSuccessMessage("")
      setErrorMessage(addError?.status)
      handleClickOpen();
      addReset()
    } else if (isDeleteSuccess) {
      setSuccessMessage("Todo Deleted Successfully")
      setErrorMessage("");
      handleClickOpen();
      deleteReset()
    } else if (isDeleteError) {
      setSuccessMessage("")
      setErrorMessage(deleteError?.status)
      handleClickOpen();
      deleteReset()
    } else if (isUpdateSuccess) {
      setSuccessMessage("Todo Updated Successfully")
      setErrorMessage("");
      handleClickOpen();
      handleUpdateClickClose();
      updateReset();
    } else if (isUpdateError) {
      setSuccessMessage("")
      setErrorMessage(updateError?.status)
      handleClickOpen();
      updateReset()
    } else if (isTodoStatusSuccess) {
      setSuccessMessage("Todo Status toggled Successfully")
      setErrorMessage("");
      handleClickOpen();
      todoStatusReset();
    } else if (isTodoStatusError) {
      setSuccessMessage("")
      setErrorMessage(todoStatusError?.status)
      handleClickOpen();
      todoStatusReset();
    }
  }, [addSuccess, isAddError, isDeleteSuccess, isDeleteError, isUpdateSuccess, isUpdateError, isTodoStatusSuccess, isTodoStatusError])

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo({ id: rowId, text: editText, status: todoStatusDropdown })
  }


  return (
    <div>
      <div style={{ width: "100%", textAlign: "center" }}>
        <h1 style={{ color: "#101820FF" }}>ToDo App with "RTK-Query"</h1>
      </div>

      <div style={{ width: "50%", margin: "auto" }}>
        <div
          style={{ width: "80%", display: "flex", gap: "20px", margin: "auto" }}
        >
          <TextField
            id="standard-basic"
            label="Add ToDo"
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%" }}
          />
          <div>
            <Button
              variant="contained"
              size="large"
              onClick={handleAddTodo}
              startIcon={createLoader ? null : <AddIcon />}
              style={{ background: "#00203FFF", color: "#ADEFD1FF" }}
              disabled={createLoader ? true : false}
            >
              {createLoader ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </div>

        {isFetching ? (
          <div style={{ width: "100%", marginTop: "20px" }}>
            <LinearProgress />
          </div>
        ) : (!isFetching && data?.length == 0) ? (
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
          >
            <h1>No Data Found</h1>
          </div>
        ) : isError ? (
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
          >
            <h1>{error?.status}</h1>
          </div>
        ) : (
          <div style={{ paddingBottom: "50px" }}>
            {data?.map((item) => (
              <div key={item._id}>
                <Card
                  style={{
                    marginTop: "10px",
                    background: "#101820FF",
                    color: "#FEE715FF",
                  }}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{ fontWeight: 600, cursor: "pointer" }}
                    >
                      {item.text} - {item.status}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {console.log(!Boolean(item.status), "sdfsdfsdf")}
                      <Button
                        variant="contained"
                        style={{
                          background: "#F95700FF",
                          color: "#F2EDD7FF",
                        }}
                        onClick={() => changeTodoStatus({ id: item._id, status: item.status == "true" ? false : true })}
                        startIcon={<ToggleOnIcon />}
                      >
                        {todoStatusLoader ? (
                          <CircularProgress style={{ color: "#fff" }} />
                        ) : (
                          "Toggle"
                        )}
                      </Button>

                      <Button
                        variant="contained"
                        style={{
                          background: "#2C5F2D",
                          color: "#F2EDD7FF",
                        }}
                        onClick={() => navigate(`/todo/${item._id}`)}
                        startIcon={<VisibilityIcon />}
                      >
                        View
                      </Button>

                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        style={{
                          background: "#755139FF",
                          color: "#F2EDD7FF",
                        }}
                        onClick={() => {
                          handleUpdateClickOpen(item._id);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => deleteTodo({ id: item._id })}
                        style={{
                          background: "#990011FF",
                          color: "#FCF6F5FF",
                        }}
                        startIcon={<DeleteForeverIcon />}
                      >
                        Delete
                      </Button>

                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>)}

      </div>

      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={updateOpen}
        onClose={handleUpdateClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <h1 style={{ marginTop: "0px" }} >Update Todo</h1>
          {isSingleTodoFetching ? (<div> <LinearProgress /> </div>) : (<div>
            <form onSubmit={handleSubmit} >
              <TextField id="outlined-basic" label="Enter Todo" value={editText} variant="outlined" fullWidth
                onChange={(e) => setEditText(e.target.value)} required />

              <FormControl fullWidth style={{ marginTop: "15px" }} required >
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={todoStatusDropdown}
                  label="Status"
                  onChange={handleTodoStatusDropdownChange}
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </Select>
              </FormControl>

              <div style={{ display: "flex", gap: "10px" }} >
                <Button variant="contained" fullWidth style={{ marginTop: "10px" }} color="error"
                  onClick={handleUpdateClickClose} >Cancel</Button>
                <Button variant="contained" type="submit" fullWidth style={{ marginTop: "10px" }} color="success" >
                  {updateLoader ? (
                    <CircularProgress style={{ color: "#fff" }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </div>)}
        </DialogContent>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {successMessage.length > 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <CheckCircleIcon
                style={{ color: "#2C5F2D", fontSize: "100px" }}
              />
            </div>
          ) : errormessage.length > 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <CancelIcon style={{ color: "#990011FF", fontSize: "100px" }} />{" "}
            </div>
          ) : ""}
          {successMessage.length > 0 ? (
            <h1>{successMessage}</h1>
          ) : errormessage.length > 0 ? (
            <h1>{errormessage}</h1>
          ) : ""}
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default TodoBasic