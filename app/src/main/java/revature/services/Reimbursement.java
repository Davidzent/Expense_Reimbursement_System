package revature.services;

import java.sql.SQLException;

import io.javalin.http.Context;
import revature.dao.reimDaoImpl;

public class Reimbursement {
    final static reimDaoImpl reim = new reimDaoImpl();

    public static void get(Context ctx) throws SQLException{
        ctx.json(reim.getAllReim());
    }
}
