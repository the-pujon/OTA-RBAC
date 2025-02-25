export interface IPost extends Document {
    title: string;
    content: string;
    tags: string[];
    // createdAt: Date;
    // updatedAt: Date;
}
