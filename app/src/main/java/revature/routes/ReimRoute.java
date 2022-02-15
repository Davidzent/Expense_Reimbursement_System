package revature.routes;

import io.javalin.Javalin;
import revature.Controller.ReimController;

public class ReimRoute extends Route{

    private ReimController rc;

    public ReimRoute(ReimController rc){
        this.rc=rc;
    }

    @Override
    public void registerLocalRoutes(Javalin app) {
        app.get("/reim", rc.getAll);
        app.get("/reim/{id}", rc.getById);
        
        //employee
        app.get("/employee/reim/list", rc.list);
        app.post("/employee/reim/request", rc.create);

        //manage
        app.get("/manager/reim/list", rc.list);
        app.post("/manager/reim/validate", rc.validate);
        
        
        
    }
    
}
