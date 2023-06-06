import { ObjectDynamicValueAttributes } from "../../ts/interfaces/global_interfaces";
import { handleCatchError } from "../../utils/error/errorHandler";
import HttpException from "../../utils/error/errorCatcher";
import RestFullAPIRequest from "../../utils/fetch";
import {
  API_RESPONSE_STATUS,
  STATUS_CODE,
  STATUS_MESSAGE,
} from "../../ts/enums/api_enums";

interface ObjectWithDynamicValue {
  [type: string]: any;
}

class API {
  public static async login(postData: ObjectWithDynamicValue) {
    try {
      const loginResponse: ObjectDynamicValueAttributes = new Object();
      await (
        await RestFullAPIRequest.createInstance(null)
      )
        .post("auth/login", postData)
        .then(async (response: ObjectDynamicValueAttributes) => {
          // ? Handle get & return user information

          const { access_token, expire } = response.data.data;
          Object.assign(loginResponse, {
            status: API_RESPONSE_STATUS.SUCCESS,
            access_token,
            expire,
          });
        })
        .catch((err) => {
          const { message }: HttpException = err as HttpException;
          Object.assign(loginResponse, {
            status: API_RESPONSE_STATUS.FAIL,
            message,
          });
        });

      return loginResponse;
    } catch (err) {
      const customErr: HttpException = err as HttpException;
      handleCatchError(customErr);
    }
  }
  public static async getUserInfoByAccessToken(access_token: string) {
    try {
      const userInfoRes: ObjectDynamicValueAttributes = new Object();

      await (
        await RestFullAPIRequest.createInstance(access_token)
      )
        .post("/auth/me")
        .then((response: ObjectDynamicValueAttributes) => {
          const { id, email, lastName, firstName, type, status } =
            response.data.data;

          Object.assign(userInfoRes, {
            status: API_RESPONSE_STATUS.SUCCESS,
            data: {
              id,
              email,
              lastName,
              firstName,
              type,
              status,
            },
          });
        })
        .catch((err) => {
          const customErr: HttpException = err as HttpException;
          Object.assign(userInfoRes, {
            status: API_RESPONSE_STATUS.FAIL,
            message: customErr.message,
          });
        });

      return userInfoRes;
    } catch (err) {
      const customErr: HttpException = err as HttpException;
      handleCatchError(customErr);
    }
  }
  public static async searchUserByName(inputName: string) {
    try {
      const searchResult: ObjectDynamicValueAttributes = {};
      await (
        await RestFullAPIRequest.createInstance(null)
      )

        .get(`/user/search-by-name?name=${inputName}`)
        .then((response: ObjectDynamicValueAttributes) => {
          Object.assign(searchResult, {
            status: API_RESPONSE_STATUS.SUCCESS,
            data: response.data.data,
          });
        })
        .catch((err: HttpException) => {
          Object.assign(searchResult, {
            status: API_RESPONSE_STATUS.FAIL,
            message: err.message,
          });
        });

      return searchResult;
    } catch (err) {
      const customErr: HttpException = err as HttpException;
      handleCatchError(customErr);
    }
  }
  public static async getConversation(
    access_token: string,
    members: Array<ObjectDynamicValueAttributes>
  ) {
    try {
      const getConversationResult: ObjectDynamicValueAttributes = {};

      await (
        await RestFullAPIRequest.createInstance(access_token)
      )
        .post(`conversation/get-by-members`, {
          members,
        })
        .then((response) => {
          switch (response.status) {
            case STATUS_CODE.STATUS_CODE_200: {
              Object.assign(getConversationResult, {
                status: STATUS_CODE.STATUS_CODE_200,
                message: STATUS_MESSAGE.SUCCESS,
                data: response.data.data,
              });
              break;
            }
            case STATUS_CODE.STATUS_CODE_404: {
              Object.assign(getConversationResult, {
                status: STATUS_CODE.STATUS_CODE_404,
                message: STATUS_MESSAGE.NOT_FOUND,
              });
              break;
            }
          }
        })
        .catch((err) => {
          const { message }: HttpException = err as HttpException;
          Object.assign(getConversationResult, {
            status: STATUS_CODE.STATUS_CODE_404,
            message,
          });
        });

      return getConversationResult;
    } catch (err) {
      const customErr: HttpException = err as HttpException;
      handleCatchError(customErr);
    }
  }
  public static async getContactList(
    access_token: string,
    id: string,
    type: string
  ) {
    try {
      const contactListResult: ObjectDynamicValueAttributes = {};

      await (
        await RestFullAPIRequest.createInstance(access_token)
      )
        .get(`/conversation/contact`, {
          params: { id, type },
        })
        .then((response: ObjectDynamicValueAttributes) => {
          switch (response.status) {
            case STATUS_CODE.STATUS_CODE_200: {
              Object.assign(contactListResult, {
                status: STATUS_MESSAGE.SUCCESS,
                data: response.data.data,
              });
              break;
            }
          }
        })
        .catch((err: HttpException) => {
          Object.assign(contactListResult, {
            status: API_RESPONSE_STATUS.FAIL,
            message: err.message,
          });
        });

      return contactListResult;
    } catch (err) {
      const customErr: HttpException = err as HttpException;
      handleCatchError(customErr);
    }
  }
  public static async searchListUser(ids: ObjectWithDynamicValue) {
    try {
      const searchListUserResult: ObjectDynamicValueAttributes = {};
      await (await RestFullAPIRequest.createInstance(null))
        .post(`/api/admin/search-list-user`, ids)
        .then((response: ObjectDynamicValueAttributes) => {
          Object.assign(searchListUserResult, {
            status: API_RESPONSE_STATUS.SUCCESS,
            data: response.data,
          });
        });

      return searchListUserResult;
    } catch (err) {
      const customErr: HttpException = err as HttpException;
      handleCatchError(customErr);
    }
  }
}

export default API;
