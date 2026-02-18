const FRQ_BANK = [
  // ─── CB 2022 FRQs ──────────────────────────────────────────────────────────

  {
    id: "frq_001",
    year: 2022,
    type: "Methods & Control Structures",
    title: "Game",
    units: [1, 2],
    difficulty: "medium",
    source: "CB 2022 FRQ 1",
    prompt: `The Game class represents a simple game. The game involves shooting at targets, and
each target has a point value. A partial declaration of the Game class is shown below.

public class Game {
    private int[] targets;   // array of target point values
    private int score;       // current score

    /** Constructs a Game object with the given array of targets and score = 0. */
    public Game(int[] t) {
        targets = t;
        score = 0;
    }

    /** Returns the sum of all target values that are greater than min.
     *  Precondition: min >= 0
     */
    public int scoreAbove(int min) {
        /* to be implemented in part (a) */
    }

    /** Returns true if all targets have value > threshold, false otherwise. */
    public boolean allAbove(int threshold) {
        /* to be implemented in part (b) */
    }

    // There may be other instance variables, constructors, and methods not shown.
}`,
    starterCode: `public class Game {
    private int[] targets;
    private int score;

    public Game(int[] t) {
        targets = t;
        score = 0;
    }

    // Part (a): Return sum of all target values greater than min
    public int scoreAbove(int min) {
        // YOUR CODE HERE
    }

    // Part (b): Return true if ALL targets have value > threshold
    public boolean allAbove(int threshold) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Complete method scoreAbove(int min) that returns the sum of all target values greater than min.",
        points: 4
      },
      {
        label: "b",
        instruction: "Complete method allAbove(int threshold) that returns true if every target value is greater than threshold, false otherwise.",
        points: 3
      }
    ],
    rubric: [
      { points: 1, description: "(a) Accesses each element of targets array" },
      { points: 1, description: "(a) Correctly compares target value to min using >" },
      { points: 1, description: "(a) Accumulates sum of qualifying elements" },
      { points: 1, description: "(a) Returns correct sum" },
      { points: 1, description: "(b) Accesses each element of targets array" },
      { points: 1, description: "(b) Returns false when any element is NOT > threshold" },
      { points: 1, description: "(b) Returns true only when ALL elements satisfy the condition" }
    ],
    sampleSolution: `// Part (a)
public int scoreAbove(int min) {
    int sum = 0;
    for (int t : targets) {
        if (t > min) sum += t;
    }
    return sum;
}

// Part (b)
public boolean allAbove(int threshold) {
    for (int t : targets) {
        if (t <= threshold) return false;
    }
    return true;
}`
  },

  {
    id: "frq_002",
    year: 2022,
    type: "Class Design",
    title: "Textbook",
    units: [3],
    difficulty: "hard",
    source: "CB 2022 FRQ 2",
    prompt: `A Textbook is a type of book used in a course. Write the Textbook class that
satisfies the following specifications.

A textbook has:
- A title (String)
- An author (String)
- An edition number (int, >= 1)

The Textbook class must:
1. Have a constructor that takes title, author, and edition
2. Have a getEdition() method that returns the edition
3. Have a canSubstituteFor(Textbook other) method that returns true if this textbook
   has the same title and author as other, and this edition >= other's edition
4. Have a toString() method returning: "title - author - Edition: N"`,
    starterCode: `public class Textbook {
    // Instance variables
    
    // Constructor
    public Textbook(String title, String author, int edition) {
        // YOUR CODE HERE
    }
    
    // Returns the edition number
    public int getEdition() {
        // YOUR CODE HERE
    }
    
    // Returns true if this book can substitute for other
    public boolean canSubstituteFor(Textbook other) {
        // YOUR CODE HERE
    }
    
    // Returns "title - author - Edition: N"
    public String toString() {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write the complete Textbook class including instance variables, constructor, getEdition(), canSubstituteFor(), and toString().",
        points: 7
      }
    ],
    rubric: [
      { points: 1, description: "Declares appropriate private instance variables" },
      { points: 1, description: "Constructor correctly initializes all instance variables" },
      { points: 1, description: "getEdition() returns the edition" },
      { points: 1, description: "canSubstituteFor() compares titles using .equals()" },
      { points: 1, description: "canSubstituteFor() compares authors using .equals()" },
      { points: 1, description: "canSubstituteFor() checks this.edition >= other.getEdition()" },
      { points: 1, description: "toString() returns correct format" }
    ],
    sampleSolution: `public class Textbook {
    private String title;
    private String author;
    private int edition;

    public Textbook(String title, String author, int edition) {
        this.title = title;
        this.author = author;
        this.edition = edition;
    }

    public int getEdition() {
        return edition;
    }

    public boolean canSubstituteFor(Textbook other) {
        return title.equals(other.title) &&
               author.equals(other.author) &&
               edition >= other.getEdition();
    }

    public String toString() {
        return title + " - " + author + " - Edition: " + edition;
    }
}`
  },

  {
    id: "frq_003",
    year: 2022,
    type: "Array/ArrayList",
    title: "ArrayResizer",
    units: [4],
    difficulty: "hard",
    source: "CB 2022 FRQ 3",
    prompt: `This question involves the ArrayResizer class, which provides methods for
working with 2D arrays.

public class ArrayResizer {

    /** Returns true if every value in arr is > 0, false otherwise.
     *  Precondition: arr is not null; arr.length > 0; arr[row].length > 0 for all rows.
     */
    public static boolean isNonZeroRow(int[] arr) {
        /* to be implemented in part (a) */
    }

    /** Returns a new array containing only the rows of original where
     *  isNonZeroRow returns true.
     *  Precondition: original has at least one valid row.
     */
    public static int[][] resize(int[][] original) {
        /* to be implemented in part (b) */
    }
}`,
    starterCode: `public class ArrayResizer {

    // Part (a): Returns true if every element in arr is > 0
    public static boolean isNonZeroRow(int[] arr) {
        // YOUR CODE HERE
    }

    // Part (b): Returns new 2D array with only rows where isNonZeroRow is true
    public static int[][] resize(int[][] original) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write isNonZeroRow(int[] arr) that returns true if every element in arr is greater than 0.",
        points: 3
      },
      {
        label: "b",
        instruction: "Write resize(int[][] original) that returns a new 2D array containing only the rows where isNonZeroRow returns true.",
        points: 4
      }
    ],
    rubric: [
      { points: 1, description: "(a) Accesses each element of the 1D array" },
      { points: 1, description: "(a) Correctly tests each element > 0" },
      { points: 1, description: "(a) Returns false if any element is not > 0; returns true otherwise" },
      { points: 1, description: "(b) Counts the number of valid rows using isNonZeroRow" },
      { points: 1, description: "(b) Creates new 2D array of the correct size" },
      { points: 1, description: "(b) Copies correct rows to new array" },
      { points: 1, description: "(b) Returns the new array" }
    ],
    sampleSolution: `public static boolean isNonZeroRow(int[] arr) {
    for (int val : arr) {
        if (val <= 0) return false;
    }
    return true;
}

public static int[][] resize(int[][] original) {
    int count = 0;
    for (int[] row : original) {
        if (isNonZeroRow(row)) count++;
    }
    int[][] result = new int[count][];
    int idx = 0;
    for (int[] row : original) {
        if (isNonZeroRow(row)) {
            result[idx] = row;
            idx++;
        }
    }
    return result;
}`
  },

  {
    id: "frq_004",
    year: 2022,
    type: "2D Array",
    title: "Position",
    units: [4],
    difficulty: "hard",
    source: "CB 2022 FRQ 4",
    prompt: `A Position represents a location in a 2D grid using a row and column.

public class Position {
    private int row;
    private int col;

    public Position(int r, int c) { row = r; col = c; }
    public int getRow() { return row; }
    public int getCol() { return col; }
}

Consider this method in another class:

/** Returns the position in board with the largest value.
 *  Precondition: board is a non-null, non-empty 2D int array.
 */
public static Position findMax(int[][] board) {
    /* to be implemented */
}

Also write a method:
/** Returns true if moving from pos one step in the given direction
 *  stays within the board bounds.
 *  direction: 0=up, 1=right, 2=down, 3=left
 */
public static boolean canMove(int[][] board, Position pos, int direction) {
    /* to be implemented */
}`,
    starterCode: `// Assume Position class is already defined with getRow() and getCol()

// Part (a): Find position of maximum value in board
public static Position findMax(int[][] board) {
    // YOUR CODE HERE
}

// Part (b): Return true if moving from pos in direction stays in bounds
// direction: 0=up, 1=right, 2=down, 3=left
public static boolean canMove(int[][] board, Position pos, int direction) {
    // YOUR CODE HERE
}`,
    parts: [
      {
        label: "a",
        instruction: "Write findMax(int[][] board) that returns a Position object representing the location of the largest value in the 2D array.",
        points: 4
      },
      {
        label: "b",
        instruction: "Write canMove(int[][] board, Position pos, int direction) that returns true if moving one step from pos in the given direction stays within bounds.",
        points: 3
      }
    ],
    rubric: [
      { points: 1, description: "(a) Traverses all elements of the 2D array" },
      { points: 1, description: "(a) Correctly tracks the maximum value" },
      { points: 1, description: "(a) Tracks the position of the maximum value" },
      { points: 1, description: "(a) Returns correct Position object" },
      { points: 1, description: "(b) Correctly handles up direction (row > 0)" },
      { points: 1, description: "(b) Correctly handles down direction (row < rows-1)" },
      { points: 1, description: "(b) Correctly handles left/right directions" }
    ],
    sampleSolution: `public static Position findMax(int[][] board) {
    int maxRow = 0, maxCol = 0;
    for (int r = 0; r < board.length; r++) {
        for (int c = 0; c < board[r].length; c++) {
            if (board[r][c] > board[maxRow][maxCol]) {
                maxRow = r;
                maxCol = c;
            }
        }
    }
    return new Position(maxRow, maxCol);
}

public static boolean canMove(int[][] board, Position pos, int direction) {
    int r = pos.getRow(), c = pos.getCol();
    if (direction == 0) return r > 0;
    if (direction == 1) return c < board[0].length - 1;
    if (direction == 2) return r < board.length - 1;
    if (direction == 3) return c > 0;
    return false;
}`
  },

  // ─── CB 2023 FRQs ──────────────────────────────────────────────────────────

  {
    id: "frq_005",
    year: 2023,
    type: "Methods & Control Structures",
    title: "AppointmentBook",
    units: [1, 2],
    difficulty: "medium",
    source: "CB 2023 FRQ 1",
    prompt: `The AppointmentBook class maintains a schedule. Each hour (1–12) has a
boolean indicating whether that hour is free (true) or busy (false).

public class AppointmentBook {
    private boolean[] slots; // slots[0] unused; slots[1]..slots[12] represent hours 1-12

    /** Returns true if the hour is free, false if busy.
     *  Precondition: 1 <= hour <= 12
     */
    public boolean isFree(int hour) { return slots[hour]; }

    /** Marks the hour as busy.
     *  Precondition: 1 <= hour <= 12
     */
    public void makeAppointment(int hour) { slots[hour] = false; }

    /** Returns the first available block of numHours consecutive free hours
     *  starting from startHour. Returns -1 if no such block exists.
     *  Precondition: 1 <= startHour <= 12; numHours >= 1
     */
    public int findFreeBlock(int startHour, int numHours) {
        /* to be implemented in part (a) */
    }

    /** Makes an appointment using findFreeBlock. Returns the starting hour
     *  of the booked block, or -1 if no block was available.
     *  Precondition: 1 <= startHour <= 12; numHours >= 1
     */
    public int makeReservation(int startHour, int numHours) {
        /* to be implemented in part (b) */
    }
}`,
    starterCode: `public class AppointmentBook {
    private boolean[] slots;
    // isFree() and makeAppointment() are already implemented

    // Part (a): Return start of first free block of numHours consecutive hours
    // starting from startHour, or -1 if none exists.
    public int findFreeBlock(int startHour, int numHours) {
        // YOUR CODE HERE
    }

    // Part (b): Use findFreeBlock to book the first available slot.
    // Returns start hour of booked block, or -1 if unavailable.
    public int makeReservation(int startHour, int numHours) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write findFreeBlock(int startHour, int numHours) that searches for the first block of numHours consecutive free hours starting from startHour.",
        points: 5
      },
      {
        label: "b",
        instruction: "Write makeReservation(int startHour, int numHours) that calls findFreeBlock, marks those hours busy if found, and returns the start hour or -1.",
        points: 2
      }
    ],
    rubric: [
      { points: 1, description: "(a) Iterates through hours starting at startHour" },
      { points: 1, description: "(a) Counts consecutive free hours correctly" },
      { points: 1, description: "(a) Resets count when a busy hour is found" },
      { points: 1, description: "(a) Correctly identifies block start when count reaches numHours" },
      { points: 1, description: "(a) Returns -1 when no block found" },
      { points: 1, description: "(b) Calls findFreeBlock with correct arguments" },
      { points: 1, description: "(b) Marks hours busy and returns correct start or -1" }
    ],
    sampleSolution: `public int findFreeBlock(int startHour, int numHours) {
    int count = 0;
    for (int h = startHour; h <= 12; h++) {
        if (isFree(h)) {
            count++;
            if (count == numHours) return h - numHours + 1;
        } else {
            count = 0;
        }
    }
    return -1;
}

public int makeReservation(int startHour, int numHours) {
    int start = findFreeBlock(startHour, numHours);
    if (start == -1) return -1;
    for (int h = start; h < start + numHours; h++) {
        makeAppointment(h);
    }
    return start;
}`
  },

  {
    id: "frq_006",
    year: 2023,
    type: "Class Design",
    title: "Sign",
    units: [3],
    difficulty: "medium",
    source: "CB 2023 FRQ 2",
    prompt: `A Sign displays text on a set number of lines. Each line can display at most
a fixed number of characters. Write the Sign class with the following:

- numberOfLines (int) and lineWidth (int) fields
- Constructor Sign(int numberOfLines, int lineWidth)
- getWidth() returns lineWidth
- getLines() returns numberOfLines
- getArea() returns total characters displayable = numberOfLines * lineWidth
- canDisplay(String message) returns true if the message fits on the sign
  (i.e., message.length() <= getArea())
- splitIntoLines(String message) returns a String array where each element
  is at most lineWidth characters of message, split sequentially.
  If the message is shorter than getArea(), remaining lines are empty strings.`,
    starterCode: `public class Sign {
    // Instance variables
    
    public Sign(int numberOfLines, int lineWidth) {
        // YOUR CODE HERE
    }
    
    public int getWidth() { /* YOUR CODE HERE */ return 0; }
    public int getLines() { /* YOUR CODE HERE */ return 0; }
    public int getArea() { /* YOUR CODE HERE */ return 0; }
    
    public boolean canDisplay(String message) {
        // YOUR CODE HERE
    }
    
    public String[] splitIntoLines(String message) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write the complete Sign class including all specified fields, constructor, and methods.",
        points: 7
      }
    ],
    rubric: [
      { points: 1, description: "Declares appropriate private instance variables" },
      { points: 1, description: "Constructor initializes fields correctly" },
      { points: 1, description: "getArea() returns numberOfLines * lineWidth" },
      { points: 1, description: "canDisplay() correctly checks message length vs area" },
      { points: 1, description: "splitIntoLines() creates array of correct size" },
      { points: 1, description: "splitIntoLines() correctly extracts substrings of lineWidth" },
      { points: 1, description: "splitIntoLines() handles message shorter than area (empty strings)" }
    ],
    sampleSolution: `public class Sign {
    private int numberOfLines;
    private int lineWidth;

    public Sign(int numberOfLines, int lineWidth) {
        this.numberOfLines = numberOfLines;
        this.lineWidth = lineWidth;
    }

    public int getWidth() { return lineWidth; }
    public int getLines() { return numberOfLines; }
    public int getArea() { return numberOfLines * lineWidth; }

    public boolean canDisplay(String message) {
        return message.length() <= getArea();
    }

    public String[] splitIntoLines(String message) {
        String[] result = new String[numberOfLines];
        for (int i = 0; i < numberOfLines; i++) {
            int start = i * lineWidth;
            if (start >= message.length()) {
                result[i] = "";
            } else {
                int end = Math.min(start + lineWidth, message.length());
                result[i] = message.substring(start, end);
            }
        }
        return result;
    }
}`
  },

  {
    id: "frq_007",
    year: 2023,
    type: "Array/ArrayList",
    title: "WeatherData",
    units: [4],
    difficulty: "hard",
    source: "CB 2023 FRQ 3",
    prompt: `The WeatherData class stores temperature readings and provides analysis methods.

public class WeatherData {
    private ArrayList<Double> temperatures;

    public WeatherData(ArrayList<Double> temps) {
        temperatures = temps;
    }

    /** Returns the average of all temperatures. */
    public double average() {
        /* to be implemented in part (a) */
    }

    /** Removes all temperatures from the list that are
     *  more than threshold degrees above the average.
     *  Precondition: temperatures is non-empty, threshold > 0
     */
    public void removeExtremes(double threshold) {
        /* to be implemented in part (b) */
    }
}`,
    starterCode: `import java.util.ArrayList;

public class WeatherData {
    private ArrayList<Double> temperatures;

    public WeatherData(ArrayList<Double> temps) {
        temperatures = temps;
    }

    // Part (a): Return average of all temperatures
    public double average() {
        // YOUR CODE HERE
    }

    // Part (b): Remove temperatures more than threshold above the average
    public void removeExtremes(double threshold) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write average() that returns the average (mean) of all temperature values in the list.",
        points: 3
      },
      {
        label: "b",
        instruction: "Write removeExtremes(double threshold) that removes all temperatures that are more than threshold degrees above the average.",
        points: 4
      }
    ],
    rubric: [
      { points: 1, description: "(a) Sums all temperatures correctly" },
      { points: 1, description: "(a) Divides by the correct count" },
      { points: 1, description: "(a) Returns correct average as double" },
      { points: 1, description: "(b) Calls average() to get the cutoff" },
      { points: 1, description: "(b) Iterates through the list correctly" },
      { points: 1, description: "(b) Correctly removes elements > average + threshold" },
      { points: 1, description: "(b) Handles index shifting when removing (backward iteration or index adjustment)" }
    ],
    sampleSolution: `public double average() {
    double sum = 0;
    for (double t : temperatures) sum += t;
    return sum / temperatures.size();
}

public void removeExtremes(double threshold) {
    double avg = average();
    for (int i = temperatures.size() - 1; i >= 0; i--) {
        if (temperatures.get(i) > avg + threshold) {
            temperatures.remove(i);
        }
    }
}`
  },

  {
    id: "frq_008",
    year: 2023,
    type: "2D Array",
    title: "Climb",
    units: [4],
    difficulty: "hard",
    source: "CB 2023 FRQ 4",
    prompt: `The following methods are in a class that is not shown. They involve a
2D int array called mountain that represents a grid of elevations.

/** Returns the column index of the highest value in the given row.
 *  If there is a tie, returns the smaller column index.
 *  Precondition: row is a valid row index.
 */
public static int peakColumn(int[][] mountain, int row) {
    /* to be implemented in part (a) */
}

/** Returns an array of column indices representing a path from
 *  row 0 to the last row, where at each row the column with the
 *  highest value (from peakColumn) is chosen.
 */
public static int[] climbPath(int[][] mountain) {
    /* to be implemented in part (b) */
}`,
    starterCode: `// Part (a): Return column index of highest value in given row
// (ties: return smaller index)
public static int peakColumn(int[][] mountain, int row) {
    // YOUR CODE HERE
}

// Part (b): Return array of peak column indices from row 0 to last row
public static int[] climbPath(int[][] mountain) {
    // YOUR CODE HERE
}`,
    parts: [
      {
        label: "a",
        instruction: "Write peakColumn(int[][] mountain, int row) that returns the column index of the highest value in that row (smallest index on tie).",
        points: 4
      },
      {
        label: "b",
        instruction: "Write climbPath(int[][] mountain) that returns an array of column indices, one per row, each determined by peakColumn.",
        points: 3
      }
    ],
    rubric: [
      { points: 1, description: "(a) Initializes with first column as candidate maximum" },
      { points: 1, description: "(a) Traverses each column in the row" },
      { points: 1, description: "(a) Updates max correctly (strictly greater than, to prefer smaller index on ties)" },
      { points: 1, description: "(a) Returns correct column index" },
      { points: 1, description: "(b) Creates result array of correct length (mountain.length)" },
      { points: 1, description: "(b) Calls peakColumn for each row" },
      { points: 1, description: "(b) Returns the array of column indices" }
    ],
    sampleSolution: `public static int peakColumn(int[][] mountain, int row) {
    int maxCol = 0;
    for (int c = 1; c < mountain[row].length; c++) {
        if (mountain[row][c] > mountain[row][maxCol]) {
            maxCol = c;
        }
    }
    return maxCol;
}

public static int[] climbPath(int[][] mountain) {
    int[] path = new int[mountain.length];
    for (int r = 0; r < mountain.length; r++) {
        path[r] = peakColumn(mountain, r);
    }
    return path;
}`
  },

  // ─── CB 2024 FRQs ──────────────────────────────────────────────────────────

  {
    id: "frq_009",
    year: 2024,
    type: "Methods & Control Structures",
    title: "Feeder",
    units: [1, 2],
    difficulty: "medium",
    source: "CB 2024 FRQ 1",
    prompt: `A Feeder object simulates a bird feeder that tracks the amount of birdseed.

public class Feeder {
    private int numBirds;   // number of birds currently at feeder
    private double seeds;   // amount of seeds in ounces

    public Feeder(int n, double s) {
        numBirds = n;
        seeds = s;
    }

    public int getNumBirds() { return numBirds; }
    public double getSeeds() { return seeds; }

    /** Simulates one day at the feeder.
     *  Each bird eats between minAmt and maxAmt ounces (random, inclusive).
     *  If seeds runs out, some birds may eat less.
     *  Precondition: minAmt > 0, maxAmt >= minAmt
     */
    public void simulateOneDay(double minAmt, double maxAmt) {
        /* to be implemented in part (a) */
    }

    /** Simulates numDays days. After each day, if seeds < 10.0, refills to 50.0.
     *  Returns total number of days where at least one bird visited (numBirds > 0).
     *  numBirds is randomly set to 0-9 at the start of each day.
     *  Precondition: numDays > 0
     */
    public int simulateManyDays(int numDays) {
        /* to be implemented in part (b) */
    }
}`,
    starterCode: `public class Feeder {
    private int numBirds;
    private double seeds;

    public Feeder(int n, double s) {
        numBirds = n;
        seeds = s;
    }

    public int getNumBirds() { return numBirds; }
    public double getSeeds() { return seeds; }

    // Part (a): Simulate one day — each bird eats random amount between minAmt and maxAmt
    public void simulateOneDay(double minAmt, double maxAmt) {
        // YOUR CODE HERE
        // Hint: random amount for one bird = minAmt + Math.random() * (maxAmt - minAmt)
    }

    // Part (b): Simulate numDays days; return count of days where numBirds > 0
    public int simulateManyDays(int numDays) {
        // YOUR CODE HERE
        // Each day: set numBirds = (int)(Math.random() * 10)
        //           call simulateOneDay(...)
        //           if seeds < 10.0, refill to 50.0
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write simulateOneDay(double minAmt, double maxAmt) so each bird eats a random amount between minAmt and maxAmt, but seeds never goes below 0.",
        points: 4
      },
      {
        label: "b",
        instruction: "Write simulateManyDays(int numDays) that simulates numDays days and returns the number of days at least one bird visited.",
        points: 3
      }
    ],
    rubric: [
      { points: 1, description: "(a) Loops over each bird (numBirds iterations)" },
      { points: 1, description: "(a) Generates random amount in [minAmt, maxAmt]" },
      { points: 1, description: "(a) Subtracts eaten amount from seeds" },
      { points: 1, description: "(a) Ensures seeds does not go below 0" },
      { points: 1, description: "(b) Loops numDays times" },
      { points: 1, description: "(b) Sets numBirds randomly, calls simulateOneDay, refills if needed" },
      { points: 1, description: "(b) Counts and returns days with numBirds > 0" }
    ],
    sampleSolution: `public void simulateOneDay(double minAmt, double maxAmt) {
    for (int i = 0; i < numBirds; i++) {
        double amount = minAmt + Math.random() * (maxAmt - minAmt);
        if (seeds >= amount) {
            seeds -= amount;
        } else {
            seeds = 0;
        }
    }
}

public int simulateManyDays(int numDays) {
    int daysWithBirds = 0;
    for (int day = 0; day < numDays; day++) {
        numBirds = (int)(Math.random() * 10);
        if (numBirds > 0) daysWithBirds++;
        simulateOneDay(0.5, 1.0);
        if (seeds < 10.0) seeds = 50.0;
    }
    return daysWithBirds;
}`
  },

  {
    id: "frq_010",
    year: 2024,
    type: "Class Design",
    title: "Scoreboard",
    units: [3],
    difficulty: "medium",
    source: "CB 2024 FRQ 2",
    prompt: `A Scoreboard tracks the scores of two teams, A and B, during a game.

Write the Scoreboard class that satisfies these requirements:
- Fields: scoreA (int), scoreB (int), teamA (String), teamB (String)
- Constructor: Scoreboard(String teamA, String teamB) — starts both scores at 0
- recordPlay(String team, int points) — adds points to the given team's score
  (does nothing if team name doesn't match either team)
- getScore() — returns a String: "TeamA 3 - TeamB 1" (using actual team names and scores)
- isLeading(String team) — returns true if the given team has a strictly higher score`,
    starterCode: `public class Scoreboard {
    // YOUR instance variables here

    public Scoreboard(String teamA, String teamB) {
        // YOUR CODE HERE
    }

    public void recordPlay(String team, int points) {
        // YOUR CODE HERE
    }

    public String getScore() {
        // YOUR CODE HERE
    }

    public boolean isLeading(String team) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write the complete Scoreboard class satisfying all specifications above.",
        points: 7
      }
    ],
    rubric: [
      { points: 1, description: "Declares appropriate private instance variables" },
      { points: 1, description: "Constructor initializes team names and scores to 0" },
      { points: 1, description: "recordPlay() correctly identifies which team to update" },
      { points: 1, description: "recordPlay() adds points to correct team" },
      { points: 1, description: "getScore() returns correct format with team names and scores" },
      { points: 1, description: "isLeading() compares scores using strict inequality" },
      { points: 1, description: "isLeading() returns false if tied or if team name doesn't match" }
    ],
    sampleSolution: `public class Scoreboard {
    private String teamA, teamB;
    private int scoreA, scoreB;

    public Scoreboard(String teamA, String teamB) {
        this.teamA = teamA;
        this.teamB = teamB;
        scoreA = 0;
        scoreB = 0;
    }

    public void recordPlay(String team, int points) {
        if (team.equals(teamA)) scoreA += points;
        else if (team.equals(teamB)) scoreB += points;
    }

    public String getScore() {
        return teamA + " " + scoreA + " - " + teamB + " " + scoreB;
    }

    public boolean isLeading(String team) {
        if (team.equals(teamA)) return scoreA > scoreB;
        if (team.equals(teamB)) return scoreB > scoreA;
        return false;
    }
}`
  },

  {
    id: "frq_011",
    year: 2024,
    type: "Array/ArrayList",
    title: "WordChecker",
    units: [2, 4],
    difficulty: "hard",
    source: "CB 2024 FRQ 3",
    prompt: `The WordChecker class checks properties of a list of words.

public class WordChecker {
    private ArrayList<String> wordList;

    public WordChecker(ArrayList<String> words) {
        wordList = words;
    }

    /** Returns the number of words in the list that start with letter (case-insensitive).
     *  Precondition: letter is a lowercase letter ('a'-'z')
     */
    public int countStartsWith(char letter) {
        /* to be implemented in part (a) */
    }

    /** Removes all words from wordList that have length < minLength.
     *  Precondition: minLength >= 1
     */
    public void removeShort(int minLength) {
        /* to be implemented in part (b) */
    }
}`,
    starterCode: `import java.util.ArrayList;

public class WordChecker {
    private ArrayList<String> wordList;

    public WordChecker(ArrayList<String> words) {
        wordList = words;
    }

    // Part (a): Count words starting with letter (case-insensitive)
    public int countStartsWith(char letter) {
        // YOUR CODE HERE
    }

    // Part (b): Remove all words with length < minLength
    public void removeShort(int minLength) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write countStartsWith(char letter) that counts how many words start with the given letter, case-insensitively.",
        points: 3
      },
      {
        label: "b",
        instruction: "Write removeShort(int minLength) that removes all words from wordList with length strictly less than minLength.",
        points: 4
      }
    ],
    rubric: [
      { points: 1, description: "(a) Iterates through wordList" },
      { points: 1, description: "(a) Correctly compares first character case-insensitively" },
      { points: 1, description: "(a) Returns correct count" },
      { points: 1, description: "(b) Iterates through list (correctly handling shifting)" },
      { points: 1, description: "(b) Checks word.length() < minLength" },
      { points: 1, description: "(b) Removes qualifying words without skipping elements" },
      { points: 1, description: "(b) Handles index correctly after removal" }
    ],
    sampleSolution: `public int countStartsWith(char letter) {
    int count = 0;
    for (String w : wordList) {
        if (Character.toLowerCase(w.charAt(0)) == letter) count++;
    }
    return count;
}

public void removeShort(int minLength) {
    for (int i = wordList.size() - 1; i >= 0; i--) {
        if (wordList.get(i).length() < minLength) {
            wordList.remove(i);
        }
    }
}`
  },

  {
    id: "frq_012",
    year: 2024,
    type: "2D Array",
    title: "LightBoard",
    units: [4],
    difficulty: "hard",
    source: "CB 2024 FRQ 4",
    prompt: `A LightBoard is a 2D grid of lights, each either on (true) or off (false).

public class LightBoard {
    private boolean[][] lights;

    /** Constructs a LightBoard with numRows rows and numCols columns.
     *  Each light is randomly on (30% chance) or off.
     */
    public LightBoard(int numRows, int numCols) {
        /* to be implemented in part (a) */
    }

    /** Evaluates the light at row r, col c according to this rule:
     *  If the light is on, return true if an even number of lights
     *  in its column (all rows) are on; otherwise return false.
     *  If the light is off, return true if an odd number of lights
     *  in its column are on; otherwise return false.
     */
    public boolean evaluateLight(int r, int c) {
        /* to be implemented in part (b) */
    }
}`,
    starterCode: `public class LightBoard {
    private boolean[][] lights;

    // Part (a): Initialize lights — each light on with 30% probability
    public LightBoard(int numRows, int numCols) {
        // YOUR CODE HERE
        // Hint: Math.random() < 0.3 gives 30% probability
    }

    // Part (b): Evaluate the light at (r, c) per the specified rules
    public boolean evaluateLight(int r, int c) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write the LightBoard constructor that initializes a 2D boolean array where each light is independently turned on with 30% probability.",
        points: 3
      },
      {
        label: "b",
        instruction: "Write evaluateLight(int r, int c) using the specified rules about on/off lights and even/odd column counts.",
        points: 4
      }
    ],
    rubric: [
      { points: 1, description: "(a) Creates 2D boolean array of correct dimensions" },
      { points: 1, description: "(a) Loops through all positions" },
      { points: 1, description: "(a) Assigns true with 30% probability using Math.random()" },
      { points: 1, description: "(b) Counts number of 'on' lights in column c" },
      { points: 1, description: "(b) Correctly checks if count is even or odd" },
      { points: 1, description: "(b) Applies correct rule based on whether lights[r][c] is on or off" },
      { points: 1, description: "(b) Returns correct boolean value" }
    ],
    sampleSolution: `public LightBoard(int numRows, int numCols) {
    lights = new boolean[numRows][numCols];
    for (int r = 0; r < numRows; r++) {
        for (int c = 0; c < numCols; c++) {
            lights[r][c] = Math.random() < 0.3;
        }
    }
}

public boolean evaluateLight(int r, int c) {
    int onCount = 0;
    for (int row = 0; row < lights.length; row++) {
        if (lights[row][c]) onCount++;
    }
    if (lights[r][c]) {
        return onCount % 2 == 0;
    } else {
        return onCount % 2 == 1;
    }
}`
  },

  // ─── Original FRQs ─────────────────────────────────────────────────────────

  {
    id: "frq_013",
    year: 2025,
    type: "Methods & Control Structures",
    title: "StringAnalyzer",
    units: [1, 2],
    difficulty: "medium",
    source: "original",
    prompt: `The StringAnalyzer class provides utility methods for analyzing strings.

public class StringAnalyzer {

    /** Returns the number of uppercase letters in s.
     *  Precondition: s is not null
     */
    public static int countUppercase(String s) {
        /* to be implemented in part (a) */
    }

    /** Returns true if s is a palindrome (reads same forwards and backwards),
     *  ignoring case. Precondition: s is not null and has at least 1 character.
     */
    public static boolean isPalindrome(String s) {
        /* to be implemented in part (b) */
    }
}`,
    starterCode: `public class StringAnalyzer {

    // Part (a): Count uppercase letters in s
    public static int countUppercase(String s) {
        // YOUR CODE HERE
        // Hint: Character.isUpperCase(char c) returns true if c is uppercase
    }

    // Part (b): Return true if s is a palindrome (case-insensitive)
    public static boolean isPalindrome(String s) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write countUppercase(String s) that returns the number of uppercase letters in the string s.",
        points: 3
      },
      {
        label: "b",
        instruction: "Write isPalindrome(String s) that returns true if s is a palindrome, ignoring case differences.",
        points: 4
      }
    ],
    rubric: [
      { points: 1, description: "(a) Iterates through each character of s" },
      { points: 1, description: "(a) Correctly identifies uppercase characters" },
      { points: 1, description: "(a) Returns correct count" },
      { points: 1, description: "(b) Compares characters from both ends" },
      { points: 1, description: "(b) Handles case-insensitive comparison" },
      { points: 1, description: "(b) Returns false when mismatch found" },
      { points: 1, description: "(b) Returns true when no mismatch found" }
    ],
    sampleSolution: `public static int countUppercase(String s) {
    int count = 0;
    for (int i = 0; i < s.length(); i++) {
        if (Character.isUpperCase(s.charAt(i))) count++;
    }
    return count;
}

public static boolean isPalindrome(String s) {
    String lower = s.toLowerCase();
    int left = 0, right = lower.length() - 1;
    while (left < right) {
        if (lower.charAt(left) != lower.charAt(right)) return false;
        left++;
        right--;
    }
    return true;
}`
  },

  {
    id: "frq_014",
    year: 2025,
    type: "Methods & Control Structures",
    title: "NumberUtils",
    units: [1, 2],
    difficulty: "hard",
    source: "original",
    prompt: `The NumberUtils class provides utility methods for working with integers.

public class NumberUtils {

    /** Returns true if n is a prime number (> 1, divisible only by 1 and itself).
     *  Precondition: n >= 0
     */
    public static boolean isPrime(int n) {
        /* to be implemented in part (a) */
    }

    /** Returns the sum of all prime numbers from 1 to max inclusive.
     *  Uses isPrime() to check each number.
     *  Precondition: max >= 1
     */
    public static int sumOfPrimes(int max) {
        /* to be implemented in part (b) */
    }
}`,
    starterCode: `public class NumberUtils {

    // Part (a): Return true if n is prime
    public static boolean isPrime(int n) {
        // YOUR CODE HERE
    }

    // Part (b): Return sum of all primes from 1 to max (inclusive), using isPrime()
    public static int sumOfPrimes(int max) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write isPrime(int n) that returns true if n is a prime number (divisible only by 1 and itself, and n > 1).",
        points: 4
      },
      {
        label: "b",
        instruction: "Write sumOfPrimes(int max) that uses isPrime() to compute and return the sum of all prime numbers from 1 to max inclusive.",
        points: 3
      }
    ],
    rubric: [
      { points: 1, description: "(a) Returns false for n <= 1" },
      { points: 1, description: "(a) Checks divisibility from 2 up to sqrt(n) or n-1" },
      { points: 1, description: "(a) Returns false if any divisor found" },
      { points: 1, description: "(a) Returns true if no divisors found" },
      { points: 1, description: "(b) Iterates from 1 (or 2) to max" },
      { points: 1, description: "(b) Calls isPrime() for each number" },
      { points: 1, description: "(b) Sums and returns primes correctly" }
    ],
    sampleSolution: `public static boolean isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}

public static int sumOfPrimes(int max) {
    int sum = 0;
    for (int i = 2; i <= max; i++) {
        if (isPrime(i)) sum += i;
    }
    return sum;
}`
  },

  {
    id: "frq_015",
    year: 2025,
    type: "Class Design",
    title: "Library",
    units: [3, 4],
    difficulty: "hard",
    source: "original",
    prompt: `Write a Library class that manages a collection of books. A library has:
- A name (String)
- An ArrayList<String> of book titles (initially empty)

The Library class must provide:
- Constructor Library(String name)
- addBook(String title) — adds title to the collection
- removeBook(String title) — removes first occurrence of title; does nothing if not found
- hasBook(String title) — returns true if the library has the book
- getCount() — returns the number of books
- toString() — returns "Library: name (N books)" where N is the count`,
    starterCode: `import java.util.ArrayList;

public class Library {
    // YOUR instance variables

    public Library(String name) {
        // YOUR CODE HERE
    }

    public void addBook(String title) {
        // YOUR CODE HERE
    }

    public void removeBook(String title) {
        // YOUR CODE HERE
    }

    public boolean hasBook(String title) {
        // YOUR CODE HERE
    }

    public int getCount() {
        // YOUR CODE HERE
    }

    public String toString() {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write the complete Library class satisfying all specifications.",
        points: 7
      }
    ],
    rubric: [
      { points: 1, description: "Declares appropriate private instance variables (name, ArrayList)" },
      { points: 1, description: "Constructor initializes name and empty ArrayList" },
      { points: 1, description: "addBook() adds title to the ArrayList" },
      { points: 1, description: "removeBook() removes first occurrence (using remove(Object))" },
      { points: 1, description: "hasBook() returns correct boolean using contains()" },
      { points: 1, description: "getCount() returns list size" },
      { points: 1, description: "toString() returns correct format" }
    ],
    sampleSolution: `import java.util.ArrayList;

public class Library {
    private String name;
    private ArrayList<String> books;

    public Library(String name) {
        this.name = name;
        books = new ArrayList<>();
    }

    public void addBook(String title) {
        books.add(title);
    }

    public void removeBook(String title) {
        books.remove(title);
    }

    public boolean hasBook(String title) {
        return books.contains(title);
    }

    public int getCount() {
        return books.size();
    }

    public String toString() {
        return "Library: " + name + " (" + books.size() + " books)";
    }
}`
  },

  {
    id: "frq_016",
    year: 2025,
    type: "Class Design",
    title: "StudentRecord",
    units: [3, 4],
    difficulty: "medium",
    source: "original",
    prompt: `Write a StudentRecord class that stores a student's name and test scores.

Requirements:
- Fields: name (String), scores (int array of fixed size 5)
- A counter tracking how many scores have been added (0 to 5)
- Constructor StudentRecord(String name) — initializes name and empty scores
- addScore(int score) — adds score to next available slot (does nothing if full)
- getAverage() — returns average of scores added so far (0.0 if none added)
- getBestScore() — returns highest score added (0 if none)
- toString() — returns "name: avg=X.X, best=Y" (1 decimal place for avg)`,
    starterCode: `public class StudentRecord {
    private String name;
    private int[] scores;
    private int count;  // number of scores added so far

    public StudentRecord(String name) {
        // YOUR CODE HERE
    }

    public void addScore(int score) {
        // YOUR CODE HERE
    }

    public double getAverage() {
        // YOUR CODE HERE
    }

    public int getBestScore() {
        // YOUR CODE HERE
    }

    public String toString() {
        // YOUR CODE HERE
        // Format: "name: avg=X.X, best=Y"
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write the complete StudentRecord class satisfying all specifications.",
        points: 7
      }
    ],
    rubric: [
      { points: 1, description: "Declares appropriate private instance variables" },
      { points: 1, description: "Constructor initializes all fields correctly" },
      { points: 1, description: "addScore() adds to next slot and does nothing when full" },
      { points: 1, description: "getAverage() returns 0.0 when count==0; correct average otherwise" },
      { points: 1, description: "getBestScore() correctly finds maximum (or 0 if none)" },
      { points: 1, description: "toString() formats average to 1 decimal place" },
      { points: 1, description: "toString() returns correct overall format" }
    ],
    sampleSolution: `public class StudentRecord {
    private String name;
    private int[] scores;
    private int count;

    public StudentRecord(String name) {
        this.name = name;
        scores = new int[5];
        count = 0;
    }

    public void addScore(int score) {
        if (count < 5) scores[count++] = score;
    }

    public double getAverage() {
        if (count == 0) return 0.0;
        int sum = 0;
        for (int i = 0; i < count; i++) sum += scores[i];
        return (double) sum / count;
    }

    public int getBestScore() {
        if (count == 0) return 0;
        int best = scores[0];
        for (int i = 1; i < count; i++) {
            if (scores[i] > best) best = scores[i];
        }
        return best;
    }

    public String toString() {
        return name + ": avg=" + String.format("%.1f", getAverage()) + ", best=" + getBestScore();
    }
}`
  },

  {
    id: "frq_017",
    year: 2025,
    type: "Array/ArrayList",
    title: "ListFilter",
    units: [4],
    difficulty: "medium",
    source: "original",
    prompt: `The ListFilter class provides methods for processing ArrayList data.

public class ListFilter {

    /** Returns a new ArrayList containing only the elements from data
     *  that are divisible by divisor.
     *  Precondition: divisor != 0
     */
    public static ArrayList<Integer> filterDivisible(ArrayList<Integer> data, int divisor) {
        /* to be implemented in part (a) */
    }

    /** Replaces every negative value in data with its absolute value.
     *  Modifies the original list.
     */
    public static void absoluteValue(ArrayList<Integer> data) {
        /* to be implemented in part (b) */
    }
}`,
    starterCode: `import java.util.ArrayList;

public class ListFilter {

    // Part (a): Return new list of elements divisible by divisor
    public static ArrayList<Integer> filterDivisible(ArrayList<Integer> data, int divisor) {
        // YOUR CODE HERE
    }

    // Part (b): Replace each negative value in data with its absolute value
    public static void absoluteValue(ArrayList<Integer> data) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write filterDivisible that returns a new ArrayList of elements from data that are evenly divisible by divisor.",
        points: 3
      },
      {
        label: "b",
        instruction: "Write absoluteValue that modifies data in place, replacing each negative value with its absolute value.",
        points: 4
      }
    ],
    rubric: [
      { points: 1, description: "(a) Creates a new ArrayList to store results" },
      { points: 1, description: "(a) Correctly checks divisibility (val % divisor == 0)" },
      { points: 1, description: "(a) Returns new list with correct elements" },
      { points: 1, description: "(b) Iterates through all elements of data" },
      { points: 1, description: "(b) Correctly identifies negative values" },
      { points: 1, description: "(b) Replaces negative value using set()" },
      { points: 1, description: "(b) Uses correct index and set() syntax" }
    ],
    sampleSolution: `public static ArrayList<Integer> filterDivisible(ArrayList<Integer> data, int divisor) {
    ArrayList<Integer> result = new ArrayList<>();
    for (int val : data) {
        if (val % divisor == 0) result.add(val);
    }
    return result;
}

public static void absoluteValue(ArrayList<Integer> data) {
    for (int i = 0; i < data.size(); i++) {
        if (data.get(i) < 0) {
            data.set(i, -data.get(i));
        }
    }
}`
  },

  {
    id: "frq_018",
    year: 2025,
    type: "Array/ArrayList",
    title: "ArrayStatistics",
    units: [4],
    difficulty: "hard",
    source: "original",
    prompt: `The ArrayStatistics class provides statistical methods for int arrays.

public class ArrayStatistics {

    /** Returns a new int array containing the running totals of arr.
     *  runningTotal[i] = arr[0] + arr[1] + ... + arr[i]
     *  Precondition: arr.length >= 1
     */
    public static int[] runningTotal(int[] arr) {
        /* to be implemented in part (a) */
    }

    /** Returns true if arr is sorted in non-decreasing order.
     *  An array of length 0 or 1 is considered sorted.
     */
    public static boolean isSorted(int[] arr) {
        /* to be implemented in part (b) */
    }
}`,
    starterCode: `public class ArrayStatistics {

    // Part (a): Return array of running totals
    public static int[] runningTotal(int[] arr) {
        // YOUR CODE HERE
        // Example: {1, 2, 3, 4} -> {1, 3, 6, 10}
    }

    // Part (b): Return true if arr is sorted in non-decreasing order
    public static boolean isSorted(int[] arr) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write runningTotal(int[] arr) that returns a new array where each element is the cumulative sum of arr up to that index.",
        points: 4
      },
      {
        label: "b",
        instruction: "Write isSorted(int[] arr) that returns true if the array is in non-decreasing order (each element <= the next).",
        points: 3
      }
    ],
    rubric: [
      { points: 1, description: "(a) Creates new array of same length" },
      { points: 1, description: "(a) Sets result[0] = arr[0]" },
      { points: 1, description: "(a) Correctly computes each subsequent element as previous total + arr[i]" },
      { points: 1, description: "(a) Returns correct array" },
      { points: 1, description: "(b) Handles arrays of length 0 or 1" },
      { points: 1, description: "(b) Compares adjacent elements correctly" },
      { points: 1, description: "(b) Returns correct boolean result" }
    ],
    sampleSolution: `public static int[] runningTotal(int[] arr) {
    int[] result = new int[arr.length];
    result[0] = arr[0];
    for (int i = 1; i < arr.length; i++) {
        result[i] = result[i-1] + arr[i];
    }
    return result;
}

public static boolean isSorted(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i+1]) return false;
    }
    return true;
}`
  },

  {
    id: "frq_019",
    year: 2025,
    type: "2D Array",
    title: "MatrixOps",
    units: [4],
    difficulty: "hard",
    source: "original",
    prompt: `The MatrixOps class performs operations on 2D integer arrays (matrices).

public class MatrixOps {

    /** Returns a new 2D array that is the transpose of matrix.
     *  The transpose swaps rows and columns: result[c][r] = matrix[r][c].
     *  Precondition: matrix is not null and has at least 1 row and 1 column.
     */
    public static int[][] transpose(int[][] matrix) {
        /* to be implemented in part (a) */
    }

    /** Returns true if matrix is symmetric (equals its own transpose):
     *  matrix[r][c] == matrix[c][r] for all valid r, c.
     *  Precondition: matrix is square (same number of rows and columns).
     */
    public static boolean isSymmetric(int[][] matrix) {
        /* to be implemented in part (b) */
    }
}`,
    starterCode: `public class MatrixOps {

    // Part (a): Return the transpose of matrix
    public static int[][] transpose(int[][] matrix) {
        // YOUR CODE HERE
        // result dimensions: [matrix[0].length][matrix.length]
    }

    // Part (b): Return true if matrix equals its own transpose (square matrix)
    public static boolean isSymmetric(int[][] matrix) {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write transpose(int[][] matrix) that returns a new 2D array where rows and columns are swapped.",
        points: 4
      },
      {
        label: "b",
        instruction: "Write isSymmetric(int[][] matrix) that returns true if matrix[r][c] == matrix[c][r] for all valid indices in this square matrix.",
        points: 3
      }
    ],
    rubric: [
      { points: 1, description: "(a) Creates result array with swapped dimensions" },
      { points: 1, description: "(a) Traverses all elements of matrix" },
      { points: 1, description: "(a) Assigns result[c][r] = matrix[r][c]" },
      { points: 1, description: "(a) Returns correct transposed matrix" },
      { points: 1, description: "(b) Traverses relevant portion of matrix (upper or lower triangle)" },
      { points: 1, description: "(b) Correctly compares matrix[r][c] with matrix[c][r]" },
      { points: 1, description: "(b) Returns false if any mismatch; true if all match" }
    ],
    sampleSolution: `public static int[][] transpose(int[][] matrix) {
    int rows = matrix.length;
    int cols = matrix[0].length;
    int[][] result = new int[cols][rows];
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            result[c][r] = matrix[r][c];
        }
    }
    return result;
}

public static boolean isSymmetric(int[][] matrix) {
    for (int r = 0; r < matrix.length; r++) {
        for (int c = r + 1; c < matrix[r].length; c++) {
            if (matrix[r][c] != matrix[c][r]) return false;
        }
    }
    return true;
}`
  },

  {
    id: "frq_020",
    year: 2025,
    type: "2D Array",
    title: "GridGame",
    units: [4],
    difficulty: "hard",
    source: "original",
    prompt: `GridGame uses a 2D grid of integers. You will write methods to analyze the grid.

public class GridGame {
    private int[][] grid;

    public GridGame(int[][] g) { grid = g; }

    /** Returns the sum of all values in the specified column.
     *  Precondition: col is a valid column index.
     */
    public int columnSum(int col) {
        /* to be implemented in part (a) */
    }

    /** Returns the column index with the largest column sum.
     *  If there is a tie, return the smaller column index.
     *  Precondition: grid has at least 1 row and 1 column.
     */
    public int richestColumn() {
        /* to be implemented in part (b) */
    }
}`,
    starterCode: `public class GridGame {
    private int[][] grid;

    public GridGame(int[][] g) { grid = g; }

    // Part (a): Return sum of all values in the given column
    public int columnSum(int col) {
        // YOUR CODE HERE
    }

    // Part (b): Return index of column with largest sum (smaller index on tie)
    public int richestColumn() {
        // YOUR CODE HERE
    }
}`,
    parts: [
      {
        label: "a",
        instruction: "Write columnSum(int col) that returns the sum of all elements in the given column of grid.",
        points: 3
      },
      {
        label: "b",
        instruction: "Write richestColumn() that returns the index of the column with the largest sum, using columnSum(). On ties, return the smaller index.",
        points: 4
      }
    ],
    rubric: [
      { points: 1, description: "(a) Iterates over all rows for the given column" },
      { points: 1, description: "(a) Correctly accumulates sum" },
      { points: 1, description: "(a) Returns correct column sum" },
      { points: 1, description: "(b) Calls columnSum() for each column" },
      { points: 1, description: "(b) Tracks column with maximum sum" },
      { points: 1, description: "(b) Prefers smaller index on ties (uses strictly greater than)" },
      { points: 1, description: "(b) Returns correct column index" }
    ],
    sampleSolution: `public int columnSum(int col) {
    int sum = 0;
    for (int[] row : grid) {
        sum += row[col];
    }
    return sum;
}

public int richestColumn() {
    int bestCol = 0;
    int bestSum = columnSum(0);
    for (int c = 1; c < grid[0].length; c++) {
        int s = columnSum(c);
        if (s > bestSum) {
            bestSum = s;
            bestCol = c;
        }
    }
    return bestCol;
}`
  }
];
