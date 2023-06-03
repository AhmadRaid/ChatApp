import { User } from "../../models";
import bcrypt from "bcrypt";
import { create_Tokens_with_cookie } from "../../../utils/jwt";

export const login = async (data: any) => {
  const { email, password } = data;
  try {
    if (!email || !password) {
      return {
        code: 2,
        message: "user.please_provide_email_and_password!",
        data: null,
      };
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return {
        code: 2,
        message: "user.incorrectEmail_OR_Password",
        data: null,
      };
    }

    let token = create_Tokens_with_cookie({
      id: user._id,
    });

    return {
      code: 0,
      message: "commonSuccess.message",
      data: { token, user },
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signUp = async (data: any) => {
  const { name, email, password } = data;
  console.log(data)
  try {
    const isUsedEmail = await User.findOne({ email });
    if (isUsedEmail) {
      return { code: 2, message: "Email is Used", data: null };
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    let token = create_Tokens_with_cookie({
      id: user._id,
      name,
    });

    return { code: 0, message: "commonSuccess.message", data: { token, user } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
