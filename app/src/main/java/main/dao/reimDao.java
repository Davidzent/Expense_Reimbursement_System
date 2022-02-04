package main.dao;

import java.util.List;

public interface reimDao {
    public boolean createUser(Reimbursement user);
    public List<Reimbursement> getAllPeople();
    public Reimbursement getUserById(int id);

    public boolean updateUser(Reimbursement user);
    public Reimbursement login(String username, String password);
}
