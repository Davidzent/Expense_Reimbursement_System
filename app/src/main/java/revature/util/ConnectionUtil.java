package revature.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;



public class ConnectionUtil {
    public static Connection con;
    static{

        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        String host=System.getenv("DB_HOST");
        String url = "jdbc:postgresql://"+host+"/postgres";
        String username = System.getenv("DB_USER");
        String password = System.getenv("DB_PASS");
        try {
            con = DriverManager.getConnection(url,username, password);
        } catch (SQLException e) {
            
            e.printStackTrace();
        }
    }


}


// //Database Info
// protected static final String DBHOSTNAME="35.238.7.184:5432";
// protected static final String DBNAME="postgres";
// protected static final String DBUSERNAME="postgres";
// protected static final String DBPASSWORD="123456789!";
// protected static final String DMS="postgresql";              //database management system mysql or postgresql

// //Connected variables
// protected static Connection con = null;
// protected static java.sql.Statement stmt = null;
// protected static PreparedStatement pstmt = null;

// static{
//     try {
//         con = DriverManager.getConnection("jdbc:"+DMS+"://"+ DBHOSTNAME +"/"+DBNAME,DBUSERNAME,DBPASSWORD);

//     } catch (SQLException e) {
//         // creating link with database
//         log.fatal(e);
//     }
// }
