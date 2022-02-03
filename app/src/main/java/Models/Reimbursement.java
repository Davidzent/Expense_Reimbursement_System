package Models;

public class Reimbursement {
    private int reimb_id;
    private double amount;
    private String submitted;
    private String resolved;
    private String description;
    //private Receipt
    private int author;
    private int resolver;
    private ReimbursementxStatus status_ID;
    private ReimbursementxType type_ID;

    public Reimbursement() {
    }

    public Reimbursement(int reimb_id, double amount, String submitted, String resolved, String description, int author, int resolver, ReimbursementxStatus status_ID, ReimbursementxType type_ID) {
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

    public ReimbursementxStatus getStatus_ID() {
        return status_ID;
    }

    public ReimbursementxType getType_ID() {
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

    public void setStatus_ID(ReimbursementxStatus status_ID) {
        this.status_ID = status_ID;
    }

    public void setType_ID(ReimbursementxType type_ID) {
        this.type_ID = type_ID;
    }
}
