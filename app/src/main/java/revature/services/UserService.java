package revature.services;

import java.sql.SQLException;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import revature.Models.Users;
import revature.dao.userDaoImpl;


public class UserService {
    final static userDaoImpl user = new userDaoImpl();

    public static Users login(String username, String pass, int type) throws SQLException, JsonMappingException, JsonProcessingException{
        

        return user.login(username,pass,type);
        
    }

    public static List<Users> getAllByRole(int role) throws SQLException{
        return user.getAllByRole(role);
    }

    public static Users getById(int id) throws SQLException{
        return user.getUserById(id);
    }

    public static boolean create(Users u) throws SQLException{
        return user.createUser(u);
    }
}
