package revature.dao;

import java.sql.SQLException;
import java.util.List;

import revature.Models.Users;

public interface userDao {
    public boolean createUser(Users user) throws SQLException;
    public List<Users> getAllUsers() throws SQLException;
    public Users getUserById(int id) throws SQLException;
    public List<Users> getAllByRole(int role) throws SQLException;
    public boolean updateUser(Users user) throws SQLException;
    public Users login(String username, String password,int type) throws SQLException;
}
