package revature.Controller;

//external libraries
import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import revature.routes.ReimRoute;
//user libraries
import revature.routes.Route;
import revature.routes.UserRoute;


public class Controller {
    private final static Javalin app = Javalin.create(
        config ->{
            config.enableCorsForAllOrigins();
            config.addStaticFiles("/static",Location.CLASSPATH);
        }

    );

    private static UserController uc = new UserController();
    private static Route user = new UserRoute(uc);
    private static ReimController rc = new ReimController();
    private static Route reim = new ReimRoute(rc);

    public Controller(){
        Route.establishRoutes(app,user,reim);

        app.error(403, (ctx) -> {
            ctx.result("The request you submitted is invalid");
        });

        app.start(7000);

    }
    


}
