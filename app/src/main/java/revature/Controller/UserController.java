package revature.Controller;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import revature.Models.Users;
import revature.services.UserService;

import static revature.util.Log.logger;

import java.sql.SQLException;



public class UserController {
    
    public UserController(){}

    public Handler getAll = (ctx) ->{
        try{
            ctx.json(UserService.get());
        }catch(SQLException e){
            log(e,ctx);
            ctx.result("Incorrect credentials");
        }   
    };

    public Handler getById = (ctx) ->{
        try{
            int id = Integer.parseInt(ctx.pathParam("id"));
            ctx.json(UserService.getById(id));
        }catch(SQLException e){
            log(e,ctx);
            ctx.result("Incorrect credentials");

        }catch(NumberFormatException e){
            log(e,ctx);
            ctx.result("Incorrect credentials");
        }
    };

    public Handler create = (ctx) ->{
        String option= ctx.attribute("jetty-target");
        int type=-1;
        switch (option) {
            case "/register/employee":type=1;break;
            case "/register/manager":type=2;break;
        }
        if(type!=-1){
            Users u = Users.fillUsers(ctx.formParamMap()).get(0);
            u.setRole_ID(type);
            
            try{
                UserService.create(u);
            }catch(SQLException e){
                log(e,ctx);
                ctx.result("Error Creating the new user");
            }
        }else{
            ctx.status(403);
        }
        
    };
    
    public Handler login = (ctx) ->{
        String option= ctx.attribute("jetty-target");
        int type=-1;
        switch (option) {
            case "/login/employee":type=1;break;
            case "/login/manager":type=2;break;
        }
        if(type==-1){
            ctx.result("This is not allowed");
            logger.warn(ctx.body()+ctx.pathParamMap());
            ctx.status(400);
        }else{
            try{
                String username=ctx.formParam("username");
                String pas=ctx.formParam("password");
                Users u=UserService.login(username,pas,type);
                String t = (type==1?"EMPLOYEE":"MANAGER");
                //data
                ctx.jsonStream(u);

                ctx.req.getSession().setAttribute("id",u.getUsers_ID());
                ctx.req.getSession().setAttribute("loggedIn", t);
                ctx.header("uid",""+u.getUsers_ID());
                ctx.header("loggedIn",t);

            }catch(SQLException e){
                log(e,ctx);
                ctx.result("Incorrect credentials");
            }
            
        }
    };

    public Handler logout = (ctx) -> {
        ctx.req.getSession().invalidate();
        ctx.status(200);
        ctx.result("User logged out");
    };
    
    private static void log(Exception e,Context ctx){
        logger.warn(e);
        logger.warn(ctx.body());
        logger.warn(ctx.pathParamMap());
        ctx.status(400);
    }
    
}
