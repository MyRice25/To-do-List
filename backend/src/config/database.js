import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("Liên kết database thành công");
    } catch (error) {
        console.error("Liên kết database thất bại", error);
        process.exit(1);
    }
}