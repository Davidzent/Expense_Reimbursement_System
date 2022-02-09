package revature.Models;

import java.sql.Date;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Reimbursement {
    private int reimid;
    private double amount;
    private Date submitted;
    private Date resolved;
    private String description;
    //private Receipt
    private int author;
    private int resolver;
    private int status_ID;
    private int type_ID;

    public Reimbursement() {
    }

    public Reimbursement(int reimid, double amount, Date submitted, Date resolved, String description, int author, int resolver, int status_ID, int type_ID) {
        this.reimid = reimid;
        this.amount = amount;
        this.submitted = submitted;
        this.resolved = resolved;
        this.description = description;
        this.author = author;
        this.resolver = resolver;
        this.status_ID = status_ID;
        this.type_ID = type_ID;
    }

    public int getreimid() {
        return reimid;
    }

    public double getAmount() {
        return amount;
    }

    public Date getSubmitted() {
        return submitted;
    }

    public Date getResolved() {
        return resolved;
    }

    public String getDescription() {
        return description;
    }

    public int getAuthor() {
        return author;
    }

    public int getResolver() {
        return resolver;
    }

    public int getStatus_ID() {
        return status_ID;
    }

    public int getType_ID() {
        return type_ID;
    }

    public void setreimid(int reimid) {
        this.reimid = reimid;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setSubmitted(Date submitted) {
        this.submitted = submitted;
    }

    public void setResolved(Date resolved) {
        this.resolved = resolved;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAuthor(int author) {
        this.author = author;
    }

    public void setResolver(int resolver) {
        this.resolver = resolver;
    }

    public void setStatus_ID(int status_ID) {
        this.status_ID = status_ID;
    }

    public void setType_ID(int type_ID) {
        this.type_ID = type_ID;
    }

    public static List<Reimbursement> fillReimbursments(Map<String, List<String>> map)throws IndexOutOfBoundsException,NullPointerException{
        List<Reimbursement> reimbursements = new ArrayList<>();

        Reimbursement reimbursement = new Reimbursement();
        int temp=0;
        int temp2=0;
        
        try{temp=map.get("reimid").size();}catch(NullPointerException e){}
        try{temp2=map.get("amount").size();}catch(NullPointerException e){}
        

        int size=temp>temp2?temp:temp2;


        for(int i = 0; i < size; i++){
            try{reimbursement.setreimid(Integer.parseInt(map.get("reimid").get(i)));}catch(NullPointerException e){}
            try{reimbursement.setAmount(Double.parseDouble(map.get("amount").get(i)));}catch(NullPointerException e){}
            // try{reimbursement.setSubmitted(map.get("submitted").get(i));}catch(NullPointerException e){}
            // try{reimbursement.setResolved(map.get("resolved").get(i));}catch(NullPointerException e){}
            try{reimbursement.setDescription(map.get("description").get(i));}catch(NullPointerException e){}
            try{reimbursement.setDescription(map.get("description").get(i));}catch(NullPointerException e){}
            try{reimbursement.setAuthor(Integer.parseInt(map.get("author").get(i)));}catch(NullPointerException e){}
            try{reimbursement.setResolver(Integer.parseInt(map.get("resolver").get(i)));}catch(NullPointerException e){}
            try{reimbursement.setStatus_ID(Integer.parseInt(map.get("statusid").get(i)));}catch(NullPointerException e){}
            try{reimbursement.setType_ID(Integer.parseInt(map.get("typeid").get(i)));}catch(NullPointerException e){}    

            reimbursements.add(reimbursement);
        }

        return reimbursements;
    }
}
