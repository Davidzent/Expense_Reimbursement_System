package revature.dao;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


import revature.Models.Users;

import static revature.util.Log.logger;
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
        String sql = "insert into project01.users (username, password, fname, lname, email,roleid) values (?, ?, ?, ?, ?,?)";

        PreparedStatement ps = con.prepareStatement(sql);
        ps.setString(1, user.getUserName());
        ps.setString(2, encrypt(user.getPassword()));
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
        String sql = "select * from project01.users";
        List<Users> Users = new ArrayList<>();
        
        Statement  s = con.createStatement();
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
            try{
                id = rs.getInt(USERID.toString());
                username=rs.getString(USER.toString());
                password=rs.getString(PSWRD.toString());
                fnane=rs.getString(FNAME.toString());
                lname=rs.getString(LNAME.toString());
                email=rs.getString(EMAIL.toString());
                roleid=rs.getInt(ROLEID.toString());
            }catch(SQLException e){
                logger.trace(e);
            }
            Users User = new Users(id,username,password,fnane,lname,email,roleid);
            Users.add(User);
        }

        return Users;
    }

    @Override
    public List<Users> getAllByRole(int roleid) throws SQLException {
        String sql = "select * from project01.users WHERE roleid=?";
        List<Users> Users = new ArrayList<>();
        
        PreparedStatement  s = con.prepareStatement(sql);
        s.setInt(1, roleid);
        ResultSet rs = s.executeQuery();
       

        int id;
        String username;
        String password;
        String fnane;
        String lname;
        String email;


        while(rs.next()) {
            id=-1;
            username="";
            password="";
            fnane="";
            lname="";
            email="";

            try{
                id = rs.getInt(USERID.toString());
                username=rs.getString(USER.toString());
                password=rs.getString(PSWRD.toString());
                fnane=rs.getString(FNAME.toString());
                lname=rs.getString(LNAME.toString());
                email=rs.getString(EMAIL.toString());
                roleid=rs.getInt(ROLEID.toString());
            }catch(SQLException e){
                logger.trace(e);
            }
            Users User = new Users(id,username,password,fnane,lname,email,roleid);
            Users.add(User);
        }

        return Users;
    }
    
    @Override
    public Users getUserById(int id) throws SQLException {
        String sql = "select * from project01.users WHERE userid = ? LIMIT 1";
        
        PreparedStatement s = con.prepareStatement(sql);
        s.setInt(1, id);
        
        ResultSet rs = s.executeQuery();

        String username="";
        String password="";
        String fnane="";
        String lname="";
        String email="";
        int roleid=-1;
        rs.next();

        try{
            id = rs.getInt(USERID.toString());
            username=rs.getString(USER.toString());
            password=rs.getString(PSWRD.toString());
            fnane=rs.getString(FNAME.toString());
            lname=rs.getString(LNAME.toString());
            email=rs.getString(EMAIL.toString());
            roleid=rs.getInt(ROLEID.toString());
        }catch(SQLException e){
            logger.trace(e);
            throw new SQLException("No found account matching those parameters.");
        }

        return new Users(id,username,password,fnane,lname,email,roleid);
    }

    @Override
    public Users login(String username, String password, int type) throws SQLException {
        String sql = "select * from project01.users WHERE username = ? AND password = ? AND roleid = ? LIMIT 1";
        
        PreparedStatement s = con.prepareStatement(sql);
        s.setString(1, username);
        s.setString(2, encrypt(password));
        s.setInt(3, type);
        
        ResultSet rs = s.executeQuery();

        int id=-1;
        String fnane="";
        String lname="";
        String email="";
        int roleid=-1;

        rs.next();
        try{
            id = rs.getInt(USERID.toString());
            fnane=rs.getString(FNAME.toString());
            lname=rs.getString(LNAME.toString());
            email=rs.getString(EMAIL.toString());
            roleid=rs.getInt(ROLEID.toString());
        }catch(SQLException e){
            logger.trace(e);
            throw new SQLException("No found account matching those parameters.");
        }

        return new Users(id,username,password,fnane,lname,email,roleid);
    }

    @Override
    public boolean updateUser(Users user) throws SQLException {
        String sql = "UPDATE project01.users SET username = ? , password = ?, fnane = ?, lname = ?, email = ?,roleid = ? WHERE userid = ?";

        // try with resources allows us to declare Autoclosable resources so that they are
        // automatically closed at the end of the try block
        PreparedStatement ps = con.prepareStatement(sql);


        ps.setString(1, user.getUserName());
        ps.setString(2, encrypt(user.getPassword()));
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
    
    //SHA-512 Hash
    public static String encrypt(String input)
    {
        if(input==null)return "-1";
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            byte[] messageDigest = md.digest(input.getBytes());
  
            // Convert byte array into signum representation
            BigInteger no = new BigInteger(1, messageDigest);
  
            // Convert message digest into hex value
            String hash = no.toString(16);
  
            // Add preceding 0s to make it 32 bit
            while (hash.length() < 32) {
                hash = "0" + hash;
            }
  
            // return the hash
            return hash;
        }catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
