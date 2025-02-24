export interface IPost extends Document {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
