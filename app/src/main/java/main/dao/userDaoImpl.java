package main.dao;

import java.sql.Connection;

public class  userDaoImpl implements userDao{

    @Override
    public boolean createUser(Users user) {
        // String sql = "insert into person (username, password, fnane, lname, email,roleid) values (?, ?, ?, ?, ?,?)";

        // // try with resources allows us to declare Autoclosable resources so that they are
        //     // automatically closed at the end of the try block
        // try (Connection c = ConnectionUtil.getConnection();
        //     PreparedStatement ps = c.prepareStatement(sql);){

        //     // set type as param index 1
        //     ps.setInt(1, p.getType().ordinal());

        //     // set first as param index 2  -- set the name using the person object (p)
        //     ps.setString(2, p.getFirst());
        //     ps.setString(3, p.getLast());
        //     ps.setString(4, p.getEmail());
        //     ps.setString(5, p.getPassword());

        //     int rowsAffected = ps.executeUpdate();
        //     if(rowsAffected==1){
        //         return true;
        //     }
        // } catch (SQLException e){
        //     e.printStackTrace();
        // }
        // return false;

    }

    @Override
    public List<Users> getAllPeople() {
        
        return null;
    }

    @Override
    public Users getUserById(int id) {
        
        return null;
    }

    @Override
    public Users login(String username, String password) {
        
        return null;
    }

    @Override
    public boolean updateUser(Users user) {
        
        return false;
    }
    
}
