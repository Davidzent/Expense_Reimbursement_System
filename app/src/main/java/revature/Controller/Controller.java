package revature.Controller;

//external libraries
import io.javalin.Javalin;
import revature.routes.ReimRoute;
//user libraries
import revature.routes.Route;
import revature.routes.UserRoute;


public class Controller {
    private final static Javalin app = Javalin.create().start();

    private static UserController uc = new UserController();
    private static Route user = new UserRoute(uc);
    private static ReimController rc = new ReimController();
    private static Route reim = new ReimRoute(rc);

    public Controller(){
        Route.establishRoutes(app,user,reim);
    }
    


}
