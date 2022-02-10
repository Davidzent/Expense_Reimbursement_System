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
        app.get("/manager/list/employee", uc.getAllEmployees);
        app.get("/user/{id}", uc.getById);
        app.get("/verify", uc.isLoggedIn);
        
        app.post("/employee/register", uc.create);
        app.post("/employee/login", uc.login);
        app.post("/employee/logout", uc.logout);

        app.post("/manager/login", uc.login);
        app.post("/manager/register", uc.create);
        app.post("/manager/logout", uc.logout);

    }
    
}
