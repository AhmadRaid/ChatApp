  export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isDeleted: boolean;

    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
  }