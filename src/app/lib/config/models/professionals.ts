import userSchema from "./user";
import mongoose, { Schema } from "mongoose";
import { specialties } from "../../types/general";

const professionalSchema = new Schema({
    ...userSchema.obj,
    experience: {
        type: Number,
        required: true,
    },
    specialty: {
        type: String, 
        enum: specialties,
        required: true,
    },
    employmentStatus: {
        type: String,
        enum: ["employed", "unemployed"],
        required: true,
    },
});

const Professionals = mongoose.models.Professionals || mongoose.model("Professionals" /* model */, professionalSchema /* schema */, "Professionals" /* coll */);

export default Professionals;
