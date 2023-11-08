import {Request, Response} from "express"
import moment from "moment"
import TodoModel, { iTodoData } from "../Model/TodoModel";
import { StatusCode } from "../Utils/statusCode";

export const createTodo = async(req: Request, res: Response)=>{
try {
    const {task, time} = req.body;
    let newTime = time * 1000;

    let realTime = new Date().getTime() + newTime;

    console.log(task)
    console.log(moment(Date.parse(time)).format("LLLL"));
    console.log(moment(Date.parse("Mon Nov 06 2023 00:00:00 GMT+0100 (West Africa Standard Time)")).format("LLLL"));
    const todo = await TodoModel.create({
        task, 
        deadLine: moment(Date.parse(time[1])).format("LLLL"),
    })

    let timing = setTimeout(async()=>{
        await TodoModel.findByIdAndUpdate(
            todo.id,
            {
                achieved: "Terminated"
            },
            {new: true}
        );
        clearTimeout(timing)
        console.log("done")
    }, newTime);

    return res.status(StatusCode.Created).json({
        message: "Created",
        data: todo
    })
} catch (error) {
    return res.status(StatusCode.Bad_Request).json({
        message: "Error While Creating"
    })
}
}
export const viewTodos = async (req:Request, res:Response)=>{
try {
    const Todo = await TodoModel.find().sort({ createdAt: -1})
    return res.status(StatusCode.Ok).json({
        message: "Todo Found",
        data: Todo
    })
} catch (error) {
    return res.status(StatusCode.Bad_Request).json({
        message: "Error",
    });
}
}

export const viewOneTodo = async(req:Request, res:Response)=>{
    try {
        const {todoId} = req.params

        const Todo = await TodoModel.findById(todoId);
        return res.status(StatusCode.Ok).json({
            message: "A Todo has been Found",
            data: Todo
        });
    } catch (error) {
        return res.status(StatusCode.Bad_Request).json({
            message: "Error"
        })
    }
}

export const viewOneAndUpdate =async (req:Request, res:Response)=>{
    try {
        const {done} = req.body;
        const {TodoId} = req.params

        const check: iTodoData | null = await TodoModel.findById(TodoId);
        if(!!check?.achieved){
            return res.status(StatusCode.Bad_Request).json({
                message: "Time Elapse"
            });
        }else{
            const Todo = await TodoModel.findByIdAndUpdate(TodoId, {done}, {new: true});
            return res.status(StatusCode.Created).json({
                message: "Todo Found",
                data: Todo
            });
        }
    } catch (error) {
        return res.status(StatusCode.Bad_Request).json({
            mesaage: "Error While Updating Data"
        });
    }
};

export const viewOneandDelete = async (req: Request,res:Response)=>{
    try {
        const {task, time} = req.body;
        const {TodoId} = req.params;

        const Todo = await TodoModel.findByIdAndDelete(TodoId);
         
        return res.status(StatusCode.Ok).json({
            message: "Find",
            data: Todo
        });
    } catch (error) {
        return res.status(StatusCode.Bad_Request).json({
            message: "Error"
        })
    }
}

// export const deleTodo = async  (req:Request, res:Response)=>{
// try {
//     const {TodoId} = req.params;
//     const checker = await TodoModel.findByIdAndDelete{TodoId}
//     res.status(StatusCode.Ok).json({
//         message: "Todo Deleted",
//         checker
//     });
// } catch (error) {
//     console.log(error)
// }
// }