package revature.routes;

import io.javalin.Javalin;
import revature.Controller.UserController;

public class UserRoute extends Route{

    private UserController uc;

    public UserRoute(UserController uc){
        this.uc=uc;
    }

    @Override
    public void registerLocalRoutes(Javalin app) {
        // app.get("/list/employee", uc.getAll);
        // app.get("/list/manager", uc.getAll);
        app.get("/manager/list/employee", uc.getAllEmployees);
        app.get("/user/{id}", uc.getById);
        
        app.post("/login/*", uc.login);
        app.post("/register/*", uc.create);
        app.post("/logout", uc.logout);
        
    }
    
}
