import {
    atom,
    useRecoilState
} from 'recoil';


const todosAtom = atom<any>({
    key: 'todosAtom', // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});


export const useGetTodos = () => {
    const [todos, setTodos] = useRecoilState(todosAtom)

    return { todos, setTodos }
}