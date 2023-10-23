import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import authActions from "../app/auth/auth-operation";
import { extraAuthActions } from "../app/auth/auth-slice";




const rootActions = {
  ...authActions,
  ...extraAuthActions,

};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
