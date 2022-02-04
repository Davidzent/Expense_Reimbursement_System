package Models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Reimbursement {
    private int reimb_id;
    private double amount;
    private String submitted;
    private String resolved;
    private String description;
    //private Receipt
    private int author;
    private int resolver;
    private int status_ID;
    private int type_ID;

    public Reimbursement() {
    }

    public Reimbursement(int reimb_id, double amount, String submitted, String resolved, String description, int author, int resolver, int status_ID, int type_ID) {
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

    public String getSubmitted() {
        return submitted;
    }

    public String getResolved() {
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

    public void setSubmitted(String submitted) {
        this.submitted = submitted;
    }

    public void setResolved(String resolved) {
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

    public List<Reimbursement> fillReimbursments(Map<String, String> map){
        List<Reimbursement> reimbursements = new ArrayList<>();

        Reimbursement reimbursement = new Reimbursement();

        for(int i = 0; i < map.size(); i++){
            reimbursement.setAmount(Double.parseDouble(map.get("amount")));
            reimbursement.setAuthor(Integer.parseInt(map.get("author")));
            reimbursement.setDescription(map.get("description"));
            reimbursement.setResolver(Integer.parseInt(map.get("resolver")));
            reimbursement.setResolved(map.get("resolved"));
            reimbursement.setStatus_ID(Integer.parseInt(map.get("statusid")));
            reimbursement.setStatus_ID(Integer.parseInt(map.get("typeid")));

            reimbursements.add(reimbursement);
        }

        return reimbursements;
    }
}
