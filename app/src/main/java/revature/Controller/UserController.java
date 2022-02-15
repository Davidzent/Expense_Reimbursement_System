package revature.Controller;

//System
import io.javalin.http.Handler;
import java.sql.SQLException;

//User
import revature.Models.Users;
import revature.services.UserService;

//Static
import static revature.Models.UsersxRoles.*;
import static revature.util.ControllerUtil.*;
import static revature.util.Log.logger;

public class UserController {
    
    public UserController(){}

    public Handler getAllEmployees = (ctx) ->{
        int[] user=isLoggedIn(ctx);
        if(user[0]==Manager.type()){
            try{
                ctx.json(UserService.getAllByRole(Employee.type()));
                ctx.status(202);
            }catch(SQLException e){
                log(e,ctx);
                ctx.result("Incorrect credentials");
            }
        }else{
            ctx.result("Please log in as admin");
            ctx.status(403);
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
            case "/employee/register":type=Employee.type();break;
            case "/manager/register":type=Manager.type();break;
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

    public Handler update = (ctx) ->{
        String option= ctx.attribute("jetty-target");
        int[] user=isLoggedIn(ctx);
        if(user!=null){
            Users u = Users.fillUsers(ctx.formParamMap()).get(0);
            u.setRole_ID(user[0]);
            u.setUsers_ID(user[1]);
            
            try{
                UserService.update(u);
            }catch(SQLException e){
                log(e,ctx);
                ctx.result("Error updating the new user");
            }
        }
    };


    
    public Handler login = (ctx) ->{
        String option= ctx.attribute("jetty-target");
        int type=-1;
        switch (option) {
            case "/employee/login":type=Employee.type();break;
            case "/manager/login":type=Manager.type();break;
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
                
                // ctx.header("id",""+u.getUsers_ID());
                // ctx.header("loggedIn",t);

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
        ctx.json(ctx.req.getSession().getAttribute("id"));
        ctx.json(ctx.req.getSession().getAttribute("loggedIn"));
        System.out.println(ctx.req.getSession().getAttribute("id"));
        System.out.println(ctx.req.getSession().getAttribute("loggedIn"));
    };


    
}
