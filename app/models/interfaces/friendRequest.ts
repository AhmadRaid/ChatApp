import { Document, Schema, Types } from 'mongoose';

export interface Ifriendrequest extends Document {
    sender : Types.ObjectId,
    recipient : Types.ObjectId,
    status: 'pending' | 'accepted' | 'rejected';
}