// Unit 4: Data Collections
// AP CS A Practice Problem Set
//
// Compile: javac problems/Unit4_DataCollections.java
// Run:     java Unit4_DataCollections

import java.util.ArrayList;
import java.util.Arrays;

public class Unit4_DataCollections {

    // ─── Part A: Array Algorithms ──────────────────────────────────────────────

    /** Returns the maximum value in arr.
     *  Precondition: arr.length >= 1 */
    public static int findMax(int[] arr) {
        // TODO
        return 0;
    }

    /** Returns the minimum value in arr.
     *  Precondition: arr.length >= 1 */
    public static int findMin(int[] arr) {
        // TODO
        return 0;
    }

    /** Returns the average of arr as a double.
     *  Precondition: arr.length >= 1 */
    public static double average(int[] arr) {
        // TODO
        return 0.0;
    }

    /** Returns a NEW array that is the reverse of arr.
     *  Does not modify arr. */
    public static int[] reverseArray(int[] arr) {
        // TODO
        return new int[0];
    }

    /** Returns the number of elements in arr that are strictly greater than value. */
    public static int countGreaterThan(int[] arr, int value) {
        // TODO
        return 0;
    }

    /** Returns the index of target in arr, or -1 if not found. (Linear search) */
    public static int linearSearch(int[] arr, int target) {
        // TODO
        return -1;
    }

    /** Sorts arr in ascending order using selection sort. Modifies arr in place. */
    public static void selectionSort(int[] arr) {
        // TODO
    }

    // ─── Part B: ArrayList Algorithms ─────────────────────────────────────────

    /** Returns a new ArrayList with duplicates removed (preserves first occurrence order). */
    public static ArrayList<Integer> removeDuplicates(ArrayList<Integer> list) {
        // TODO
        return new ArrayList<>();
    }

    /** Returns a new ArrayList containing only the positive elements of list. */
    public static ArrayList<Integer> filterPositive(ArrayList<Integer> list) {
        // TODO
        return new ArrayList<>();
    }

    /** Returns a single String joining all elements of words with separator between them.
     *  Example: joinStrings(["a","b","c"], "-") → "a-b-c"
     *  Returns "" if words is empty. */
    public static String joinStrings(ArrayList<String> words, String separator) {
        // TODO
        return "";
    }

    // ─── Part C: 2D Array Algorithms ─────────────────────────────────────────

    /** Returns the sum of all elements in the specified row of matrix.
     *  Precondition: row is a valid index. */
    public static int rowSum(int[][] matrix, int row) {
        // TODO
        return 0;
    }

    /** Returns the sum of all elements in the specified column of matrix.
     *  Precondition: col is a valid index. */
    public static int colSum(int[][] matrix, int col) {
        // TODO
        return 0;
    }

    /** Returns true if target is found anywhere in the 2D grid. */
    public static boolean findInGrid(int[][] grid, int target) {
        // TODO
        return false;
    }

    /** Returns the transpose of matrix (swap rows and columns).
     *  Result dimensions: [matrix[0].length][matrix.length] */
    public static int[][] transpose(int[][] matrix) {
        // TODO
        return new int[0][0];
    }

    // ─── Part D: Recursion ────────────────────────────────────────────────────

    /** Returns n! (n factorial) recursively.
     *  Precondition: n >= 0
     *  0! = 1, n! = n * (n-1)! */
    public static long factorial(int n) {
        // TODO
        return 0;
    }

    /** Returns the n-th Fibonacci number recursively.
     *  fib(0)=0, fib(1)=1, fib(n) = fib(n-1) + fib(n-2)
     *  Precondition: n >= 0 */
    public static long fibonacci(int n) {
        // TODO
        return 0;
    }

    /** Returns base raised to the power exp recursively.
     *  Precondition: exp >= 0 */
    public static long power(long base, int exp) {
        // TODO
        return 0;
    }

    /** Binary search: returns index of target in SORTED arr, or -1 if not found.
     *  Implements recursively using lo and hi bounds. */
    public static int binarySearch(int[] arr, int lo, int hi, int target) {
        // TODO
        return -1;
    }

    /** Returns sum of all integers from 1 to n recursively.
     *  Precondition: n >= 0; sumRecursive(0) = 0 */
    public static long sumRecursive(int n) {
        // TODO
        return 0;
    }

    // ─── Test Driver ─────────────────────────────────────────────────────────

    public static void main(String[] args) {
        int passed = 0, total = 0;

        // ── Part A ──
        int[] a = {3, 7, 2, 9, 4};
        passed += check("findMax", findMax(a), 9); total++;
        passed += check("findMin", findMin(a), 2); total++;
        passed += check("average", average(a), 5.0, 0.001); total++;

        int[] rev = reverseArray(a);
        passed += check("reverseArray[0]", rev[0], 4); total++;
        passed += check("reverseArray[4]", rev[4], 3); total++;
        passed += check("reverseArray original unchanged", a[0], 3); total++;

        passed += check("countGreaterThan(>4)", countGreaterThan(a, 4), 2); total++;
        passed += check("linearSearch(9)", linearSearch(a, 9), 3); total++;
        passed += check("linearSearch(99)", linearSearch(a, 99), -1); total++;

        int[] sortArr = {5, 2, 8, 1, 9, 3};
        selectionSort(sortArr);
        passed += check("selectionSort[0]", sortArr[0], 1); total++;
        passed += check("selectionSort[5]", sortArr[5], 9); total++;
        passed += check("selectionSort[2]", sortArr[2], 3); total++;

        // ── Part B ──
        ArrayList<Integer> dup = new ArrayList<>(Arrays.asList(1,2,2,3,1,4));
        ArrayList<Integer> uniq = removeDuplicates(dup);
        passed += check("removeDuplicates size", uniq.size(), 4); total++;
        passed += check("removeDuplicates[0]", uniq.get(0), 1); total++;

        ArrayList<Integer> mix = new ArrayList<>(Arrays.asList(-3, 5, -1, 0, 7, 2));
        ArrayList<Integer> pos = filterPositive(mix);
        passed += check("filterPositive size", pos.size(), 3); total++;
        passed += check("filterPositive[0]", pos.get(0), 5); total++;

        ArrayList<String> words = new ArrayList<>(Arrays.asList("a","b","c"));
        passed += check("joinStrings", joinStrings(words, "-"), "a-b-c"); total++;
        passed += check("joinStrings empty", joinStrings(new ArrayList<>(), ","), ""); total++;

        // ── Part C ──
        int[][] m = {{1,2,3},{4,5,6},{7,8,9}};
        passed += check("rowSum(0)", rowSum(m, 0), 6); total++;
        passed += check("rowSum(2)", rowSum(m, 2), 24); total++;
        passed += check("colSum(1)", colSum(m, 1), 15); total++;
        passed += check("findInGrid(5)", findInGrid(m, 5), true); total++;
        passed += check("findInGrid(99)", findInGrid(m, 99), false); total++;

        int[][] t = transpose(m);
        passed += check("transpose[0][1]", t[0][1], 4); total++;
        passed += check("transpose[1][2]", t[1][2], 8); total++;

        // ── Part D ──
        passed += check("factorial(0)", factorial(0), 1); total++;
        passed += check("factorial(5)", factorial(5), 120); total++;
        passed += check("factorial(10)", factorial(10), 3628800); total++;

        passed += check("fibonacci(0)", fibonacci(0), 0); total++;
        passed += check("fibonacci(1)", fibonacci(1), 1); total++;
        passed += check("fibonacci(7)", fibonacci(7), 13); total++;

        passed += check("power(2,10)", power(2, 10), 1024); total++;
        passed += check("power(3,4)", power(3, 4), 81); total++;
        passed += check("power(5,0)", power(5, 0), 1); total++;

        int[] sorted = {1, 3, 5, 7, 9, 11, 13};
        passed += check("binarySearch(7)", binarySearch(sorted, 0, sorted.length-1, 7), 3); total++;
        passed += check("binarySearch(1)", binarySearch(sorted, 0, sorted.length-1, 1), 0); total++;
        passed += check("binarySearch(99)", binarySearch(sorted, 0, sorted.length-1, 99), -1); total++;

        passed += check("sumRecursive(0)", sumRecursive(0), 0); total++;
        passed += check("sumRecursive(5)", sumRecursive(5), 15); total++;
        passed += check("sumRecursive(10)", sumRecursive(10), 55); total++;

        System.out.println("\n=== Results: " + passed + "/" + total + " tests passed ===");
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────
    static int check(String name, int got, int expected) {
        boolean ok = got == expected;
        System.out.println((ok ? "PASS" : "FAIL") + " " + name +
            (ok ? "" : " | expected=" + expected + " got=" + got));
        return ok ? 1 : 0;
    }
    static int check(String name, long got, long expected) {
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
    static int check(String name, String got, String expected) {
        boolean ok = expected.equals(got);
        System.out.println((ok ? "PASS" : "FAIL") + " " + name +
            (ok ? "" : "\n  expected: \"" + expected + "\"\n  got:      \"" + got + "\""));
        return ok ? 1 : 0;
    }
}
