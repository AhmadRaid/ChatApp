import { User } from "../../models";
import bcrypt from "bcrypt";
import { IUser } from "../../models/interfaces/user";
import { friendRequest } from "../../models";
import { IFriendRequest } from "../../models/interfaces/friendRequest";
import { Types } from "mongoose";

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

export const showProfile = async (userId: string) => {
  try {
    let user = await User.findOne({ _id: userId });
    if (!user) {
      return { code: 1, message: "We dont have User", data: null };
    }

    return { code: 0, message: "commonSuccess.message", data: { user } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getMyFriends = async (senderId: string) => {
  try {
    let user = await User.find({ _id: senderId }).populate("friends");
    if (!user) {
      return { code: 1, message: "We dont have User", data: null };
    }
    return { code: 0, message: "commonSuccess.message", data: user };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const searchUser = async (name: string) => {
  console.log(name);
  
  try {
    const pipeline: any[] = [
      { $match: { name: { $regex: `^${name}`, $options: "i" } } },
      { $project: { _id: 0, password: 0 } },
    ];

    let user = await User.aggregate(pipeline);
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

    const userExist = await User.findOne({
      email,
    });

    if (userExist) {
      return { code: 1, message: "user exist", data: null };
    }

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
  const { senderId, recipientId, status } = data;
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

export const changeStatusFriendRequest = async (
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

    const sender = await User.findOne({ _id: senderId });
    const recipient = await User.findOne({ _id: recipientId });

    if (!sender || !recipient) {
      return { code: 1, message: "Friend request exist", data: null };
    }

    if (senderId && recipient.friends.includes(senderId)) {
      return { code: 1, message: "This user is friend already", data: null };
    }

    if (status == "accepted") {
      sender.friends.push(new Types.ObjectId(recipientId));
      await sender.save();
      recipient.friends.push(new Types.ObjectId(senderId));
      await recipient.save();
    }
    return {
      code: 0,
      message: "update Friend Request Successfully",
      data: { Friend_Request, sender },
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
