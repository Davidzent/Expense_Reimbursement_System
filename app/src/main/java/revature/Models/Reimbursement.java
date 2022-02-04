package revature.Models;

import java.sql.Date;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Reimbursement {
    private int reimb_id;
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

    public Reimbursement(int reimb_id, double amount, Date submitted, Date resolved, String description, int author, int resolver, int status_ID, int type_ID) {
        this.reimb_id = reimb_id;
        this.amount = amount;
        this.submitted = submitted;
        this.resolved = resolved;
        this.description = description;
        this.author = author;
        this.resolver = resolver;
        this.status_ID = status_ID;
        this.type_ID = type_ID;
    }

    public int getReimb_id() {
        return reimb_id;
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

    public void setReimb_id(int reimb_id) {
        this.reimb_id = reimb_id;
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

    public static List<Reimbursement> fillReimbursments(Map<String, List<String>> map){
        List<Reimbursement> reimbursements = new ArrayList<>();

        Reimbursement reimbursement = new Reimbursement();

        for(int i = 0; i < map.size(); i++){
            reimbursement.setAmount(Double.parseDouble(map.get("reimb_id").get(i)));
            reimbursement.setAmount(Double.parseDouble(map.get("amount").get(i)));
            //reimbursement.setResolved(map.get("submitted").get(i));
            //reimbursement.setResolved(map.get("resolved").get(i));
            reimbursement.setDescription(map.get("description").get(i));
            reimbursement.setAuthor(Integer.parseInt(map.get("author").get(i)));
            reimbursement.setResolver(Integer.parseInt(map.get("resolver").get(i)));
            reimbursement.setStatus_ID(Integer.parseInt(map.get("statusid").get(i)));
            reimbursement.setStatus_ID(Integer.parseInt(map.get("typeid").get(i)));

            reimbursements.add(reimbursement);
        }

        return reimbursements;
    }
}
