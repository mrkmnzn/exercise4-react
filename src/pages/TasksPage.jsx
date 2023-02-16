import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  Radio,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import FormDialog from "../components/NewTask";
import { TaskContext } from "../contexts/TaskContext";

const TasksPage = () => {
  const { tasks, onDelete } = useContext(TaskContext);

  return (
    <TableContainer>
      <Grid container spacing={2} justifyContent="center" textAlign="left">
        <Grid item xs={6}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell>
                  <FormDialog></FormDialog>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell align="center">
                    <Checkbox></Checkbox>
                  </TableCell>
                  <TableCell component="th" align="left" scope="row">
                    {task.title}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => onDelete(task.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </TableContainer>
  );
};

export default TasksPage;
