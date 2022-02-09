package revature.dao;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import revature.Models.Reimbursement;

import static revature.util.Log.logger;
import static revature.util.ConnectionUtil.con;
import static revature.dao.reimDaoImpl.PARAMS.*;

public class reimDaoImpl implements reimDao {

    public enum PARAMS{  
        RID("reimid"),      
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
        String sql = "insert into project01.reimbursement (amount, submitted, description, author, statusid, typeid) values (?,?,?,?,?,?)";
        
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setDouble(1, reim.getAmount());
        ps.setTimestamp(2, new Timestamp(System.currentTimeMillis()));
        ps.setString(3, reim.getDescription());
        // ps.setDate(8, reim.getResolved());
        ps.setInt(4, reim.getAuthor());
        // ps.setInt(5, reim.getResolver());
        ps.setInt(5, 1);
        ps.setInt(6, reim.getType_ID());
        
        int rowsAffected = ps.executeUpdate();
        if(rowsAffected==1){
            return true;
        }

        return false;
    }

    @Override
    public List<Reimbursement> getAllReim() throws SQLException {
        String sql = "select * from project01.reimbursement";
        
        Statement  s = con.createStatement();
        ResultSet rs = s.executeQuery(sql);
        
        List<Reimbursement> reims = new ArrayList<>();
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

            try{
                id = rs.getInt(RID.toString());
                amount=rs.getDouble(AMOUNT.toString());
                subm=rs.getDate(SUBM.toString());
                resolved=rs.getDate(RESOLV.toString());
                descr=rs.getString(DESCR.toString());
                //receipt=rs.getString(RECEIPT.toString());
                author=rs.getInt(AUTHOR.toString());
                resolver=rs.getInt(RESOLVER.toString());
                status=rs.getInt(STATUS.toString());
                type=rs.getInt(TYPE.toString());
            }catch(SQLException e){
                logger.trace(e);
                // throw new SQLException("No found reimbursement matching those parameters.");
            }

            reims.add(new Reimbursement(id,amount,subm,resolved,descr,author,resolver,status,type));

        }


        return reims;
    }

    @Override
    public Reimbursement getReimById(int id) throws SQLException {
        String sql = "select * from project01.reimbursement WHERE reimid = ? LIMIT 1";
        
        PreparedStatement s = con.prepareStatement(sql);
        s.setInt(1, id);
        
        ResultSet rs = s.executeQuery();
        
        double amount=-1;
        Date subm=new Date(0);
        Date resolved=new Date(0);
        int resolver=-1;
        int author=-1;
        int type=-1;
        int status=-1;
        String descr="";
        //String receipt="";
        rs.next();

        try{
            // id = rs.getInt(RID.toString());
            amount=rs.getDouble(AMOUNT.toString());
            subm=rs.getDate(SUBM.toString());
            resolved=rs.getDate(RESOLV.toString());
            descr=rs.getString(DESCR.toString());
            //receipt=rs.getString(RECEIPT.toString());
            author=rs.getInt(AUTHOR.toString());
            resolver=rs.getInt(RESOLVER.toString());
            status=rs.getInt(STATUS.toString());
            type=rs.getInt(TYPE.toString());
        }catch(SQLException e){
            logger.trace(e);
            throw new SQLException("No found reimbursement matching those parameters.");
        }

        Reimbursement reim = new Reimbursement(id,amount,subm,resolved,descr,author,resolver,status,type);

        return reim;
    }

    @Override
    public List<Reimbursement> getReimByStatus(int status,int author) throws SQLException {
        String sql;
        PreparedStatement s;
        if(author!=-1&&status==-1){
            sql = "select * from project01.reimbursement WHERE author = ?";
            s = con.prepareStatement(sql);
            s.setInt(1, author);
        }
        else if (author==-1&&status!=-1){
            sql = "select * from project01.reimbursement WHERE statusid = ?";
            s = con.prepareStatement(sql);
            s.setInt(1, status);
        }
        else {
            sql = "select * from project01.reimbursement WHERE statusid = ? AND  author = ?";
            s = con.prepareStatement(sql);
            s.setInt(1, status);
            s.setInt(2, author);
        }
        
        ResultSet rs = s.executeQuery();

        List<Reimbursement> reims = new ArrayList<>();

        int id=-1;
        double amount=-1;
        Date subm=new Date(0);
        Date resolved=new Date(0);
        int resolver=-1;
        int type=-1;
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

            try{
                id = rs.getInt(RID.toString());
                amount=rs.getDouble(AMOUNT.toString());
                subm=rs.getDate(SUBM.toString());
                resolved=rs.getDate(RESOLV.toString());
                descr=rs.getString(DESCR.toString());
                //receipt=rs.getString(RECEIPT.toString());
                author=rs.getInt(AUTHOR.toString());
                resolver=rs.getInt(RESOLVER.toString());
                type=rs.getInt(TYPE.toString());
                status=rs.getInt(STATUS.toString());

            }catch(SQLException e){
                logger.trace(e);
                // throw new SQLException("No found reimbursement matching those parameters.");
            }

            reims.add(new Reimbursement(id,amount,subm,resolved,descr,author,resolver,status,type));

        }


        return reims;
    }

    @Override
    public boolean updateReim(Reimbursement reim) throws SQLException {
        String sql = "UPDATE project01.reimbursement SET amount=?,submitted=?,resolved = ?,description=?,author = ?,resolver=?,statusid=?,typeid=? WHERE reimid = ?";

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

    @Override
    public boolean validate(int id, int status,int resolver) throws SQLException {
        String sql = "UPDATE project01.reimbursement SET statusid = ? ,resolved = ? , resolver = ? WHERE reimid = ?";


        PreparedStatement ps = con.prepareStatement(sql);

        ps.setInt(1,status);
        ps.setTimestamp(2,new Timestamp(System.currentTimeMillis()));
        ps.setInt(3, resolver);
        ps.setInt(4,id);


        int rowsAffected = ps.executeUpdate();
        if(rowsAffected==1){
            return true;
        }

        return false;
    }

    
    
    
}
