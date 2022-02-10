package revature.Controller;

//External
import io.javalin.http.Handler;


//System
import java.sql.SQLException;
import java.util.List;

//User
import revature.Models.Reimbursement;
import revature.services.ReimService;

//Static
import static revature.Models.UsersxRoles.*;
import static revature.util.ControllerUtil.*;

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
        int[] user = isLoggedIn(ctx);
        if(user==null){}
        else if(user[0]==Employee.type()){
            Reimbursement u = Reimbursement.fillReimbursments(ctx.formParamMap()).get(0);
            try{
                u.setAuthor(user[1]);
                ReimService.create(u);
            }catch(SQLException e){
                log(e,ctx);
                ctx.result("Error Creating the new reimbursments");
            }
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
        int[] user = isLoggedIn(ctx);
        if(user==null){}
        else if(user[0]==Manager.type()){
            List<String> rid = ctx.formParamMap().get("reimid");
            List<String> status = ctx.formParamMap().get("statusid");
            try{
                ctx.result(ReimService.validate(rid,status,user[1]));
            }catch(SQLException e){
                log(e,ctx);
                ctx.result("Error validating reimbursments");
            }
        }
        
    };

    public Handler list = (ctx) ->{
        int[] user = isLoggedIn(ctx);
        int status=-1;
        int author=-1;
        try{status = Integer.parseInt(ctx.queryParam("statusid"));}catch(NumberFormatException e){}
        
        
        if(user==null){}
        else if(user[0]==Employee.type()){
            ctx.json(ReimService.getByStatus(status,user[1]));
        }
        else if(user[0]==Manager.type()){
            try{author = Integer.parseInt(ctx.queryParam("author"));}catch(NumberFormatException e){}

            ctx.json(ReimService.getByStatus(status,author));

        }

    };
}
