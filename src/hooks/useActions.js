import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {authActions} from "../store/auth/auth.slice";
import {contentAction} from "../store/content/content.slice";

const rootActions = {
  ...authActions,
  ...contentAction

};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
