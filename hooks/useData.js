import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetData } from "../redux/actions/data";

export const useData = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    // if(!data) {
    //   dispatch(startGetData())
    // }
    dispatch(startGetData());
  }, []);
};
