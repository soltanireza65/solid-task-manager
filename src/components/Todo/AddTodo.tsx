import { useGetTodos } from "@/atoms/todo.atom";
import {
  CREATED_PREDICATE,
  TEXT_PREDICATE,
  TODO_CLASS,
  TYPE_PREDICATE,
} from "@/constants/predicates";
import {
  addDatetime,
  addStringNoLocale,
  addUrl,
  createThing,
  getSourceUrl,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { FC } from "react";

type Props = {};

const AddTodo: FC<Props> = ({}) => {
  const { session } = useSession();
  const { todos, setTodos } = useGetTodos();
  const addTodo = async (text: any) => {
    // const todoContainerUri = `${pod}todos/`;
    // const todoIndexUrl = `${todoContainerUri}index.ttl`;
    const indexUrl = getSourceUrl(todos);
    const todoWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, text);
    const todoWithDate = addDatetime(
      todoWithText,
      CREATED_PREDICATE,
      new Date()
    );
    const todoWithType = addUrl(todoWithDate, TYPE_PREDICATE, TODO_CLASS);
    const updatedTodoList = setThing(todos, todoWithType);
    const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedTodoList, {
      fetch: session.fetch,
    });
    setTodos(updatedDataset);
  };

  const form = useForm({
    initialValues: {
      text: "",
    },
    validate: {
      text: (value) =>
        value.length < 3
          ? "todo title must be greater than 3 characters"
          : null,
    },
  });

  const handleSubmit = form.onSubmit((values: any) => {
    console.log(values);
    addTodo(values.text);
    form.setFieldValue("text", "");
  });

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit}>
        <TextInput
          withAsterisk
          label="Todo text"
          placeholder="todo title"
          rightSection={
            <Button p="0" m="0" variant="" color="green" type="submit">
              <IconDeviceFloppy />
            </Button>
          }
          {...form.getInputProps("text")}
        />
      </form>
    </Box>
  );
};

export default AddTodo;