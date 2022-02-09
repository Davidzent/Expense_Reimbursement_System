package revature.Controller;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import revature.Models.Users;
import revature.services.UserService;

import java.sql.SQLException;

import javax.servlet.http.HttpSession;

import static revature.Models.UsersxRoles.*;
import static revature.util.Log.logger;

public class UserController {
    
    public UserController(){}

    public Handler getAllEmployees = (ctx) ->{
        // int[] user=isLoggedIn(ctx);

        // if(user[0]==Manager.type()){
            try{
                ctx.json(UserService.getAllByRole(Employee.type()));
            }catch(SQLException e){
                log(e,ctx);
                ctx.result("Incorrect credentials");
            } 
        // }else{
            // ctx.result("Please log in as admin");
            // ctx.status(403);
        // }
          
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
            case "/register/employee":type=Employee.type();break;
            case "/register/manager":type=Manager.type();break;
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
            ctx.result("This is not allowed");
            logger.warn(ctx.body()+ctx.pathParamMap());
        }
        
    };
    
    public Handler login = (ctx) ->{
        String option= ctx.attribute("jetty-target");
        int type=-1;
        switch (option) {
            case "/login/employee":type=Employee.type();break;
            case "/login/manager":type=Manager.type();break;
        }
        if(type==-1){
            ctx.result("This is not allowed");
            logger.warn(ctx.body()+ctx.pathParamMap());
            ctx.status(403);
        }else{
            try{
                // ctx.header("Access-Control-Allow-Origin", "*");
                String username=ctx.formParam("username");
                String pas=ctx.formParam("password");
                Users u=UserService.login(username,pas,type);
                String t = (type==1?"EMPLOYEE":"MANAGER");
                //data
                
                ctx.json(u);

                ctx.req.getSession().setAttribute("id",u.getUsers_ID());
                ctx.req.getSession().setAttribute("loggedIn", t);
                
                ctx.header("id",""+u.getUsers_ID());
                ctx.header("loggedIn",t);
                System.out.println(ctx.req.getSession().getAttribute("id"));
                System.out.println(ctx.req.getSession().getAttribute("loggedIn"));
                //isLoggedIn(ctx);

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

    public Handler isLoggedIn  = (ctx)->{
        ctx.header("Access-Control-Expose-Headers","*");
        System.out.println(ctx.req.getSession().getAttribute("id"));
        System.out.println(ctx.req.getSession().getAttribute("loggedIn"));
    };

    private int[] isLoggedIn (Context ctx){
        ctx.header("Access-Control-Expose-Headers","*");
        Object temp=ctx.req.getSession().getAttribute("loggedIn");
        if(temp!=null){
            String type=(String) ctx.req.getSession().getAttribute("loggedIn");
            if(type=="EMPLOYEE")return new int[]{Employee.type(),(int) ctx.req.getSession().getAttribute("id")};
            if(type=="MANAGER")return new int[]{Manager.type(),(int) ctx.req.getSession().getAttribute("id")};
        }

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
