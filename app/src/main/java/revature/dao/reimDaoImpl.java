package revature.dao;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import revature.Models.Reimbursement;

import static revature.util.ConnectionUtil.con;
import static revature.dao.reimDaoImpl.PARAMS.*;

public class reimDaoImpl implements reimDao {

    public enum PARAMS{  
        RID("reimb_id"),      
        AMOUNT("amount"),
        SUBM("submitted"),
        RESOLV("resolved"),
        DESCR("description"),
        RECEIPT("receipt"),
        AUTHOR("author"),
        RESOLVER("resolver"),
        STATUS("statusid"),
        TYPE("typeid");
  
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
    public boolean createReim(Reimbursement reim) throws SQLException {
        String sql = "insert into reimbursement (amount, submitted, description, author, statusid, typeid,resolved) values (?,?,?,?,?,?,?,?,?)";
        
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setDouble(1, reim.getAmount());
        ps.setDate(2, new Date (System.currentTimeMillis()));
        ps.setString(3, reim.getDescription());
        ps.setDate(8, reim.getResolved());
        ps.setInt(4, reim.getAuthor());
        ps.setInt(5, reim.getResolver());
        ps.setInt(6, reim.getStatus_ID());
        ps.setInt(7, reim.getType_ID());

        int rowsAffected = ps.executeUpdate();
        if(rowsAffected==1){
            return true;
        }

        return false;
    }

    @Override
    public List<Reimbursement> getAllReim() throws SQLException {
        String sql = "select * from reimbursement";
        List<Reimbursement> reims = new ArrayList<>();
        PreparedStatement s = con.prepareStatement(sql);
        ResultSet rs = s.executeQuery(sql);
        
        int id=-1;
        double amount=-1;
        Date subm=new Date(0);
        Date resolved=new Date(0);
        int resolver=-1;
        int author=-1;
        int type=-1;
        int status=-1;
        String descr="";
        //String receipt="";
        while(rs.next()) {
            id=-1;
            amount=-1;
            subm=new Date(0);
            resolved=new Date(0);
            resolver=-1;
            author=-1;
            type=-1;
            status=-1;
            descr="";

            try{id = rs.getInt(RID.toString());}catch(SQLException e){}
            try{amount=rs.getDouble(AMOUNT.toString());}catch(SQLException e){}
            try{subm=rs.getDate(SUBM.toString());}catch(SQLException e){}
            try{resolved=rs.getDate(RESOLV.toString());}catch(SQLException e){}
            try{descr=rs.getString(DESCR.toString());}catch(SQLException e){}
            //try{receipt=rs.getString(RECEIPT.toString());}catch(SQLException e){}
            try{author=rs.getInt(AUTHOR.toString());}catch(SQLException e){}
            try{resolver=rs.getInt(RESOLVER.toString());}catch(SQLException e){}
            try{status=rs.getInt(STATUS.toString());}catch(SQLException e){}
            try{type=rs.getInt(TYPE.toString());}catch(SQLException e){}

            reims.add(new Reimbursement(id,amount,subm,resolved,descr,author,resolver,status,type));

        }


        return reims;
    }

    @Override
    public Reimbursement getReimById(int id) throws SQLException {
        String sql = "select * from reimbursement WHERE reimb_id = ? LIMIT 1";
        
        PreparedStatement s = con.prepareStatement(sql);
        s.setInt(1, id);
        
        ResultSet rs = s.executeQuery(sql);
        
        double amount=-1;
        Date subm=new Date(0);
        Date resolved=new Date(0);
        int resolver=-1;
        int author=-1;
        int type=-1;
        int status=-1;
        String descr="";
        //String receipt="";
        
        try{id = rs.getInt(RID.toString());}catch(SQLException e){}
        try{amount=rs.getDouble(AMOUNT.toString());}catch(SQLException e){}
        try{subm=rs.getDate(SUBM.toString());}catch(SQLException e){}
        try{resolved=rs.getDate(RESOLV.toString());}catch(SQLException e){}
        try{descr=rs.getString(DESCR.toString());}catch(SQLException e){}
        //try{receipt=rs.getString(RECEIPT.toString());}catch(SQLException e){}
        try{author=rs.getInt(AUTHOR.toString());}catch(SQLException e){}
        try{resolver=rs.getInt(RESOLVER.toString());}catch(SQLException e){}
        try{status=rs.getInt(STATUS.toString());}catch(SQLException e){}
        try{type=rs.getInt(TYPE.toString());}catch(SQLException e){}

        Reimbursement reim = new Reimbursement(id,amount,subm,resolved,descr,author,resolver,status,type);

        return reim;
    }

    @Override
    public boolean updateReim(Reimbursement reim) throws SQLException {
        String sql = "UPDATE reimbursement SET amount=?,submitted=?,resolved = ?,description=?,author = ?,resolver=?,statusid=?,typeid=? WHERE reimb_id = ?";

        PreparedStatement ps = con.prepareStatement(sql);


        ps.setDouble(1, reim.getAmount());
        ps.setDate(2, reim.getSubmitted());
        ps.setDate(3, reim.getResolved());
        ps.setString(4, reim.getDescription());
        // ps.setString(5, reim.getr());
        ps.setInt(5, reim.getAuthor());
        ps.setInt(6, reim.getResolver());
        ps.setInt(7, reim.getStatus_ID());
        ps.setInt(8, reim.getType_ID());

        int rowsAffected = ps.executeUpdate();
        if(rowsAffected==1){
            return true;
        }

        return false;
    }
    
}