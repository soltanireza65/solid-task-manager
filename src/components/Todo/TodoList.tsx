import {
  addDatetime,
  getDatetime,
  getSourceUrl,
  getThingAll,
  getUrl,
  removeDatetime,
  removeThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import { FC } from "react";
import { useGetTodos } from "../../atoms/todo.atom";
import {
  COMPLETED_PREDICATE,
  CREATED_PREDICATE,
  TEXT_PREDICATE,
  TODO_CLASS,
  TYPE_PREDICATE,
} from "../../constants/predicates";
import {
  Table,
  TableColumn,
  useSession,
  useThing,
} from "@inrupt/solid-ui-react";
import { Box, Button, Text as MantineText, createStyles } from "@mantine/core";
import { UnstyledButton } from "@mantine/core";
import { Checkbox } from "@mantine/core";
import { Trash } from "tabler-icons-react";
type Props = {};

const useStyles = createStyles((theme) => ({
  todo_table: {
    width: "100%",
    borderCollapse: "collapse",
  },
}));

const TodoList: FC<Props> = ({}) => {
  const { todos, setTodos } = useGetTodos();
  // const { classes } = useStyles();

  const todoThings = todos ? getThingAll(todos) : [];

  todoThings.sort(
    (a, b) =>
      (getDatetime(a, CREATED_PREDICATE) as any) -
      (getDatetime(b, CREATED_PREDICATE) as any)
  );
  const { fetch } = useSession();

  const deleteTodo = async (todo: any) => {
    const todosUrl = getSourceUrl(todos);
    const updatedTodos = removeThing(todos, todo);
    const updatedDataset = await saveSolidDatasetAt(todosUrl, updatedTodos, {
      fetch,
    });
    setTodos(updatedDataset);
  };

  const handleCheck = async (todo: any, checked: boolean) => {
    const todosUrl = getSourceUrl(todos);
    let updatedTodos;
    if (!checked) {
      const date = new Date();
      const doneTodo = addDatetime(todo, COMPLETED_PREDICATE, date);
      updatedTodos = setThing(todos, doneTodo); // , { fetch }
    } else {
      const date = getDatetime(todo, COMPLETED_PREDICATE);
      const undoneTodo = removeDatetime(todo, COMPLETED_PREDICATE, date!);
      updatedTodos = setThing(todos, undoneTodo); // , { fetch }
    }
    const updatedList = await saveSolidDatasetAt(todosUrl, updatedTodos, {
      fetch,
    });
    setTodos(updatedList);
  };
  const thingsArray = todoThings
    .filter((t) => getUrl(t, TYPE_PREDICATE) === TODO_CLASS)
    .map((t) => ({ dataset: todos, thing: t }));

  return (
    <Box w="600px" sx={{}}>
      <Table className={`table`} things={thingsArray}>
        <TableColumn
          property={TEXT_PREDICATE}
          header="To Do"
          body={({ value }: { value: string }) => (
            <MantineText>{value}</MantineText>
          )}
        />
        <TableColumn
          property={CREATED_PREDICATE}
          dataType="datetime"
          header="Created At"
          body={({ value }: { value: Date }) => value.toLocaleDateString()}
        />
        <TableColumn
          property={COMPLETED_PREDICATE}
          dataType="datetime"
          header="Done"
          body={({ value }: any) => {
            return (
              <ToggleComplete
                checked={Boolean(value)}
                handleCheck={handleCheck}
              />
            );
          }}
        />
        <TableColumn
          property={TEXT_PREDICATE}
          header="Delete"
          body={() => <DeleteTodo deleteTodo={deleteTodo} />}
        />
      </Table>
    </Box>
  );
};

export default TodoList;

const ToggleComplete = ({ checked, handleCheck }: any) => {
  const { thing } = useThing();
  return (
    <Checkbox checked={checked} onChange={() => handleCheck(thing, checked)} />
  );
};
const DeleteTodo = ({ deleteTodo }: any) => {
  const { thing } = useThing();
  return (
    <UnstyledButton onClick={() => deleteTodo(thing)}>
      <Trash size={24} strokeWidth={1} color={"#ff0000"} />
    </UnstyledButton>
  );
};
