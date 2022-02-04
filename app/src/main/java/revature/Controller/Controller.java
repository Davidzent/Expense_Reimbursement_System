package revature.Controller;

//external libraries
import io.javalin.Javalin;

//user libraries
import revature.routes.Route;
import revature.routes.UserRoute;


public class Controller {
    private final static Javalin app = Javalin.create().start();

    private static UserController uc = new UserController();
    private static Route user = new UserRoute(uc);

    public Controller(){
        Route.establishRoutes(app, user);
    }
    


}
