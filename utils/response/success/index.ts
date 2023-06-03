import { Response, Request } from "express";

export const handleSuccess = (
  success: {
    data: any;
    statusCode: number;
    message: string | null;
  },
  req: Request,
  res: Response
) => {
  const { data, statusCode, message } = success;
  console.log("handleSuccess success");

  return res.status(statusCode).json({
    statusCode,
    status: "success",
    message: message ? message : null,
    data: data,
  });
};
