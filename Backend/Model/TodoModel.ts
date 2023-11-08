// import mongoose from "mongoose";
import {Document, Schema, model} from "mongoose"
import { iTodo } from "../Utils/Interface";



export interface iTodoData extends iTodo, Document{}

//schema
const todoModel = new Schema<iTodoData>({
    task:{
        type: String,
        default: "ongoing"
    },
    achieved:{
        type: String || null,
        default: null,
    },
    deadLine:{
        type: String,
    },
    done:{
        type: String,
        default: "Start"
    },

},

{
    timestamps: true
}
)

//converting it to model
export default model<iTodoData>("myTodoList", todoModel)