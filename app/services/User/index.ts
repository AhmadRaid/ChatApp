import { User } from "../../models";
import bcrypt from "bcrypt";
import { IUser } from "../../models/interfaces/user";
import { friendRequest } from "../../models";
import { IFriendRequest } from "../../models/interfaces/friendRequest";

export const getAllUser = async (data: IUser) => {
  try {
    let user = await User.find({});
    if (!user) {
      return { code: 1, message: "We dont have User", data: null };
    }
    return { code: 0, message: "commonSuccess.message", data: { user } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const addUser = async (data: IUser) => {
  const { name, email, password } = data;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return { code: 0, message: "commonSuccess.message", data: { user } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const sendFriendRequest = async (data: IFriendRequest) => {
  const { id, senderId, recipientId, status } = data;
  try {
    const Friend_Request = await friendRequest.create({
      senderId,
      recipientId,
      status,
    });
    return {
      code: 0,
      message: "commonSuccess.message",
      data: { Friend_Request },
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateFriendRequest = async (
  id: string,
  updateData: Partial<IFriendRequest>
) => {
  const { senderId, recipientId, status } = updateData;
  try {
    const Friend_Request = await friendRequest.findOne({ id });

    if (!Friend_Request) {
      return { code: 1, message: "Friend request exist", data: null };
    }

    Friend_Request.senderId = senderId;
    Friend_Request.recipientId = recipientId;
    Friend_Request.status = status === "accepted" ? "accepted" : "rejected";
    await Friend_Request.save();
    return {
      code: 0,
      message: "update Friend Request Successfully",
      data: Friend_Request,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
