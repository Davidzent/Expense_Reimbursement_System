package revature.Models;

public enum ReimbursementxStatus {
    // enum fields
    Active(1), NonActive(2);

    // internal state
    private int status;

    // constructor
    private ReimbursementxStatus(final int status) {
        this.status = status;
    }

    public int status() {
        return status;
    }
}
