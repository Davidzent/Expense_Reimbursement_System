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
        System.out.println("hey");
        try {
            con = DriverManager.getConnection(url,username, password);
            System.out.println("Here2123123123131");
        } catch (SQLException e) {
            System.out.println("Here");
            e.printStackTrace();
        }
    }


}