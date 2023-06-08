import {
  HttpException,
  ObjectDynamicValueAttributes,
} from "../../ts/interfaces/global_interfaces";
export function handleCatchError(error: HttpException) {
  const status = error.status || 500;
  const message = error.message || "Something in sever went wrong";

  const errorResult: ObjectDynamicValueAttributes = {
    status,
    message,
  };
  console.error(errorResult);

  return errorResult;
}
