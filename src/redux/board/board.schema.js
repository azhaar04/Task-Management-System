import { string, object } from "yup";

export const boardSchema = object().shape({
    boardTitle: string().required("This field must not be empty."),
});

export const newListSchema = object().shape({
    listTitle: string().required("This field must not be empty."),
});

export const taskSchema = object().shape({
    taskName: string().required("This field must not be empty."),
});
