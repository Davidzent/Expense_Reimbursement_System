package revature.Models;

public enum UsersxRoles {
    // enum fields
    Employee(1), Manager(2);
 
    // internal state
    private int type;

    // constructor
    private UsersxRoles(final int type) {
        this.type = type;
    }

    public int type() {
        return type;
    }
}
