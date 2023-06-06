import { MessageAttributes } from "../ts/interfaces/app_interface";

export const isEmpty = (target: Object | Array<any>): boolean => {
  return target instanceof Array
    ? target.length === 0
    : target === undefined || target === null
    ? true
    : Object.keys(target).length === 0;
};

export const sortStringArray = (rootArray: Array<string>): Array<string> => {
  return rootArray.sort(function (a: string, b: string) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
};

export const isMemberOfConversation = (
  userProfileNeedToCheck: MessageAttributes["sender"],
  members: Array<MessageAttributes["sender"]>
): boolean =>
  members.findIndex((member) => member.id === userProfileNeedToCheck.id) !== -1;
