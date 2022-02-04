package revature.Controller;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

//external libraries
import io.javalin.Javalin;
import io.javalin.http.Context;
import revature.dao.reimDaoImpl;
import revature.dao.userDaoImpl;

//static libraries
import static revature.util.Log.logger;

public class Controller {
    final static Javalin app = Javalin.create().start();
    final static reimDaoImpl reim = new reimDaoImpl();
    final static userDaoImpl user = new userDaoImpl();

    public Controller(){
        app.get("/list/*", Controller::get);
        
        app.exception(SQLException.class, (e, ctx) -> {
            logger.warn("Link data: "+ctx.pathParamMap()+"\nForm data: "+ctx.formParamMap()+"\n"+e);
            ctx.status(400);
            ctx.result(e.getMessage());
        });
    }

    public static void get(Context ctx) throws SQLException{
        String option= ctx.attribute("jetty-target");
        Map<String, List<String>> map = ctx.queryParamMap();

        switch(option){
            case "/list/reim":{
                ctx.json(reim.getAllReim());
                break;
            }
            case "/list/user":{
                ctx.json(user.getAllUsers());
                break;
            }  
            default:{
                ctx.status(400);
                break;
            }
        }
        
    }

}
