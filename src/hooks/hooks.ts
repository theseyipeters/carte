import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store/store";
import type { RootState } from "../redux/store/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
