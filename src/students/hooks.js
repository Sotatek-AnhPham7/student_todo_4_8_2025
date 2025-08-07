import { useContext } from "react";
import Context from "./Context";
import * as actions from "./actions";

export const useStudents = (initStudents) => {
  const [state, dispatch] = useContext(Context);

  if (initStudents) {
    dispatch(actions.setStudents(initStudents));
  }

  return [state, dispatch];
};
