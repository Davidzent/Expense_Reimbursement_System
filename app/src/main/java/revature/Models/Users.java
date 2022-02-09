package revature.Models;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class Users {
    private int users_ID;
    private String userName;
    private String password;
    private String fName;
    private String lName;
    private String email;
    private int role_ID;

    public Users() {
    }

    public Users(int users_ID, String userName, String password, String fName, String lName, String email, int role_ID) {
        this.users_ID = users_ID;
        this.userName = userName;
        this.password = password;
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.role_ID = role_ID;
    }

    public int getUsers_ID() {
        return users_ID;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public String getfName() {
        return fName;
    }

    public String getlName() {
        return lName;
    }

    public String getEmail() {
        return email;
    }

    public int getRole_ID() {
        return role_ID;
    }

    public void setUsers_ID(int users_ID) {
        this.users_ID = users_ID;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole_ID(int role_ID) {
        this.role_ID = role_ID;
    }

    public static List<Users> fillUsers(Map<String, List<String>> map) throws IndexOutOfBoundsException,NullPointerException{
        List<Users> users = new ArrayList<>();

        Users user = new Users();
        int temp=0;
        int temp2=0;
        
        //creating user we do not have userid.
        //fetching multiple people by id we do not have username
        try{
            temp=map.get("username").size();
            temp2=map.get("userid").size();
        }catch(NullPointerException e){}

        int size=temp>temp2?temp:temp2;

        for(int i = 0; i < size; i++){
            try{user.setUsers_ID(Integer.parseInt(map.get("userid").get(i)));}catch(NullPointerException e){}
            try{user.setUserName(map.get("username").get(i));}catch(NullPointerException e){}
            try{user.setPassword(map.get("password").get(i));}catch(NullPointerException e){}
            try{user.setfName(map.get("fname").get(i));}catch(NullPointerException e){}
            try{user.setlName(map.get("lname").get(i));}catch(NullPointerException e){}
            try{user.setEmail(map.get("email").get(i));}catch(NullPointerException e){}
            try{user.setRole_ID(Integer.parseInt(map.get("roleid").get(i)));}catch(NullPointerException e){}
            

            users.add(user);
        }

        return users;
    }
}
