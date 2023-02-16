import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Add, Task } from "@mui/icons-material";
import Joi from "joi";
import { TaskContext } from "../contexts/TaskContext";

const AddForm = ({ onSubmit, initialValue }) => {
  const [form, setForm] = useState({ title: "" });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const schema = Joi.object({
    title: Joi.string().min(3),
  });

  const { onSave } = useContext(TaskContext);

  const handleChange = ({ currentTarget: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setErrors({ ...errors, [input.name]: error.details[0].message });
    } else {
      delete errors[input.name];
      setErrors(errors);
    }
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);

    return !!result.error;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onSave(form);
  };

  return (
    <div>
      <Button variant="outlined" startIcon={<Add />} onClick={handleClickOpen}>
        New
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="title"
            error={!!errors.name}
            helperText={errors.name}
            onChange={handleChange}
            value={form.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddForm;
