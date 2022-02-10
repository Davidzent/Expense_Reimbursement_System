package revature.util;

import static revature.Models.UsersxRoles.*;
import static revature.util.Log.logger;

import io.javalin.http.Context;

public class ControllerUtil {
    /**
     * @param ctx
     * @return array[userType,userID]
     */
    public static int[] isLoggedIn (Context ctx){
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

    public static void log(Exception e,Context ctx){
        logger.warn(e);
        logger.warn(ctx.body());
        logger.warn(ctx.pathParamMap());
        ctx.status(400);
    }
}
