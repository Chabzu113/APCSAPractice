// Unit 1: Using Objects and Methods
// AP CS A Practice Problem Set
//
// Compile: javac problems/Unit1_UsingObjectsAndMethods.java
// Run:     java Unit1_UsingObjectsAndMethods

public class Unit1_UsingObjectsAndMethods {

    // ─── Problems ─────────────────────────────────────────────────────────────

    /**
     * Returns the remainder when a is divided by b.
     * Example: remainder(10, 3) → 1
     * Precondition: b != 0
     */
    public static int remainder(int a, int b) {
        // TODO: implement
        return 0;
    }

    /**
     * Returns true if n is odd, false if even.
     * Example: isOdd(7) → true, isOdd(4) → false
     */
    public static boolean isOdd(int n) {
        // TODO: implement
        return false;
    }

    /**
     * Converts Celsius to Fahrenheit using: F = C * 9/5 + 32
     * Example: celsiusToFahrenheit(100.0) → 212.0
     */
    public static double celsiusToFahrenheit(double celsius) {
        // TODO: implement
        return 0.0;
    }

    /**
     * Returns the absolute value of n without using Math.abs().
     * Example: absoluteValue(-5) → 5, absoluteValue(3) → 3
     */
    public static int absoluteValue(int n) {
        // TODO: implement
        return 0;
    }

    /**
     * Returns the ones digit of a non-negative integer.
     * Example: onesDigit(1234) → 4, onesDigit(7) → 7
     * Precondition: n >= 0
     */
    public static int onesDigit(int n) {
        // TODO: implement
        return 0;
    }

    /**
     * Returns the integer nearest to x (rounds 0.5 up).
     * Example: roundToInt(3.7) → 4, roundToInt(2.1) → 2
     */
    public static int roundToInt(double x) {
        // TODO: implement using (int) casting, not Math.round()
        return 0;
    }

    /**
     * Returns the hypotenuse of a right triangle with legs a and b.
     * Formula: sqrt(a^2 + b^2)
     * Example: hypotenuse(3.0, 4.0) → 5.0
     */
    public static double hypotenuse(double a, double b) {
        // TODO: implement using Math.sqrt and Math.pow
        return 0.0;
    }

    /**
     * Returns the first character of s.
     * Example: firstChar("Hello") → 'H'
     * Precondition: s.length() >= 1
     */
    public static char firstChar(String s) {
        // TODO: implement using charAt
        return ' ';
    }

    /**
     * Returns the last 3 characters of s.
     * Example: lastThree("abcdef") → "def"
     * Precondition: s.length() >= 3
     */
    public static String lastThree(String s) {
        // TODO: implement using substring
        return "";
    }

    /**
     * Returns the number of vowels (a, e, i, o, u — upper or lower case) in s.
     * Example: countVowels("Hello World") → 3
     */
    public static int countVowels(String s) {
        // TODO: implement using a loop and charAt
        return 0;
    }

    // ─── Test Driver ─────────────────────────────────────────────────────────

    public static void main(String[] args) {
        int passed = 0, total = 0;

        // remainder
        passed += check("remainder(10,3)", remainder(10, 3), 1); total++;
        passed += check("remainder(7,2)", remainder(7, 2), 1); total++;
        passed += check("remainder(8,4)", remainder(8, 4), 0); total++;

        // isOdd
        passed += check("isOdd(7)", isOdd(7), true); total++;
        passed += check("isOdd(4)", isOdd(4), false); total++;
        passed += check("isOdd(0)", isOdd(0), false); total++;

        // celsiusToFahrenheit
        passed += check("c2f(100)", celsiusToFahrenheit(100.0), 212.0, 0.001); total++;
        passed += check("c2f(0)", celsiusToFahrenheit(0.0), 32.0, 0.001); total++;
        passed += check("c2f(-40)", celsiusToFahrenheit(-40.0), -40.0, 0.001); total++;

        // absoluteValue
        passed += check("abs(-5)", absoluteValue(-5), 5); total++;
        passed += check("abs(3)", absoluteValue(3), 3); total++;
        passed += check("abs(0)", absoluteValue(0), 0); total++;

        // onesDigit
        passed += check("onesDigit(1234)", onesDigit(1234), 4); total++;
        passed += check("onesDigit(7)", onesDigit(7), 7); total++;
        passed += check("onesDigit(100)", onesDigit(100), 0); total++;

        // roundToInt
        passed += check("roundToInt(3.7)", roundToInt(3.7), 4); total++;
        passed += check("roundToInt(2.1)", roundToInt(2.1), 2); total++;
        passed += check("roundToInt(2.5)", roundToInt(2.5), 3); total++;

        // hypotenuse
        passed += check("hypotenuse(3,4)", hypotenuse(3.0, 4.0), 5.0, 0.001); total++;
        passed += check("hypotenuse(5,12)", hypotenuse(5.0, 12.0), 13.0, 0.001); total++;

        // firstChar
        passed += check("firstChar(Hello)", firstChar("Hello"), 'H'); total++;
        passed += check("firstChar(a)", firstChar("abc"), 'a'); total++;

        // lastThree
        passed += check("lastThree(abcdef)", lastThree("abcdef"), "def"); total++;
        passed += check("lastThree(xyz)", lastThree("xyz"), "xyz"); total++;

        // countVowels
        passed += check("countVowels(Hello World)", countVowels("Hello World"), 3); total++;
        passed += check("countVowels(AEIOU)", countVowels("AEIOU"), 5); total++;
        passed += check("countVowels(rhythm)", countVowels("rhythm"), 0); total++;

        System.out.println("\n=== Results: " + passed + "/" + total + " tests passed ===");
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────
    static int check(String name, int got, int expected) {
        boolean ok = got == expected;
        System.out.println((ok ? "PASS" : "FAIL") + " " + name +
            (ok ? "" : " | expected=" + expected + " got=" + got));
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
    static int check(String name, char got, char expected) {
        boolean ok = got == expected;
        System.out.println((ok ? "PASS" : "FAIL") + " " + name +
            (ok ? "" : " | expected='" + expected + "' got='" + got + "'"));
        return ok ? 1 : 0;
    }
    static int check(String name, String got, String expected) {
        boolean ok = expected.equals(got);
        System.out.println((ok ? "PASS" : "FAIL") + " " + name +
            (ok ? "" : " | expected=\"" + expected + "\" got=\"" + got + "\""));
        return ok ? 1 : 0;
    }
}
