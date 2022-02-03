package main.dao;

public interface userDao {
    public boolean createUser(Users user);
    public List<Users> getAllPeople();
    public Users getUserById(int id);

    public boolean updateUser(Users user);
    public Users login(String username, String password);
}
