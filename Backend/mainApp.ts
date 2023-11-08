import { Application, Response, Request } from "express";
import { StatusCode } from "./Utils/statusCode";
import myTodo from "../Backend/Router/TodoRouter"



export const mainApp = (app: Application)=>{
  try{
    app.use("/api/v2", myTodo);
    app.get("/", (req: Request, res: Response) =>{
      try{
        return res.status(StatusCode.Ok).json({
          message: "Entry to my server is Succesfull"
        });
      }catch (error){
        return res.status(StatusCode.Bad_Request).json({
          message: "Error",
        });
      }
    })
  }catch(error){
    console.log(error)
  }
}
