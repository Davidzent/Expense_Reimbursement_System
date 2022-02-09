package revature.Models;

public enum ReimbursementxType {
    // enum fields
    LODGING(1), TRAVEL(2), FOOD(3), OTHER(4);

 
    // internal state
    private int type;

    // constructor
    private ReimbursementxType(final int type) {
        this.type = type;
    }

    public int type() {
        return type;
    }
}
