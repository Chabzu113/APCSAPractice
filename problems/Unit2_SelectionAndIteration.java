// Unit 2: Selection and Iteration
// AP CS A Practice Problem Set
//
// Compile: javac problems/Unit2_SelectionAndIteration.java
// Run:     java Unit2_SelectionAndIteration

public class Unit2_SelectionAndIteration {

    // ─── Problems ─────────────────────────────────────────────────────────────

    /**
     * Returns "Fizz" if n is divisible by 3, "Buzz" if divisible by 5,
     * "FizzBuzz" if divisible by both, otherwise returns String.valueOf(n).
     * Example: fizzBuzz(15) → "FizzBuzz", fizzBuzz(9) → "Fizz"
     */
    public static String fizzBuzz(int n) {
        // TODO: implement
        return "";
    }

    /**
     * Returns the sum of the digits of a non-negative integer.
     * Example: sumOfDigits(1234) → 10
     * Precondition: n >= 0
     */
    public static int sumOfDigits(int n) {
        // TODO: implement using a loop and % / /
        return 0;
    }

    /**
     * Returns true if n is prime (n > 1, divisible only by 1 and itself).
     * Example: isPrime(7) → true, isPrime(9) → false
     * Precondition: n >= 0
     */
    public static boolean isPrime(int n) {
        // TODO: implement
        return false;
    }

    /**
     * Returns the number of times ch appears in s (case-sensitive).
     * Example: countChar("hello", 'l') → 2
     */
    public static int countChar(String s, char ch) {
        // TODO: implement
        return 0;
    }

    /**
     * Returns s reversed.
     * Example: reverseString("abc") → "cba"
     */
    public static String reverseString(String s) {
        // TODO: implement
        return "";
    }

    /**
     * Returns true if s is a palindrome (same forwards and backwards, case-sensitive).
     * Example: isPalindrome("racecar") → true, isPalindrome("hello") → false
     */
    public static boolean isPalindrome(String s) {
        // TODO: implement — you may call reverseString()
        return false;
    }

    /**
     * Prints an n x n multiplication table to System.out.
     * Row and column values go from 1 to n.
     * Numbers are separated by tabs (\t).
     * Example: multiplicationTable(3) prints:
     *   1  2  3
     *   2  4  6
     *   3  6  9
     */
    public static void multiplicationTable(int n) {
        // TODO: implement using nested loops
    }

    /**
     * Returns the largest prime number that is strictly less than n.
     * Returns -1 if no such prime exists.
     * Example: largestPrimeLessThan(20) → 19
     * Precondition: n >= 2
     */
    public static int largestPrimeLessThan(int n) {
        // TODO: implement — you may call isPrime()
        return -1;
    }

    /**
     * Returns the number of steps in the Collatz sequence starting from n.
     * Rules: if n is even, next = n/2; if n is odd, next = 3n+1. Stop when n==1.
     * The starting number counts as step 0; reaching 1 adds 1 to the count.
     * Example: collatzLength(6) → 8  (6→3→10→5→16→8→4→2→1)
     * Precondition: n >= 1
     */
    public static int collatzLength(int n) {
        // TODO: implement
        return 0;
    }

    // ─── Test Driver ─────────────────────────────────────────────────────────

    public static void main(String[] args) {
        int passed = 0, total = 0;

        // fizzBuzz
        passed += check("fizzBuzz(1)", fizzBuzz(1), "1"); total++;
        passed += check("fizzBuzz(3)", fizzBuzz(3), "Fizz"); total++;
        passed += check("fizzBuzz(5)", fizzBuzz(5), "Buzz"); total++;
        passed += check("fizzBuzz(15)", fizzBuzz(15), "FizzBuzz"); total++;
        passed += check("fizzBuzz(7)", fizzBuzz(7), "7"); total++;

        // sumOfDigits
        passed += check("sumOfDigits(1234)", sumOfDigits(1234), 10); total++;
        passed += check("sumOfDigits(0)", sumOfDigits(0), 0); total++;
        passed += check("sumOfDigits(999)", sumOfDigits(999), 27); total++;

        // isPrime
        passed += check("isPrime(2)", isPrime(2), true); total++;
        passed += check("isPrime(7)", isPrime(7), true); total++;
        passed += check("isPrime(9)", isPrime(9), false); total++;
        passed += check("isPrime(1)", isPrime(1), false); total++;
        passed += check("isPrime(0)", isPrime(0), false); total++;

        // countChar
        passed += check("countChar(hello,l)", countChar("hello", 'l'), 2); total++;
        passed += check("countChar(aaa,a)", countChar("aaa", 'a'), 3); total++;
        passed += check("countChar(abc,z)", countChar("abc", 'z'), 0); total++;

        // reverseString
        passed += check("reverse(abc)", reverseString("abc"), "cba"); total++;
        passed += check("reverse(a)", reverseString("a"), "a"); total++;
        passed += check("reverse(abcd)", reverseString("abcd"), "dcba"); total++;

        // isPalindrome
        passed += check("isPalin(racecar)", isPalindrome("racecar"), true); total++;
        passed += check("isPalin(hello)", isPalindrome("hello"), false); total++;
        passed += check("isPalin(a)", isPalindrome("a"), true); total++;

        // multiplicationTable (just run it — visual check)
        System.out.println("--- Multiplication Table (n=3) ---");
        multiplicationTable(3);
        System.out.println("----------------------------------");

        // largestPrimeLessThan
        passed += check("largestPrime<20", largestPrimeLessThan(20), 19); total++;
        passed += check("largestPrime<10", largestPrimeLessThan(10), 7); total++;
        passed += check("largestPrime<3", largestPrimeLessThan(3), 2); total++;

        // collatzLength
        passed += check("collatz(1)", collatzLength(1), 0); total++;
        passed += check("collatz(6)", collatzLength(6), 8); total++;
        passed += check("collatz(27)", collatzLength(27), 111); total++;

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
    static int check(String name, String got, String expected) {
        boolean ok = expected.equals(got);
        System.out.println((ok ? "PASS" : "FAIL") + " " + name +
            (ok ? "" : " | expected=\"" + expected + "\" got=\"" + got + "\""));
        return ok ? 1 : 0;
    }
}
