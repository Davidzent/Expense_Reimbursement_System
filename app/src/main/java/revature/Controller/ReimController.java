package revature.Controller;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import revature.Models.Reimbursement;

import revature.services.ReimService;

import static revature.util.Log.logger;

import java.sql.SQLException;
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
            ctx.result("Error Creating the new reimbursments");
        }
    };

    public Handler update = (ctx) ->{
        List<Reimbursement> r = Reimbursement.fillReimbursments(ctx.formParamMap());
        try{
            ReimService.update(r);
        }catch(SQLException e){
            log(e,ctx);
            ctx.result("Error updating reimbursments");
        }
    };

    public Handler validate = (ctx) ->{
        List<String> rid = ctx.formParamMap().get("reimid");
        List<String> status = ctx.formParamMap().get("statusid");
        List<String> resolver = ctx.formParamMap().get("resolver");
        try{
            ctx.result(ReimService.validate(rid,status,resolver));
        }catch(SQLException e){
            log(e,ctx);
            ctx.result("Error validating reimbursments");
        }
    };

    public Handler list = (ctx) ->{
        int[] user = isLoggedin(ctx);
        int status=-1;
        int author=-1;
        try{status = Integer.parseInt(ctx.queryParam("statusid"));}catch(NumberFormatException e){}
        
        
        if(user==null){}
        else if(user[0]==1){
            ctx.json(ReimService.getByStatus(status,user[1]));
        }
        else if(user[0]==2){
            try{author = Integer.parseInt(ctx.queryParam("author"));}catch(NumberFormatException e){}

            ctx.json(ReimService.getByStatus(status,author));

        }

    };

    private int[] isLoggedin (Context ctx){
        ctx.header("Access-Control-Expose-Headers","*");
        String type=(String) ctx.req.getSession().getAttribute("loggedIn");
        if(type=="EMPLOYEE")return new int[]{1,(int) ctx.req.getSession().getAttribute("id")};
        if(type=="MANAGER")return new int[]{2,(int) ctx.req.getSession().getAttribute("id")};
        ctx.status(403);
        ctx.result("Please log in");
        return null;
    };

    private static void log(Exception e,Context ctx){
        logger.warn(e);
        logger.warn(ctx.body());
        logger.warn(ctx.pathParamMap());
        ctx.status(400);
    }
    
}
