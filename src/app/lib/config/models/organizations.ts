import userSchema from "./user";
import mongoose, { Schema } from "mongoose";
import { areas } from "../../definitions";

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

const OrganizationModel = mongoose.models.Organizations || mongoose.model("Organizations" /* model */, organizationSchema /* schema */, "Organizations" /* coll */)

export default OrganizationModel;

