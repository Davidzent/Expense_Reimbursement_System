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

    public List<Users> fillUsers(Map<String, String> map){
        List<Users> users = new ArrayList<>();

        Users user = new Users();

        for(int i = 0; i < map.size(); i++){
            user.setEmail(map.get("email"));
            user.setUserName("username");
            user.setfName("fname");
            user.setlName("lname");
            user.setRole_ID(Integer.parseInt(map.get("roleid")));

            users.add(user);
        }

        return users;
    }
}
