import { Message } from "../../models";
import { IMessage } from "../../models/interfaces/messages";
import { Document, Types } from "mongoose";

export const getMessages = async (senderId: string, recipientId: string) => {
  try {
    let message = await Message.find({ senderId , recipientId });
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
  const { senderId, recipientId, content } = data;
  try {
    const message = await Message.create({
      senderId,
      recipientId,
      content,
    });

    return { code: 0, message: "commonSuccess.message", data: { message } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
