import { Message } from "../../models";
import { IMessage } from "../../models/interfaces/messages";

export const getAllMessages = async (data: IMessage) => {
  try {
    let message = await Message.find({});
    if (!message) {
      return { code: 1, message: "We dont have Message", data: null };
    }
    return { code: 0, message: "commonSuccess.message", data: { message } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const addMessage = async (data: IMessage) => {
  const { sender, recipient, content } = data;
  try {
    const message = await Message.create({
      sender,
      recipient,
      content,
    });

    return { code: 0, message: "commonSuccess.message", data: { message } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
