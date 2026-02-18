// Unit 3: Class Creation
// AP CS A Practice Problem Set
//
// Compile: javac problems/Unit3_ClassCreation.java
// Run:     java Unit3_ClassCreation

public class Unit3_ClassCreation {

    // ─── Problem 1: BankAccount Class ────────────────────────────────────────
    /**
     * TODO: Implement the BankAccount class below.
     *
     * A BankAccount has:
     *   - owner (String) — name of the account owner
     *   - balance (double) — current balance, initialized to 0.0
     *
     * Methods:
     *   - BankAccount(String owner)  constructor
     *   - String getOwner()          returns owner
     *   - double getBalance()        returns balance
     *   - void deposit(double amount)  adds amount to balance (ignore if amount <= 0)
     *   - boolean withdraw(double amount)
     *       If amount > 0 and amount <= balance: deduct and return true
     *       Otherwise: return false
     *   - boolean transfer(BankAccount target, double amount)
     *       Withdraw from this account and deposit into target; return true on success
     *   - String toString()
     *       Returns: "owner: $balance" with balance formatted to 2 decimal places
     *       Example: "Alice: $150.00"
     */
    static class BankAccount {
        // TODO: implement
    }

    // ─── Problem 2: Student Class ─────────────────────────────────────────────
    /**
     * TODO: Implement the Student class below.
     *
     * A Student has:
     *   - name (String)
     *   - grades (double array of size 5, initially all 0.0)
     *   - count (int) — number of grades added so far
     *
     * Methods:
     *   - Student(String name)        constructor
     *   - String getName()            returns name
     *   - void addGrade(double grade) adds grade to next slot (ignore if full or grade < 0)
     *   - double getAverage()         returns average of added grades (0.0 if none)
     *   - String getLetterGrade()
     *       Based on getAverage():
     *         >= 90 → "A", >= 80 → "B", >= 70 → "C", >= 60 → "D", else → "F"
     *   - String toString()
     *       Returns: "Student[name=NAME, avg=XX.XX, grade=G]"
     *       Example: "Student[name=Eve, avg=85.00, grade=B]"
     */
    static class Student {
        // TODO: implement
    }

    // ─── Test Driver ─────────────────────────────────────────────────────────

    public static void main(String[] args) {
        int passed = 0, total = 0;

        // BankAccount tests
        BankAccount alice = new BankAccount("Alice");
        passed += check("alice.getOwner()", alice.getOwner(), "Alice"); total++;
        passed += check("alice.getBalance() init", alice.getBalance(), 0.0, 0.001); total++;

        alice.deposit(200.0);
        passed += check("after deposit 200", alice.getBalance(), 200.0, 0.001); total++;

        alice.deposit(-50.0); // should be ignored
        passed += check("after invalid deposit", alice.getBalance(), 200.0, 0.001); total++;

        boolean ok1 = alice.withdraw(75.0);
        passed += check("withdraw 75 success", ok1, true); total++;
        passed += check("balance after withdraw", alice.getBalance(), 125.0, 0.001); total++;

        boolean ok2 = alice.withdraw(200.0);
        passed += check("withdraw 200 fail", ok2, false); total++;
        passed += check("balance unchanged", alice.getBalance(), 125.0, 0.001); total++;

        BankAccount bob = new BankAccount("Bob");
        boolean ok3 = alice.transfer(bob, 50.0);
        passed += check("transfer 50 success", ok3, true); total++;
        passed += check("alice after transfer", alice.getBalance(), 75.0, 0.001); total++;
        passed += check("bob after transfer", bob.getBalance(), 50.0, 0.001); total++;

        passed += check("alice.toString()", alice.toString(), "Alice: $75.00"); total++;

        // Student tests
        Student eve = new Student("Eve");
        passed += check("eve.getName()", eve.getName(), "Eve"); total++;
        passed += check("eve avg no grades", eve.getAverage(), 0.0, 0.001); total++;

        eve.addGrade(90.0);
        eve.addGrade(80.0);
        eve.addGrade(85.0);
        passed += check("eve avg 3 grades", eve.getAverage(), 85.0, 0.001); total++;
        passed += check("eve letter grade", eve.getLetterGrade(), "B"); total++;

        Student tom = new Student("Tom");
        tom.addGrade(55.0);
        tom.addGrade(60.0);
        passed += check("tom avg", tom.getAverage(), 57.5, 0.001); total++;
        passed += check("tom letter grade F", tom.getLetterGrade(), "F"); total++;

        // toString check
        Student sam = new Student("Sam");
        sam.addGrade(92.0);
        sam.addGrade(95.0);
        sam.addGrade(91.0);
        // avg = 92.67, grade = A
        String samStr = sam.toString();
        passed += check("sam toString starts", samStr.startsWith("Student[name=Sam"), true); total++;
        passed += check("sam toString grade A", samStr.contains("grade=A"), true); total++;

        System.out.println("\n=== Results: " + passed + "/" + total + " tests passed ===");
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────
    static int check(String name, String got, String expected) {
        boolean ok = expected.equals(got);
        System.out.println((ok ? "PASS" : "FAIL") + " " + name +
            (ok ? "" : "\n  expected: \"" + expected + "\"\n  got:      \"" + got + "\""));
        return ok ? 1 : 0;
    }
    static int check(String name, boolean got, boolean expected) {
        boolean ok = got == expected;
        System.out.println((ok ? "PASS" : "FAIL") + " " + name +
            (ok ? "" : " | expected=" + expected + " got=" + got));
        return ok ? 1 : 0;
    }
    static int check(String name, double got, double expected, double eps) {
        boolean ok = Math.abs(got - expected) <= eps;
        System.out.println((ok ? "PASS" : "FAIL") + " " + name +
            (ok ? "" : " | expected=" + expected + " got=" + got));
        return ok ? 1 : 0;
    }
}
