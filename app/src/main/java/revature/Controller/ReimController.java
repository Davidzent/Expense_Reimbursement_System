package revature.Controller;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import revature.Models.Reimbursement;

import revature.services.ReimService;

import static revature.util.Log.logger;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



public class ReimController {
    
    public ReimController(){}

    public Handler getAll = (ctx) ->{
        try{
            ctx.json(ReimService.get());
        }catch(SQLException e){
            log(e,ctx);
            ctx.result("Incorrect credentials");
        }   
    };

    public Handler getById = (ctx) ->{
        try{
            int id = Integer.parseInt(ctx.pathParam("id"));
            ctx.json(ReimService.getById(id));
        }catch(SQLException e){
            log(e,ctx);
            ctx.result("Incorrect credentials");

        }catch(NumberFormatException e){
            log(e,ctx);
            ctx.result("Incorrect credentials");
        }
    };

    public Handler create = (ctx) ->{
        Reimbursement u = Reimbursement.fillReimbursments(ctx.formParamMap()).get(0);
        try{
            ReimService.create(u);
        }catch(SQLException e){
            log(e,ctx);
            ctx.result("Error Creating the new user");
        }
    };

    public Handler update = (ctx) ->{
        List<Reimbursement> r = Reimbursement.fillReimbursments(ctx.formParamMap());
        try{
            ReimService.update(r);
        }catch(SQLException e){
            log(e,ctx);
            ctx.result("Error Creating the new user");
        }
    };

    public Handler validate = (ctx) ->{
        List<String> rid = ctx.formParamMap().get("reimid");
        List<String> status = ctx.formParamMap().get("status");
        try{
            ctx.result(ReimService.validate(rid,status));
            
        }catch(SQLException e){
            log(e,ctx);
            ctx.result("Error Creating the new user");
        }
    };




    private static void log(Exception e,Context ctx){
        logger.warn(e);
        logger.warn(ctx.body());
        logger.warn(ctx.pathParamMap());
        ctx.status(400);
    }
    
}
