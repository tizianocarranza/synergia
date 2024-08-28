import userSchema from "./user";
import mongoose, { Schema } from "mongoose";
import { areas } from "../../types/general";

const organizationSchema = new Schema({
    ...userSchema.obj,
    area: {
        type: String, 
        enum: areas,
        required: true,
    },
    website: {
        type: String,
        required: false,
    },
});

const Organizations = mongoose.models.Organizations || mongoose.model("Organizations" /* model */, organizationSchema /* schema */, "Organizations" /* coll */)

export default Organizations;

