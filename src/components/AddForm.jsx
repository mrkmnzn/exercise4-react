import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import Joi from "joi";
import React, { useState } from "react";

const AddForm = ({ onSubmit, initialValue }) => {
  const [form, setForm] = useState({ title: "" });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    title: Joi.string().min(3),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

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

  return (
    <Grid
      container
      component={"form"}
      justifyContent={"center"}
      onSubmit={handleSubmit}
    >
      <Grid item xs={6}>
        <CardHeader title="Add Task" />
        <CardContent>
          <TextField
            name="title"
            error={!!errors.name}
            helperText={errors.name}
            onChange={handleChange}
            value={form.name}
          />
        </CardContent>
        <CardActions>
          <Button type="submit">Save</Button>
        </CardActions>
      </Grid>
    </Grid>
  );
};

export default AddForm;
