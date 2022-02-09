package revature.dao;

import java.sql.SQLException;
import java.util.List;

import revature.Models.Reimbursement;

public interface reimDao {
    public boolean createReim(Reimbursement user) throws SQLException;
    public List<Reimbursement> getAllReim() throws SQLException;
    public Reimbursement getReimById(int id) throws SQLException;
    public List<Reimbursement> getReimByStatus(int id,int author) throws SQLException;
    public boolean updateReim(Reimbursement user) throws SQLException;
    public boolean validate(int id, int status,int author) throws SQLException;

}
