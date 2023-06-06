import { ObjectDynamicValueAttributes } from "../../ts/interfaces/global_interfaces";
import HttpException from "./errorCatcher";
export function handleCatchError(error: HttpException) {
  const status = error.status || 500;
  const message = error.message || "Something in sever went wrong";

  const errorResult: ObjectDynamicValueAttributes = {
    status,
    message,
  };
x
  console.error(errorResult);

  return errorResult;
}
