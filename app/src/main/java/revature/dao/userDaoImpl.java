package revature.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import revature.Models.Users;

import static revature.util.ConnectionUtil.con;
import static revature.dao.userDaoImpl.PARAMS.*;

public class  userDaoImpl implements userDao{
    public enum PARAMS{  
        USERID("userid"),      
        USER("username"),
        PSWRD("password"),
        LNAME("lname"),
        FNAME("fname"),
        EMAIL("email"),
        ROLEID("roleid");

        private final String text;

        PARAMS(final String text) {
            this.text = text;
        }
        @Override
        public String toString() {
            return text;
        }
    }


    @Override
    public boolean createUser(Users user) throws SQLException {
        String sql = "insert into users (username, password, fnane, lname, email,roleid) values (?, ?, ?, ?, ?,?)";

        PreparedStatement ps = con.prepareStatement(sql);
        ps.setString(1, user.getUserName());
        ps.setString(2, user.getPassword());
        ps.setString(3, user.getfName());
        ps.setString(4, user.getlName());
        ps.setString(5, user.getEmail());
        ps.setInt(6, user.getRole_ID());

        int rowsAffected = ps.executeUpdate();
        if(rowsAffected==1){
            return true;
        }

        return false;
    }

    @Override
    public List<Users> getAllUsers() throws SQLException {
        String sql = "select * from users";
        List<Users> Users = new ArrayList<>();
        
        PreparedStatement s = con.prepareStatement(sql);
        ResultSet rs = s.executeQuery(sql);


        int id;
        String username;
        String password;
        String fnane;
        String lname;
        String email;
        int roleid;

        while(rs.next()) {
            id=-1;
            username="";
            password="";
            fnane="";
            lname="";
            email="";
            roleid=0;
            
            try{id = rs.getInt(USERID.toString());}catch(SQLException e){}
            try{username=rs.getString(USER.toString());}catch(SQLException e){}
            try{password=rs.getString(PSWRD.toString());}catch(SQLException e){}
            try{fnane=rs.getString(FNAME.toString());}catch(SQLException e){}
            try{lname=rs.getString(LNAME.toString());}catch(SQLException e){}
            try{email=rs.getString(EMAIL.toString());}catch(SQLException e){}
            try{roleid=rs.getInt(ROLEID.toString());}catch(SQLException e){}

            Users User = new Users(id,username,password,fnane,lname,email,roleid);

            


            Users.add(User);
        }

        return Users;
    }
    
    @Override
    public Users getUserById(int id) throws SQLException {
        String sql = "select * from users WHERE userid = ? LIMIT 1";
        
        PreparedStatement s = con.prepareStatement(sql);
        s.setInt(1, id);
        
        ResultSet rs = s.executeQuery(sql);

        String username="";
        String password="";
        String fnane="";
        String lname="";
        String email="";
        int roleid=-1;
        
        try{id = rs.getInt(USERID.toString());}catch(SQLException e){}
        try{username=rs.getString(USER.toString());}catch(SQLException e){}
        try{password=rs.getString(PSWRD.toString());}catch(SQLException e){}
        try{fnane=rs.getString(FNAME.toString());}catch(SQLException e){}
        try{lname=rs.getString(LNAME.toString());}catch(SQLException e){}
        try{email=rs.getString(EMAIL.toString());}catch(SQLException e){}
        try{roleid=rs.getInt(ROLEID.toString());}catch(SQLException e){}

        Users User = new Users(id,username,password,fnane,lname,email,roleid);

            

        return User;
    }

    @Override
    public Users login(String username, String password) throws SQLException {
        String sql = "select * from users WHERE username = ? AND password = ? LIMIT 1";
        
        PreparedStatement s = con.prepareStatement(sql);
        s.setString(1, username);
        s.setString(2, password);
        
        ResultSet rs = s.executeQuery(sql);

        int id=-1;
        String fnane="";
        String lname="";
        String email="";
        int roleid=-1;
        
        try{id = rs.getInt(USERID.toString());}catch(SQLException e){}
        try{username=rs.getString(USER.toString());}catch(SQLException e){}
        try{password=rs.getString(PSWRD.toString());}catch(SQLException e){}
        try{fnane=rs.getString(FNAME.toString());}catch(SQLException e){}
        try{lname=rs.getString(LNAME.toString());}catch(SQLException e){}
        try{email=rs.getString(EMAIL.toString());}catch(SQLException e){}
        try{roleid=rs.getInt(ROLEID.toString());}catch(SQLException e){}

        Users User = new Users(id,username,password,fnane,lname,email,roleid);

        return User;
    }

    @Override
    public boolean updateUser(Users user) throws SQLException {
        String sql = "UPDATE users SET username = ? , password = ?, fnane = ?, lname = ?, email = ?,roleid = ? WHERE userid = ?";

        // try with resources allows us to declare Autoclosable resources so that they are
        // automatically closed at the end of the try block
        PreparedStatement ps = con.prepareStatement(sql);


        ps.setString(1, user.getUserName());
        ps.setString(2, user.getPassword());
        ps.setString(3, user.getfName());
        ps.setString(4, user.getlName());
        ps.setString(5, user.getEmail());
        ps.setInt(6, user.getRole_ID());
        ps.setInt(7, user.getUsers_ID());

        int rowsAffected = ps.executeUpdate();
        if(rowsAffected==1){
            return true;
        }

        return false;
    }
    
}
