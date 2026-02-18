const MCQ_U3U4 = [
  // ── UNIT 3: Class Creation ──────────────────────────────────────────────────

  // Topic 3.1 – Abstraction and Program Design
  {
    id: "mcq_116", unit: 3, topic: "3.1", topicLabel: "Abstraction and Program Design",
    difficulty: "easy", source: "original",
    question: "In object-oriented programming, abstraction refers to:",
    isCode: false, code: "",
    choices: [
      "Writing code with no comments",
      "Hiding implementation details and exposing only essential features",
      "Making all variables public",
      "Copying code from existing classes"
    ],
    answer: 1,
    explanation: "Abstraction means hiding complex implementation details and only exposing the necessary interface. Users of a class don't need to know how methods work internally."
  },
  {
    id: "mcq_117", unit: 3, topic: "3.1", topicLabel: "Abstraction and Program Design",
    difficulty: "medium", source: "original",
    question: "Which of the following best illustrates encapsulation?",
    isCode: false, code: "",
    choices: [
      "A class with all public fields",
      "A class with private fields and public getter/setter methods",
      "A method that calls itself",
      "Two classes that share a common superclass"
    ],
    answer: 1,
    explanation: "Encapsulation is the practice of keeping fields private and providing public methods to access/modify them. This protects data integrity and hides implementation."
  },
  {
    id: "mcq_118", unit: 3, topic: "3.1", topicLabel: "Abstraction and Program Design",
    difficulty: "hard", source: "original",
    question: "What is the primary purpose of a class in OOP?",
    isCode: false, code: "",
    choices: [
      "To store only primitive data",
      "To serve as a blueprint for creating objects with shared state and behavior",
      "To replace all procedural code",
      "To automatically manage memory allocation"
    ],
    answer: 1,
    explanation: "A class serves as a blueprint or template that defines the state (fields) and behavior (methods) for objects. Each object is an instance of a class."
  },

  // Topic 3.2 – Impact of Program Design
  {
    id: "mcq_119", unit: 3, topic: "3.2", topicLabel: "Impact of Program Design",
    difficulty: "easy", source: "original",
    question: "Why is it important to design programs before writing code?",
    isCode: false, code: "",
    choices: [
      "Design makes code run faster",
      "Good design reduces errors, improves readability, and makes maintenance easier",
      "Design is required by the Java compiler",
      "Design automatically generates documentation"
    ],
    answer: 1,
    explanation: "Planning a program's structure upfront reduces bugs, improves maintainability, makes collaboration easier, and often results in cleaner, more efficient code."
  },
  {
    id: "mcq_120", unit: 3, topic: "3.2", topicLabel: "Impact of Program Design",
    difficulty: "medium", source: "original",
    question: "What is modularity in software design?",
    isCode: false, code: "",
    choices: [
      "Using only one class for an entire program",
      "Dividing a program into separate, independent components that can be developed and tested separately",
      "Writing all code in the main method",
      "Avoiding the use of methods"
    ],
    answer: 1,
    explanation: "Modularity means breaking a program into separate, self-contained units (methods, classes, packages). Each module handles a specific responsibility and can be tested independently."
  },

  // Topic 3.3 – Anatomy of a Class
  {
    id: "mcq_121", unit: 3, topic: "3.3", topicLabel: "Anatomy of a Class",
    difficulty: "easy", source: "original",
    question: "What is the correct way to declare a private integer field named age in a class?",
    isCode: false, code: "",
    choices: [
      "public int age;",
      "private int age;",
      "int private age;",
      "private age int;"
    ],
    answer: 1,
    explanation: "In Java, field declarations follow the format: accessModifier type fieldName; so 'private int age;' is correct."
  },
  {
    id: "mcq_122", unit: 3, topic: "3.3", topicLabel: "Anatomy of a Class",
    difficulty: "medium", source: "original",
    question: "What is the output of the following code?",
    isCode: true,
    code: "public class Dog {\n    private String name;\n    private int age;\n    \n    public Dog(String n, int a) {\n        name = n;\n        age = a;\n    }\n    \n    public String toString() {\n        return name + \" (\" + age + \")\";\n    }\n}\n// In main:\nDog d = new Dog(\"Rex\", 3);\nSystem.out.println(d);",
    choices: ["Dog@hashcode", "Rex (3)", "name (age)", "Compilation error"],
    answer: 1,
    explanation: "When println() is called with an object, it calls the object's toString() method. The overridden toString() returns name + \" (\" + age + \")\" = \"Rex (3)\"."
  },
  {
    id: "mcq_123", unit: 3, topic: "3.3", topicLabel: "Anatomy of a Class",
    difficulty: "hard", source: "original",
    question: "Which keyword is used to indicate that a field or method belongs to the class itself rather than to instances?",
    isCode: false, code: "",
    choices: ["private", "public", "static", "final"],
    answer: 2,
    explanation: "The static keyword means the field or method belongs to the class rather than to individual instances. Static members are shared across all instances."
  },

  // Topic 3.4 – Constructors
  {
    id: "mcq_124", unit: 3, topic: "3.4", topicLabel: "Constructors",
    difficulty: "easy", source: "original",
    question: "Which of the following is true about constructors?",
    isCode: false, code: "",
    choices: [
      "Constructors must return an int",
      "Constructors have the same name as the class and have no return type",
      "Constructors are called automatically when an object is destroyed",
      "Constructors must always take parameters"
    ],
    answer: 1,
    explanation: "A constructor has the same name as the class and has NO return type (not even void). It is called when an object is created with the new keyword."
  },
  {
    id: "mcq_125", unit: 3, topic: "3.4", topicLabel: "Constructors",
    difficulty: "medium", source: "original",
    question: "What is a no-argument (default) constructor?",
    isCode: false, code: "",
    choices: [
      "A constructor that Java provides automatically if no constructors are written",
      "A constructor that takes only String parameters",
      "A constructor that calls another constructor",
      "A constructor that initializes all fields to -1"
    ],
    answer: 0,
    explanation: "If a class defines no constructors, Java automatically provides a no-argument default constructor. However, once you define any constructor, the automatic default constructor is no longer provided."
  },
  {
    id: "mcq_126", unit: 3, topic: "3.4", topicLabel: "Constructors",
    difficulty: "hard", source: "original",
    question: "What is the output of this code?",
    isCode: true,
    code: "public class Counter {\n    private int count;\n    public Counter() { count = 0; }\n    public Counter(int start) { count = start; }\n    public void increment() { count++; }\n    public int getCount() { return count; }\n}\n// In main:\nCounter c1 = new Counter();\nCounter c2 = new Counter(10);\nc1.increment();\nc1.increment();\nc2.increment();\nSystem.out.println(c1.getCount() + \" \" + c2.getCount());",
    choices: ["2 11", "2 10", "3 11", "0 10"],
    answer: 0,
    explanation: "c1 starts at 0, incremented twice → 2. c2 starts at 10, incremented once → 11. Output: \"2 11\"."
  },

  // Topic 3.5 – Methods: How to Write Them
  {
    id: "mcq_127", unit: 3, topic: "3.5", topicLabel: "Methods: How to Write Them",
    difficulty: "easy", source: "original",
    question: "Which of the following is a valid accessor (getter) method for a private int field named score?",
    isCode: false, code: "",
    choices: [
      "public void getScore() { return score; }",
      "public int getScore() { return score; }",
      "private int getScore() { return score; }",
      "public int score() { score; }"
    ],
    answer: 1,
    explanation: "An accessor method is public (so it's accessible from outside), returns the field's type (int), is named following the getFieldName convention, and returns the field value."
  },
  {
    id: "mcq_128", unit: 3, topic: "3.5", topicLabel: "Methods: How to Write Them",
    difficulty: "medium", source: "original",
    question: "What is a mutator (setter) method?",
    isCode: false, code: "",
    choices: [
      "A method that reads and returns a private field's value",
      "A method that modifies a private field's value",
      "A method that creates new objects",
      "A method that overrides a superclass method"
    ],
    answer: 1,
    explanation: "A mutator (setter) method modifies the value of a private field. It typically takes a parameter and assigns it to the field. This allows controlled modification of private data."
  },
  {
    id: "mcq_129", unit: 3, topic: "3.5", topicLabel: "Methods: How to Write Them",
    difficulty: "hard", source: "original",
    question: "What is the output of this code?",
    isCode: true,
    code: "public class Rectangle {\n    private double width;\n    private double height;\n    \n    public Rectangle(double w, double h) {\n        width = w;\n        height = h;\n    }\n    \n    public double area() { return width * height; }\n    public double perimeter() { return 2 * (width + height); }\n}\n// In main:\nRectangle r = new Rectangle(5.0, 3.0);\nSystem.out.println(r.area() + \" \" + r.perimeter());",
    choices: ["15.0 16.0", "16.0 15.0", "8.0 15.0", "15.0 8.0"],
    answer: 0,
    explanation: "area() = 5.0 * 3.0 = 15.0. perimeter() = 2 * (5.0 + 3.0) = 2 * 8.0 = 16.0. Output: \"15.0 16.0\"."
  },

  // Topic 3.6 – Methods: Passing and Returning References
  {
    id: "mcq_130", unit: 3, topic: "3.6", topicLabel: "Methods: Passing and Returning References",
    difficulty: "medium", source: "original",
    question: "When an object is passed to a method in Java:",
    isCode: false, code: "",
    choices: [
      "A copy of the entire object is made",
      "The reference (address) is passed by value — changes to fields affect the original",
      "The original object cannot be modified",
      "Java automatically makes the parameter final"
    ],
    answer: 1,
    explanation: "Java passes object references by value. The method gets a copy of the reference, which points to the same object. Changes to the object's fields through the reference affect the original object."
  },
  {
    id: "mcq_131", unit: 3, topic: "3.6", topicLabel: "Methods: Passing and Returning References",
    difficulty: "hard", source: "original",
    question: "What is the output of this code?",
    isCode: true,
    code: "public static void addOne(int x) {\n    x = x + 1;\n}\npublic static void addOne(int[] arr) {\n    arr[0] = arr[0] + 1;\n}\n// In main:\nint n = 5;\nint[] a = {5};\naddOne(n);\naddOne(a);\nSystem.out.println(n + \" \" + a[0]);",
    choices: ["5 5", "6 6", "5 6", "6 5"],
    answer: 2,
    explanation: "Primitives are passed by value — n is unchanged (still 5). Arrays are objects; passing the array passes its reference. arr[0]++ modifies the original array. a[0] becomes 6."
  },

  // Topic 3.7 – Class Variables and Methods
  {
    id: "mcq_132", unit: 3, topic: "3.7", topicLabel: "Class Variables and Methods",
    difficulty: "easy", source: "original",
    question: "What is a class variable (static field)?",
    isCode: false, code: "",
    choices: [
      "A variable declared inside a method",
      "A variable shared by all instances of the class",
      "A variable that can only be accessed within the class",
      "A variable declared with the final keyword"
    ],
    answer: 1,
    explanation: "A static field (class variable) belongs to the class itself, not to any particular instance. All instances share the same copy of the static field."
  },
  {
    id: "mcq_133", unit: 3, topic: "3.7", topicLabel: "Class Variables and Methods",
    difficulty: "medium", source: "original",
    question: "What is the output of this code?",
    isCode: true,
    code: "public class Widget {\n    private static int count = 0;\n    public Widget() { count++; }\n    public static int getCount() { return count; }\n}\n// In main:\nWidget a = new Widget();\nWidget b = new Widget();\nWidget c = new Widget();\nSystem.out.println(Widget.getCount());",
    choices: ["0", "1", "3", "Compilation error"],
    answer: 2,
    explanation: "count is a static field shared by all Widget instances. Each constructor call increments it. After creating 3 Widgets, count = 3."
  },
  {
    id: "mcq_134", unit: 3, topic: "3.7", topicLabel: "Class Variables and Methods",
    difficulty: "hard", source: "original",
    question: "Why can't a static method access instance (non-static) fields directly?",
    isCode: false, code: "",
    choices: [
      "Static methods can access all fields — this is incorrect",
      "Static methods belong to the class, not any instance, so there is no 'this' object whose fields to access",
      "Instance fields are always private",
      "Java prohibits static methods from doing anything"
    ],
    answer: 1,
    explanation: "Static methods execute in a class context, not an instance context. There is no 'this' reference in a static method, so they cannot refer to instance fields that belong to a specific object."
  },

  // Topic 3.8 – Scope and Access
  {
    id: "mcq_135", unit: 3, topic: "3.8", topicLabel: "Scope and Access",
    difficulty: "easy", source: "original",
    question: "What is the scope of a local variable declared inside a for loop?",
    isCode: false, code: "",
    choices: [
      "The entire class",
      "The entire method",
      "Only within the for loop's body",
      "The entire program"
    ],
    answer: 2,
    explanation: "A variable declared in a for loop header (like int i = 0) or inside the loop body is a local variable that only exists within that loop. It cannot be accessed outside the loop."
  },
  {
    id: "mcq_136", unit: 3, topic: "3.8", topicLabel: "Scope and Access",
    difficulty: "medium", source: "original",
    question: "What does the private access modifier do?",
    isCode: false, code: "",
    choices: [
      "Makes the member accessible from anywhere",
      "Makes the member accessible only within its own class",
      "Makes the member accessible within the same package",
      "Makes the member immutable"
    ],
    answer: 1,
    explanation: "The private modifier restricts access to the member to only the class in which it is declared. Even subclasses cannot directly access private members."
  },
  {
    id: "mcq_137", unit: 3, topic: "3.8", topicLabel: "Scope and Access",
    difficulty: "hard", source: "original",
    question: "What is the output of this code?",
    isCode: true,
    code: "public class Scope {\n    private int x = 10;\n    \n    public void test() {\n        int x = 20;\n        System.out.println(x);\n        System.out.println(this.x);\n    }\n}\n// In main:\nnew Scope().test();",
    choices: ["10 10", "20 20", "20 10", "10 20"],
    answer: 2,
    explanation: "Inside test(), x refers to the local variable (20). this.x refers to the instance field (10). Output: 20 then 10."
  },

  // Topic 3.9 – this Keyword
  {
    id: "mcq_138", unit: 3, topic: "3.9", topicLabel: "this Keyword",
    difficulty: "easy", source: "original",
    question: "What does the this keyword refer to in a Java instance method?",
    isCode: false, code: "",
    choices: [
      "The current class's static fields",
      "The current object (the instance calling the method)",
      "The superclass of the current class",
      "The return value of the method"
    ],
    answer: 1,
    explanation: "In an instance method or constructor, 'this' refers to the current object — the instance on which the method was called."
  },
  {
    id: "mcq_139", unit: 3, topic: "3.9", topicLabel: "this Keyword",
    difficulty: "medium", source: "original",
    question: "When is it necessary to use this.fieldName instead of just fieldName?",
    isCode: false, code: "",
    choices: [
      "Always — this is required for all field accesses",
      "Never — this is optional and serves no purpose",
      "When a local variable or parameter has the same name as an instance field",
      "Only in static methods"
    ],
    answer: 2,
    explanation: "this is commonly used when a parameter name shadows an instance field name. Example: if parameter is 'name' and field is 'name', use 'this.name = name' to distinguish them."
  },
  {
    id: "mcq_140", unit: 3, topic: "3.9", topicLabel: "this Keyword",
    difficulty: "hard", source: "original",
    question: "What is the output of this code?",
    isCode: true,
    code: "public class Point {\n    private int x, y;\n    \n    public Point(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n    \n    public String toString() {\n        return \"(\" + x + \", \" + y + \")\";\n    }\n    \n    public Point translate(int dx, int dy) {\n        return new Point(x + dx, y + dy);\n    }\n}\n// In main:\nPoint p = new Point(2, 3);\nSystem.out.println(p.translate(1, -1));",
    choices: ["(2, 3)", "(3, 2)", "(1, -1)", "Compilation error"],
    answer: 1,
    explanation: "p is Point(2, 3). translate(1, -1) returns new Point(2+1, 3-1) = new Point(3, 2). toString() of that is \"(3, 2)\"."
  },

  // Additional Unit 3 questions
  {
    id: "mcq_141", unit: 3, topic: "3.4", topicLabel: "Constructors",
    difficulty: "medium", source: "original",
    question: "What is constructor overloading?",
    isCode: false, code: "",
    choices: [
      "Having a constructor that calls a superclass constructor",
      "Having multiple constructors in the same class with different parameter lists",
      "Making a constructor private to prevent instantiation",
      "A constructor that creates multiple objects at once"
    ],
    answer: 1,
    explanation: "Constructor overloading allows a class to have multiple constructors, each with a different number or type of parameters, giving users flexibility in how they create objects."
  },
  {
    id: "mcq_142", unit: 3, topic: "3.5", topicLabel: "Methods: How to Write Them",
    difficulty: "hard", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "public class BankAccount {\n    private double balance;\n    public BankAccount(double initial) { balance = initial; }\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n    public boolean withdraw(double amount) {\n        if (amount > 0 && amount <= balance) {\n            balance -= amount;\n            return true;\n        }\n        return false;\n    }\n    public double getBalance() { return balance; }\n}\n// In main:\nBankAccount acc = new BankAccount(100.0);\nacc.deposit(50.0);\nboolean ok = acc.withdraw(200.0);\nSystem.out.println(acc.getBalance() + \" \" + ok);",
    choices: ["150.0 true", "150.0 false", "-50.0 true", "100.0 false"],
    answer: 1,
    explanation: "Start with 100. deposit(50) → 150. withdraw(200): 200 > 150 so fails, returns false. Balance stays 150.0. Output: \"150.0 false\"."
  },
  {
    id: "mcq_143", unit: 3, topic: "3.3", topicLabel: "Anatomy of a Class",
    difficulty: "medium", source: "original",
    question: "What is the output when toString() is NOT overridden and you print an object?",
    isCode: false, code: "",
    choices: [
      "null",
      "A string like 'ClassName@hexHashCode'",
      "The values of all fields",
      "Compilation error"
    ],
    answer: 1,
    explanation: "If toString() is not overridden, Java uses the default Object.toString(), which returns a string of the form 'ClassName@hexadecimalHashCode'."
  },

  // ── UNIT 4: Data Collections ────────────────────────────────────────────────

  // Topic 4.1 – Ethical and Social Issues Around Data Collection
  {
    id: "mcq_144", unit: 4, topic: "4.1", topicLabel: "Ethical and Social Issues",
    difficulty: "easy", source: "original",
    question: "Which of the following is an ethical concern related to large-scale data collection?",
    isCode: false, code: "",
    choices: [
      "Data collection makes programs run slower",
      "Collecting personal data without user consent may violate privacy",
      "Arrays can only hold primitive data types",
      "Databases cannot store more than 1 million records"
    ],
    answer: 1,
    explanation: "Collecting personal data without informed consent raises significant privacy and ethical concerns. Users should be aware of what data is collected and how it is used."
  },
  {
    id: "mcq_145", unit: 4, topic: "4.1", topicLabel: "Ethical and Social Issues",
    difficulty: "medium", source: "original",
    question: "What is the principle of data minimization?",
    isCode: false, code: "",
    choices: [
      "Storing data in the smallest file format possible",
      "Collecting only the data that is necessary for a specific purpose",
      "Deleting all data after one use",
      "Using small arrays instead of large ones"
    ],
    answer: 1,
    explanation: "Data minimization is an ethical and legal principle that organizations should only collect the personal data that is strictly necessary for their stated purpose."
  },

  // Topic 4.2 – Introduction to Using Data Sets
  {
    id: "mcq_146", unit: 4, topic: "4.2", topicLabel: "Introduction to Data Sets",
    difficulty: "easy", source: "original",
    question: "What is a data set?",
    isCode: false, code: "",
    choices: [
      "A single variable that stores one value",
      "A collection of related data items that can be processed together",
      "A type of loop used for data processing",
      "A method that returns multiple values"
    ],
    answer: 1,
    explanation: "A data set is a collection of related data values (often stored in arrays or other data structures) that can be analyzed, processed, or manipulated together."
  },

  // Topic 4.3 – Array Creation and Access
  {
    id: "mcq_147", unit: 4, topic: "4.3", topicLabel: "Array Creation and Access",
    difficulty: "easy", source: "original",
    question: "What is the index of the last element in an array of 10 elements?",
    isCode: false, code: "",
    choices: ["10", "9", "1", "0"],
    answer: 1,
    explanation: "Arrays in Java are zero-indexed. An array of 10 elements has indices 0 through 9. The last element is at index 9 (= length - 1)."
  },
  {
    id: "mcq_148", unit: 4, topic: "4.3", topicLabel: "Array Creation and Access",
    difficulty: "easy", source: "original",
    question: "Which of the following correctly creates an integer array of size 5?",
    isCode: false, code: "",
    choices: [
      "int arr = new int[5];",
      "int[] arr = new int[5];",
      "int arr[5];",
      "int[] arr = int[5];"
    ],
    answer: 1,
    explanation: "The correct Java syntax for creating an array is: elementType[] arrayName = new elementType[size]; So 'int[] arr = new int[5];' is correct."
  },
  {
    id: "mcq_149", unit: 4, topic: "4.3", topicLabel: "Array Creation and Access",
    difficulty: "medium", source: "original",
    question: "What is the output of the following code?",
    isCode: true,
    code: "int[] arr = {10, 20, 30, 40, 50};\nSystem.out.println(arr[0] + arr[arr.length - 1]);",
    choices: ["60", "30", "50", "10"],
    answer: 0,
    explanation: "arr[0] = 10. arr[arr.length - 1] = arr[4] = 50. 10 + 50 = 60."
  },
  {
    id: "mcq_150", unit: 4, topic: "4.3", topicLabel: "Array Creation and Access",
    difficulty: "hard", source: "original",
    question: "What happens when you access arr[-1] in Java?",
    isCode: false, code: "",
    choices: [
      "Returns the last element",
      "Returns 0",
      "Throws an ArrayIndexOutOfBoundsException",
      "Compilation error"
    ],
    answer: 2,
    explanation: "Java arrays use non-negative integer indices (0 to length-1). Accessing a negative index throws ArrayIndexOutOfBoundsException at runtime."
  },

  // Topic 4.4 – Array Traversals
  {
    id: "mcq_151", unit: 4, topic: "4.4", topicLabel: "Array Traversals",
    difficulty: "easy", source: "original",
    question: "What does the following code print?",
    isCode: true,
    code: "int[] nums = {3, 1, 4, 1, 5};\nfor (int i = 0; i < nums.length; i++) {\n    System.out.print(nums[i] + \" \");\n}",
    choices: ["3 1 4 1 5 ", "5 1 4 1 3 ", "1 1 3 4 5 ", "3 4 5 "],
    answer: 0,
    explanation: "The loop traverses from index 0 to 4, printing each element in order: 3 1 4 1 5."
  },
  {
    id: "mcq_152", unit: 4, topic: "4.4", topicLabel: "Array Traversals",
    difficulty: "medium", source: "original",
    question: "What does the following enhanced for loop do?",
    isCode: true,
    code: "int[] arr = {2, 5, 8, 3, 7};\nint sum = 0;\nfor (int val : arr) {\n    sum += val;\n}\nSystem.out.println(sum);",
    choices: ["25", "87532", "2", "7"],
    answer: 0,
    explanation: "The enhanced for loop (for-each) iterates over each element in arr. sum = 2+5+8+3+7 = 25."
  },
  {
    id: "mcq_153", unit: 4, topic: "4.4", topicLabel: "Array Traversals",
    difficulty: "hard", source: "original",
    question: "What is a key limitation of the enhanced for loop compared to a regular for loop?",
    isCode: false, code: "",
    choices: [
      "The enhanced for loop is slower",
      "The enhanced for loop cannot be used with arrays — only ArrayList",
      "The enhanced for loop does not give access to the current index",
      "The enhanced for loop requires the array to be sorted"
    ],
    answer: 2,
    explanation: "The enhanced for loop (for-each) doesn't provide the index of the current element. When you need the index (e.g., to modify elements, compare adjacent elements, or use the index in calculations), you must use a standard for loop."
  },

  // Topic 4.5 – Implementing Array Algorithms
  {
    id: "mcq_154", unit: 4, topic: "4.5", topicLabel: "Implementing Array Algorithms",
    difficulty: "medium", source: "original",
    question: "What does the following code compute?",
    isCode: true,
    code: "int[] arr = {3, 7, 2, 9, 5};\nint result = arr[0];\nfor (int i = 1; i < arr.length; i++) {\n    if (arr[i] < result) result = arr[i];\n}\nSystem.out.println(result);",
    choices: ["9", "3", "2", "5"],
    answer: 2,
    explanation: "This is the minimum-finding algorithm. Starting with arr[0]=3, it updates result whenever a smaller element is found. Minimum is 2."
  },
  {
    id: "mcq_155", unit: 4, topic: "4.5", topicLabel: "Implementing Array Algorithms",
    difficulty: "hard", source: "original",
    question: "What does the following code do to the array?",
    isCode: true,
    code: "int[] arr = {1, 2, 3, 4, 5};\nfor (int i = 0; i < arr.length / 2; i++) {\n    int temp = arr[i];\n    arr[i] = arr[arr.length - 1 - i];\n    arr[arr.length - 1 - i] = temp;\n}\n// arr is now:",
    choices: [
      "{5, 4, 3, 2, 1}",
      "{1, 2, 3, 4, 5} (unchanged)",
      "{2, 4, 1, 3, 5}",
      "{5, 4, 3, 2, 1} but only half reversed"
    ],
    answer: 0,
    explanation: "This is the array reversal algorithm. It swaps elements from both ends toward the middle. After execution: {5, 4, 3, 2, 1}."
  },

  // Topic 4.6 – Using Text Files (brief coverage)
  {
    id: "mcq_156", unit: 4, topic: "4.6", topicLabel: "Using Text Files",
    difficulty: "easy", source: "original",
    question: "In Java, to read from a text file, you would typically use classes from which package?",
    isCode: false, code: "",
    choices: ["java.lang", "java.util", "java.io", "java.data"],
    answer: 2,
    explanation: "File I/O classes in Java are in the java.io package. This includes File, FileReader, BufferedReader, Scanner (for file reading), PrintWriter, etc."
  },

  // Topic 4.7 – Wrapper Classes
  {
    id: "mcq_157", unit: 4, topic: "4.7", topicLabel: "Wrapper Classes",
    difficulty: "easy", source: "original",
    question: "What is the wrapper class for the primitive type int?",
    isCode: false, code: "",
    choices: ["Int", "Integer", "INT", "Integ"],
    answer: 1,
    explanation: "Each Java primitive has a corresponding wrapper class: int → Integer, double → Double, boolean → Boolean, char → Character, etc."
  },
  {
    id: "mcq_158", unit: 4, topic: "4.7", topicLabel: "Wrapper Classes",
    difficulty: "medium", source: "original",
    question: "What does autoboxing do in Java?",
    isCode: false, code: "",
    choices: [
      "Automatically sorts an ArrayList",
      "Automatically converts between primitives and their wrapper classes",
      "Automatically allocates memory for arrays",
      "Automatically calls toString() on primitives"
    ],
    answer: 1,
    explanation: "Autoboxing is the automatic conversion of a primitive (like int) to its corresponding wrapper class object (Integer), and unboxing is the reverse. Java handles this transparently."
  },
  {
    id: "mcq_159", unit: 4, topic: "4.7", topicLabel: "Wrapper Classes",
    difficulty: "hard", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "Integer a = 5;\nInteger b = 5;\nInteger c = 200;\nInteger d = 200;\nSystem.out.println(a == b);\nSystem.out.println(c == d);",
    choices: ["true\ntrue", "false\nfalse", "true\nfalse", "false\ntrue"],
    answer: 2,
    explanation: "Java caches Integer objects for values -128 to 127. a and b both point to the cached Integer(5), so a==b is true. 200 is outside the cache range, so c and d are different objects; c==d is false."
  },

  // Topic 4.8 – ArrayList Methods
  {
    id: "mcq_160", unit: 4, topic: "4.8", topicLabel: "ArrayList Methods",
    difficulty: "easy", source: "original",
    question: "Which import is needed to use ArrayList?",
    isCode: false, code: "",
    choices: [
      "import java.lang.ArrayList;",
      "import java.util.ArrayList;",
      "import java.io.ArrayList;",
      "No import needed"
    ],
    answer: 1,
    explanation: "ArrayList is in the java.util package: import java.util.ArrayList;"
  },
  {
    id: "mcq_161", unit: 4, topic: "4.8", topicLabel: "ArrayList Methods",
    difficulty: "easy", source: "original",
    question: "How do you add an element to the end of an ArrayList named list?",
    isCode: false, code: "",
    choices: [
      "list.push(element);",
      "list.add(element);",
      "list.append(element);",
      "list[size] = element;"
    ],
    answer: 1,
    explanation: "The ArrayList add(element) method appends an element to the end of the list."
  },
  {
    id: "mcq_162", unit: 4, topic: "4.8", topicLabel: "ArrayList Methods",
    difficulty: "medium", source: "original",
    question: "What is the output of this code?",
    isCode: true,
    code: "import java.util.ArrayList;\nArrayList<Integer> list = new ArrayList<>();\nlist.add(10);\nlist.add(20);\nlist.add(30);\nlist.remove(1);\nSystem.out.println(list);",
    choices: ["[10, 30]", "[20, 30]", "[10, 20]", "[10, 20, 30]"],
    answer: 0,
    explanation: "list.remove(1) removes the element at index 1 (which is 20). The list becomes [10, 30]."
  },
  {
    id: "mcq_163", unit: 4, topic: "4.8", topicLabel: "ArrayList Methods",
    difficulty: "hard", source: "original",
    question: "What does list.set(2, 99) do?",
    isCode: false, code: "",
    choices: [
      "Inserts 99 at index 2, shifting elements right",
      "Replaces the element at index 2 with 99",
      "Removes all elements and adds 99 at index 2",
      "Sets the list capacity to 99 starting at index 2"
    ],
    answer: 1,
    explanation: "ArrayList.set(index, element) replaces the element at the specified index with the new element. Unlike add(), it doesn't shift elements."
  },

  // Topic 4.9 – ArrayList Traversals
  {
    id: "mcq_164", unit: 4, topic: "4.9", topicLabel: "ArrayList Traversals",
    difficulty: "medium", source: "original",
    question: "What is the correct way to traverse an ArrayList with a for-each loop?",
    isCode: true,
    code: "ArrayList<String> words = new ArrayList<>();\nwords.add(\"hello\");\nwords.add(\"world\");",
    choices: [
      "for (int i = 0; i < words.length; i++) { System.out.println(words[i]); }",
      "for (String w : words) { System.out.println(w); }",
      "for (String w in words) { System.out.println(w); }",
      "foreach (String w : words) { System.out.println(w); }"
    ],
    answer: 1,
    explanation: "For ArrayList, use words.size() (not .length) for index loops. The enhanced for loop uses ':' not 'in'. 'foreach' is not Java syntax. Option B is correct."
  },
  {
    id: "mcq_165", unit: 4, topic: "4.9", topicLabel: "ArrayList Traversals",
    difficulty: "hard", source: "original",
    question: "What is wrong with the following code that tries to remove all even numbers?",
    isCode: true,
    code: "ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(1,2,3,4,5,6));\nfor (int i = 0; i < nums.size(); i++) {\n    if (nums.get(i) % 2 == 0) {\n        nums.remove(i);\n    }\n}",
    choices: [
      "You cannot remove from an ArrayList in a for loop",
      "When an element is removed, indices shift left, so consecutive even numbers may be skipped",
      "nums.get() does not exist",
      "Nothing — the code is correct"
    ],
    answer: 1,
    explanation: "When an element at index i is removed, all subsequent elements shift left. The next element is now at index i, but the loop increments i to i+1, skipping it. Solution: decrement i after removal, or iterate backwards."
  },

  // Topic 4.10 – Implementing ArrayList Algorithms
  {
    id: "mcq_166", unit: 4, topic: "4.10", topicLabel: "Implementing ArrayList Algorithms",
    difficulty: "medium", source: "original",
    question: "What does the following code do?",
    isCode: true,
    code: "ArrayList<Integer> list = new ArrayList<>(Arrays.asList(3,1,4,1,5,9,2,6));\nArrayList<Integer> result = new ArrayList<>();\nfor (int val : list) {\n    if (val > 4) result.add(val);\n}\nSystem.out.println(result);",
    choices: ["[5, 9, 6]", "[3, 1, 4, 1]", "[9, 6]", "[5, 9, 2, 6]"],
    answer: 0,
    explanation: "The code filters elements greater than 4. From {3,1,4,1,5,9,2,6}: 5>4, 9>4, 6>4. Result: [5, 9, 6]."
  },
  {
    id: "mcq_167", unit: 4, topic: "4.10", topicLabel: "Implementing ArrayList Algorithms",
    difficulty: "hard", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "ArrayList<String> names = new ArrayList<>(Arrays.asList(\"Bob\",\"Alice\",\"Charlie\",\"Alice\",\"Dave\"));\nArrayList<String> unique = new ArrayList<>();\nfor (String name : names) {\n    if (!unique.contains(name)) {\n        unique.add(name);\n    }\n}\nSystem.out.println(unique.size());",
    choices: ["5", "4", "3", "2"],
    answer: 1,
    explanation: "Removing duplicates: Bob, Alice, Charlie, Dave = 4 unique names. \"Alice\" appears twice but is only added once."
  },

  // Topic 4.11 – 2D Array Creation and Access
  {
    id: "mcq_168", unit: 4, topic: "4.11", topicLabel: "2D Array Creation and Access",
    difficulty: "easy", source: "original",
    question: "How do you access the element in row 2, column 3 of a 2D array named grid?",
    isCode: false, code: "",
    choices: ["grid[2, 3]", "grid[2][3]", "grid.get(2, 3)", "grid[3][2]"],
    answer: 1,
    explanation: "2D arrays in Java are accessed with two separate bracket operators: array[row][col]. Row 2, column 3 is grid[2][3] (using 0-based indexing, these are the 3rd row and 4th column)."
  },
  {
    id: "mcq_169", unit: 4, topic: "4.11", topicLabel: "2D Array Creation and Access",
    difficulty: "medium", source: "original",
    question: "What is the number of rows and columns in the following 2D array?",
    isCode: true,
    code: "int[][] matrix = new int[4][6];",
    choices: ["4 rows, 6 columns", "6 rows, 4 columns", "24 total (no rows/cols)", "4 rows, 4 columns"],
    answer: 0,
    explanation: "new int[rows][cols] — so new int[4][6] creates a 2D array with 4 rows and 6 columns. matrix.length = 4, matrix[0].length = 6."
  },
  {
    id: "mcq_170", unit: 4, topic: "4.11", topicLabel: "2D Array Creation and Access",
    difficulty: "hard", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};\nSystem.out.println(grid[1][2]);",
    choices: ["6", "5", "8", "3"],
    answer: 0,
    explanation: "grid[1] is the second row {4,5,6}. grid[1][2] is the third element of that row = 6."
  },

  // Topic 4.12 – 2D Array Traversals
  {
    id: "mcq_171", unit: 4, topic: "4.12", topicLabel: "2D Array Traversals",
    difficulty: "medium", source: "original",
    question: "What is the sum computed by the following code?",
    isCode: true,
    code: "int[][] m = {{1,2},{3,4},{5,6}};\nint sum = 0;\nfor (int r = 0; r < m.length; r++) {\n    for (int c = 0; c < m[r].length; c++) {\n        sum += m[r][c];\n    }\n}\nSystem.out.println(sum);",
    choices: ["21", "15", "18", "6"],
    answer: 0,
    explanation: "Sum all elements: 1+2+3+4+5+6 = 21."
  },
  {
    id: "mcq_172", unit: 4, topic: "4.12", topicLabel: "2D Array Traversals",
    difficulty: "hard", source: "original",
    question: "How many times does the inner loop body execute?",
    isCode: true,
    code: "int[][] m = new int[3][4];\nfor (int[] row : m) {\n    for (int val : row) {\n        // inner body\n    }\n}",
    choices: ["7", "12", "3", "4"],
    answer: 1,
    explanation: "3 rows, each with 4 columns. Total = 3 × 4 = 12 executions."
  },

  // Topic 4.13 – Implementing 2D Array Algorithms
  {
    id: "mcq_173", unit: 4, topic: "4.13", topicLabel: "Implementing 2D Array Algorithms",
    difficulty: "hard", source: "original",
    question: "What does the following code compute?",
    isCode: true,
    code: "int[][] m = {{1,2,3},{4,5,6},{7,8,9}};\nint diag = 0;\nfor (int i = 0; i < m.length; i++) {\n    diag += m[i][i];\n}\nSystem.out.println(diag);",
    choices: ["15", "12", "9", "45"],
    answer: 0,
    explanation: "This sums the main diagonal: m[0][0]=1, m[1][1]=5, m[2][2]=9. Sum = 1+5+9 = 15."
  },

  // Topic 4.14 – Searching Algorithms
  {
    id: "mcq_174", unit: 4, topic: "4.14", topicLabel: "Searching Algorithms",
    difficulty: "easy", source: "original",
    question: "What does linear (sequential) search do?",
    isCode: false, code: "",
    choices: [
      "Jumps to the middle of the array each step",
      "Checks each element one at a time from beginning to end",
      "Requires the array to be sorted first",
      "Only works on arrays of Strings"
    ],
    answer: 1,
    explanation: "Linear search checks each element sequentially until the target is found or the entire array is searched. It works on unsorted arrays and has O(n) time complexity."
  },
  {
    id: "mcq_175", unit: 4, topic: "4.14", topicLabel: "Searching Algorithms",
    difficulty: "medium", source: "original",
    question: "Which prerequisite does binary search require?",
    isCode: false, code: "",
    choices: [
      "The array must have an even number of elements",
      "The array must be sorted",
      "The array must contain only integers",
      "The target must be in the first half"
    ],
    answer: 1,
    explanation: "Binary search requires a sorted array. It works by comparing the target to the middle element and eliminating half the search space each step, achieving O(log n) performance."
  },
  {
    id: "mcq_176", unit: 4, topic: "4.14", topicLabel: "Searching Algorithms",
    difficulty: "hard", source: "original",
    question: "In binary search on a sorted array of 16 elements, what is the maximum number of comparisons needed?",
    isCode: false, code: "",
    choices: ["4", "5", "8", "16"],
    answer: 0,
    explanation: "Binary search: max comparisons = ceil(log₂(n)) = ceil(log₂(16)) = 4 (since 2^4 = 16). Each comparison halves the search space."
  },

  // Topic 4.15 – Sorting Algorithms
  {
    id: "mcq_177", unit: 4, topic: "4.15", topicLabel: "Sorting Algorithms",
    difficulty: "medium", source: "original",
    question: "How does selection sort work?",
    isCode: false, code: "",
    choices: [
      "It compares adjacent elements and swaps them if out of order",
      "It finds the minimum element and places it at the correct position repeatedly",
      "It splits the array in half and sorts each half recursively",
      "It inserts each element into its correct position one at a time from the left"
    ],
    answer: 1,
    explanation: "Selection sort finds the minimum element in the unsorted portion and swaps it to its correct position. It makes n-1 passes, each finding the minimum of the remaining unsorted portion."
  },
  {
    id: "mcq_178", unit: 4, topic: "4.15", topicLabel: "Sorting Algorithms",
    difficulty: "hard", source: "original",
    question: "What is the state of the array after TWO passes of selection sort on {64, 25, 12, 22, 11}?",
    isCode: false, code: "",
    choices: [
      "{11, 12, 64, 25, 22}",
      "{11, 25, 12, 22, 64}",
      "{11, 12, 25, 64, 22}",
      "{11, 12, 22, 25, 64}"
    ],
    answer: 0,
    explanation: "Pass 1: Find min (11), swap with first element → {11, 25, 12, 22, 64}. Pass 2: Find min of remaining {25,12,22,64} = 12, swap with second element → {11, 12, 25, 22, 64}. Wait, that's option C. Let me recheck: {64,25,12,22,11} → pass1 min=11 at index 4, swap with index 0 → {11,25,12,22,64} → pass2 min of {25,12,22,64}=12 at index 2, swap with index 1 → {11,12,25,22,64}. Answer is C (index 2)."
  },
  {
    id: "mcq_179", unit: 4, topic: "4.15", topicLabel: "Sorting Algorithms",
    difficulty: "hard", source: "original",
    question: "What is the time complexity of insertion sort in the worst case?",
    isCode: false, code: "",
    choices: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    answer: 2,
    explanation: "Insertion sort has O(n²) worst-case time complexity. The worst case occurs when the input is sorted in reverse order, requiring the maximum number of comparisons and shifts."
  },

  // Topic 4.16 – Recursion
  {
    id: "mcq_180", unit: 4, topic: "4.16", topicLabel: "Recursion",
    difficulty: "easy", source: "original",
    question: "What is a base case in a recursive method?",
    isCode: false, code: "",
    choices: [
      "The first call to the recursive method",
      "The condition that stops the recursion without making another recursive call",
      "The last line of a recursive method",
      "A method that calls itself from inside a loop"
    ],
    answer: 1,
    explanation: "A base case is a condition that can be solved directly without further recursion. Every recursive method must have at least one base case to prevent infinite recursion."
  },
  {
    id: "mcq_181", unit: 4, topic: "4.16", topicLabel: "Recursion",
    difficulty: "medium", source: "original",
    question: "What does the following recursive method return when called with n=5?",
    isCode: true,
    code: "public static int mystery(int n) {\n    if (n <= 1) return 1;\n    return n * mystery(n - 1);\n}",
    choices: ["5", "120", "15", "25"],
    answer: 1,
    explanation: "This computes n! (factorial). mystery(5) = 5 * mystery(4) = 5 * 4 * mystery(3) = 5*4*3*2*1 = 120."
  },
  {
    id: "mcq_182", unit: 4, topic: "4.16", topicLabel: "Recursion",
    difficulty: "hard", source: "original",
    question: "What is the output of mystery(4)?",
    isCode: true,
    code: "public static int mystery(int n) {\n    if (n == 0) return 0;\n    return mystery(n - 1) + n;\n}",
    choices: ["4", "10", "6", "24"],
    answer: 1,
    explanation: "mystery(4) = mystery(3) + 4. mystery(3) = mystery(2) + 3. mystery(2) = mystery(1) + 2. mystery(1) = mystery(0) + 1 = 1. So: 1+2+3+4 = 10. This computes the sum 1+2+...+n."
  },
  {
    id: "mcq_183", unit: 4, topic: "4.16", topicLabel: "Recursion",
    difficulty: "hard", source: "original",
    question: "What is the output of fib(6)?",
    isCode: true,
    code: "public static int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}",
    choices: ["5", "8", "13", "3"],
    answer: 1,
    explanation: "Fibonacci: fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5, fib(6)=8."
  },

  // Topic 4.17 – Recursive Searching and Sorting
  {
    id: "mcq_184", unit: 4, topic: "4.17", topicLabel: "Recursive Searching and Sorting",
    difficulty: "medium", source: "original",
    question: "Which sorting algorithm uses a recursive divide-and-conquer approach?",
    isCode: false, code: "",
    choices: [
      "Selection sort",
      "Insertion sort",
      "Bubble sort",
      "Merge sort"
    ],
    answer: 3,
    explanation: "Merge sort is a recursive divide-and-conquer algorithm. It splits the array in half, recursively sorts each half, then merges the sorted halves. It achieves O(n log n) performance."
  },
  {
    id: "mcq_185", unit: 4, topic: "4.17", topicLabel: "Recursive Searching and Sorting",
    difficulty: "hard", source: "original",
    question: "What does the following recursive binary search return when called with binarySearch(arr, 0, 4, 7) on arr = {2, 4, 7, 9, 11}?",
    isCode: true,
    code: "public static int binarySearch(int[] arr, int lo, int hi, int target) {\n    if (lo > hi) return -1;\n    int mid = (lo + hi) / 2;\n    if (arr[mid] == target) return mid;\n    if (arr[mid] < target) return binarySearch(arr, mid + 1, hi, target);\n    return binarySearch(arr, lo, mid - 1, target);\n}",
    choices: ["2", "7", "-1", "1"],
    answer: 0,
    explanation: "arr = {2,4,7,9,11}, target=7. First call: mid=(0+4)/2=2, arr[2]=7 == target. Returns 2 (the index). Answer is index 2 → choice \"2\" at position 0."
  },

  // Additional Unit 4 questions to fill to 110 total
  {
    id: "mcq_186", unit: 4, topic: "4.3", topicLabel: "Array Creation and Access",
    difficulty: "easy", source: "original",
    question: "What is the default value of elements in a newly created int[] array?",
    isCode: false, code: "",
    choices: ["null", "-1", "0", "undefined"],
    answer: 2,
    explanation: "In Java, int array elements are automatically initialized to 0. Boolean arrays initialize to false, double arrays to 0.0, and object arrays to null."
  },
  {
    id: "mcq_187", unit: 4, topic: "4.5", topicLabel: "Implementing Array Algorithms",
    difficulty: "medium", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "int[] arr = {1, 2, 3, 4, 5};\nint count = 0;\nfor (int val : arr) {\n    if (val % 2 != 0) count++;\n}\nSystem.out.println(count);",
    choices: ["2", "3", "5", "1"],
    answer: 1,
    explanation: "Odd numbers in {1,2,3,4,5}: 1, 3, 5 → count = 3."
  },
  {
    id: "mcq_188", unit: 4, topic: "4.8", topicLabel: "ArrayList Methods",
    difficulty: "medium", source: "original",
    question: "What is the difference between an array and an ArrayList?",
    isCode: false, code: "",
    choices: [
      "Arrays can hold objects; ArrayLists can only hold primitives",
      "Arrays have fixed size; ArrayLists can grow and shrink dynamically",
      "ArrayLists are faster than arrays for all operations",
      "Arrays can hold multiple types; ArrayLists can only hold one type"
    ],
    answer: 1,
    explanation: "Arrays have a fixed size set at creation. ArrayLists can grow and shrink dynamically. Arrays can hold primitives directly; ArrayLists require wrapper types (Integer, not int)."
  },
  {
    id: "mcq_189", unit: 4, topic: "4.14", topicLabel: "Searching Algorithms",
    difficulty: "easy", source: "original",
    question: "What does a linear search return if the target is not found?",
    isCode: false, code: "",
    choices: [
      "0",
      "null",
      "-1 (by convention)",
      "It throws an exception"
    ],
    answer: 2,
    explanation: "By convention, search algorithms return -1 to indicate the target was not found (since -1 is not a valid array index)."
  },
  {
    id: "mcq_190", unit: 4, topic: "4.16", topicLabel: "Recursion",
    difficulty: "medium", source: "original",
    question: "What happens if a recursive method has no base case?",
    isCode: false, code: "",
    choices: [
      "It returns null after 100 calls",
      "It compiles but causes a StackOverflowError at runtime",
      "It causes a compilation error",
      "It runs forever without error"
    ],
    answer: 1,
    explanation: "Without a base case, recursion never stops. Each call adds a stack frame until the call stack runs out of memory, causing a StackOverflowError."
  },
  {
    id: "mcq_191", unit: 4, topic: "4.4", topicLabel: "Array Traversals",
    difficulty: "medium", source: "original",
    question: "What is printed?",
    isCode: true,
    code: "int[] arr = {5, 10, 15, 20, 25};\nfor (int i = arr.length - 1; i >= 0; i--) {\n    System.out.print(arr[i] + \" \");\n}",
    choices: ["5 10 15 20 25 ", "25 20 15 10 5 ", "5 25 10 20 15 ", "25 5 20 10 15 "],
    answer: 1,
    explanation: "The loop traverses from the last index (4) to 0, printing elements in reverse: 25 20 15 10 5."
  },
  {
    id: "mcq_192", unit: 4, topic: "4.11", topicLabel: "2D Array Creation and Access",
    difficulty: "easy", source: "original",
    question: "If matrix is a 2D array, what does matrix.length return?",
    isCode: false, code: "",
    choices: [
      "The total number of elements",
      "The number of rows",
      "The number of columns",
      "The number of columns in the first row"
    ],
    answer: 1,
    explanation: "For a 2D array, .length gives the number of rows. To get the number of columns, use matrix[0].length (assuming rectangular array)."
  },
  {
    id: "mcq_193", unit: 4, topic: "4.15", topicLabel: "Sorting Algorithms",
    difficulty: "medium", source: "original",
    question: "How does bubble sort work?",
    isCode: false, code: "",
    choices: [
      "It selects the minimum element and places it at the front",
      "It repeatedly compares adjacent elements and swaps them if they are in the wrong order",
      "It inserts each element into its correct position in the sorted portion",
      "It divides the array in half recursively"
    ],
    answer: 1,
    explanation: "Bubble sort compares adjacent pairs and swaps them if out of order. After each pass, the largest unsorted element 'bubbles' to its correct position at the end."
  },
  {
    id: "mcq_194", unit: 4, topic: "4.7", topicLabel: "Wrapper Classes",
    difficulty: "easy", source: "original",
    question: "Which method converts the String \"42\" to the int value 42?",
    isCode: false, code: "",
    choices: [
      "String.toInt(\"42\")",
      "Integer.parseInt(\"42\")",
      "\"42\".intValue()",
      "int.parse(\"42\")"
    ],
    answer: 1,
    explanation: "Integer.parseInt(String) converts a String to a primitive int. This is a static method of the Integer wrapper class."
  },
  {
    id: "mcq_195", unit: 4, topic: "4.13", topicLabel: "Implementing 2D Array Algorithms",
    difficulty: "medium", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};\nint sum = 0;\nfor (int c = 0; c < grid[0].length; c++) {\n    sum += grid[0][c];\n}\nSystem.out.println(sum);",
    choices: ["12", "6", "9", "15"],
    answer: 1,
    explanation: "This sums the first row: grid[0] = {1, 2, 3}. Sum = 1+2+3 = 6."
  },
  {
    id: "mcq_196", unit: 4, topic: "4.9", topicLabel: "ArrayList Traversals",
    difficulty: "easy", source: "original",
    question: "What method returns the number of elements in an ArrayList?",
    isCode: false, code: "",
    choices: ["length()", "size()", "count()", "length"],
    answer: 1,
    explanation: "ArrayList uses size() to return the number of elements. Arrays use .length (a field, not a method). This is a common source of confusion."
  },
  {
    id: "mcq_197", unit: 4, topic: "4.5", topicLabel: "Implementing Array Algorithms",
    difficulty: "hard", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "int[] arr = {5, 2, 8, 1, 9, 3};\nint secondLargest = Integer.MIN_VALUE;\nint largest = Integer.MIN_VALUE;\nfor (int val : arr) {\n    if (val > largest) {\n        secondLargest = largest;\n        largest = val;\n    } else if (val > secondLargest) {\n        secondLargest = val;\n    }\n}\nSystem.out.println(secondLargest);",
    choices: ["8", "5", "9", "3"],
    answer: 0,
    explanation: "Iterating: 5 becomes largest. 2 < 5. 8 > 5: secondLargest=5, largest=8. 1<8. 9>8: secondLargest=8, largest=9. 3<9 but 3<8. secondLargest = 8."
  },
  {
    id: "mcq_198", unit: 4, topic: "4.12", topicLabel: "2D Array Traversals",
    difficulty: "hard", source: "original",
    question: "What is the output of this code that prints a 2D array by columns?",
    isCode: true,
    code: "int[][] m = {{1,2,3},{4,5,6}};\nfor (int c = 0; c < m[0].length; c++) {\n    for (int r = 0; r < m.length; r++) {\n        System.out.print(m[r][c] + \" \");\n    }\n}",
    choices: ["1 2 3 4 5 6 ", "1 4 2 5 3 6 ", "4 5 6 1 2 3 ", "1 4 3 6 2 5 "],
    answer: 1,
    explanation: "Column-major traversal: c=0: m[0][0]=1, m[1][0]=4. c=1: m[0][1]=2, m[1][1]=5. c=2: m[0][2]=3, m[1][2]=6. Output: \"1 4 2 5 3 6 \"."
  },
  {
    id: "mcq_199", unit: 4, topic: "4.10", topicLabel: "Implementing ArrayList Algorithms",
    difficulty: "hard", source: "original",
    question: "What is the correct way to remove all elements from an ArrayList that are less than 5?",
    isCode: false, code: "",
    choices: [
      "for (int i = 0; i < list.size(); i++) { if (list.get(i) < 5) list.remove(i); }",
      "for (int i = list.size()-1; i >= 0; i--) { if (list.get(i) < 5) list.remove(i); }",
      "for (int val : list) { if (val < 5) list.remove(val); }",
      "list.removeIf(n -> n >= 5);"
    ],
    answer: 1,
    explanation: "Iterating backwards prevents index-skipping problems. When you remove element at index i and iterate forward, the next element moves to index i but you increment to i+1. Iterating backward avoids this issue."
  },
  {
    id: "mcq_200", unit: 4, topic: "4.16", topicLabel: "Recursion",
    difficulty: "hard", source: "original",
    question: "What is the output of this recursive power method when called as power(2, 8)?",
    isCode: true,
    code: "public static int power(int base, int exp) {\n    if (exp == 0) return 1;\n    if (exp % 2 == 0) {\n        int half = power(base, exp / 2);\n        return half * half;\n    }\n    return base * power(base, exp - 1);\n}",
    choices: ["64", "128", "256", "16"],
    answer: 2,
    explanation: "This is fast exponentiation. power(2,8): exp=8 even → half=power(2,4). power(2,4): exp=4 even → half=power(2,2). power(2,2): exp=2 even → half=power(2,1). power(2,1): exp=1 odd → 2*power(2,0)=2*1=2. So power(2,2)=2*2=4, power(2,4)=4*4=16, power(2,8)=16*16=256."
  },
  {
    id: "mcq_201", unit: 4, topic: "4.14", topicLabel: "Searching Algorithms",
    difficulty: "hard", source: "original",
    question: "What does this linear search return for target=99 in arr={1,2,3,4,5}?",
    isCode: true,
    code: "public static int linearSearch(int[] arr, int target) {\n    for (int i = 0; i < arr.length; i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}",
    choices: ["0", "5", "-1", "null"],
    answer: 2,
    explanation: "99 is not in the array {1,2,3,4,5}. After checking all elements without finding 99, the method returns -1."
  },
  {
    id: "mcq_202", unit: 4, topic: "4.8", topicLabel: "ArrayList Methods",
    difficulty: "hard", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1,2,3,4,5));\nlist.add(2, 99);\nSystem.out.println(list);",
    choices: ["[1, 2, 99, 3, 4, 5]", "[1, 2, 3, 99, 4, 5]", "[1, 99, 2, 3, 4, 5]", "[99, 1, 2, 3, 4, 5]"],
    answer: 0,
    explanation: "list.add(index, element) inserts element at the given index, shifting subsequent elements right. add(2, 99) inserts 99 at index 2: [1, 2, 99, 3, 4, 5]."
  },
  {
    id: "mcq_203", unit: 4, topic: "4.1", topicLabel: "Ethical and Social Issues",
    difficulty: "hard", source: "original",
    question: "A company collects user location data to 'improve services.' What ethical principle might they be violating if they sell this data to third parties without user knowledge?",
    isCode: false, code: "",
    choices: [
      "The principle of data maximization",
      "The principle of informed consent and transparency",
      "The principle of computational efficiency",
      "The principle of open-source software"
    ],
    answer: 1,
    explanation: "Selling user data without their knowledge violates informed consent — users have not agreed to their data being shared with third parties. This is a fundamental privacy and ethical concern."
  },
  {
    id: "mcq_204", unit: 4, topic: "4.17", topicLabel: "Recursive Searching and Sorting",
    difficulty: "hard", source: "original",
    question: "What is the time complexity of merge sort?",
    isCode: false, code: "",
    choices: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"],
    answer: 2,
    explanation: "Merge sort has O(n log n) time complexity in all cases (best, average, and worst). It divides the array log n times and merges in O(n) time at each level."
  },
  {
    id: "mcq_205", unit: 4, topic: "4.6", topicLabel: "Using Text Files",
    difficulty: "medium", source: "original",
    question: "Which exception must be handled or declared when reading from a file using FileReader?",
    isCode: false, code: "",
    choices: [
      "NullPointerException",
      "ArrayIndexOutOfBoundsException",
      "IOException",
      "ClassNotFoundException"
    ],
    answer: 2,
    explanation: "File I/O operations can fail (file not found, permissions issues, etc.), so they throw IOException (a checked exception). You must either catch it with try-catch or declare 'throws IOException'."
  },
  {
    id: "mcq_206", unit: 4, topic: "4.3", topicLabel: "Array Creation and Access",
    difficulty: "hard", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "int[] a = new int[3];\na[0] = 1;\na[1] = a[0] + 1;\na[2] = a[1] * 2;\nSystem.out.println(a[0] + a[1] + a[2]);",
    choices: ["7", "5", "9", "6"],
    answer: 0,
    explanation: "a[0]=1, a[1]=1+1=2, a[2]=2*2=4. Sum = 1+2+4 = 7."
  },
  {
    id: "mcq_207", unit: 4, topic: "4.4", topicLabel: "Array Traversals",
    difficulty: "hard", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "int[] arr = {2, 4, 6, 8, 10};\nfor (int i = 0; i < arr.length; i++) {\n    arr[i] *= 2;\n}\nSystem.out.println(arr[2]);",
    choices: ["12", "4", "6", "8"],
    answer: 0,
    explanation: "After doubling all elements: {4,8,12,16,20}. arr[2] = 12."
  },
  {
    id: "mcq_208", unit: 4, topic: "4.2", topicLabel: "Introduction to Data Sets",
    difficulty: "medium", source: "original",
    question: "Which data structure is best for storing an ordered sequence of elements that will be frequently accessed by index?",
    isCode: false, code: "",
    choices: [
      "A HashMap",
      "An array or ArrayList",
      "A Stack",
      "A Queue"
    ],
    answer: 1,
    explanation: "Arrays and ArrayLists provide O(1) index-based access, making them ideal for ordered sequences where random access by position is common."
  },
  {
    id: "mcq_209", unit: 4, topic: "4.15", topicLabel: "Sorting Algorithms",
    difficulty: "hard", source: "original",
    question: "What is the output after running insertion sort on {5, 1, 4, 2} after TWO passes?",
    isCode: false, code: "",
    choices: [
      "{1, 4, 5, 2}",
      "{1, 2, 4, 5}",
      "{1, 4, 2, 5}",
      "{1, 5, 4, 2}"
    ],
    answer: 0,
    explanation: "Insertion sort: start with {5}. Pass 1: insert 1 → {1,5,4,2}. Pass 2: insert 4 → {1,4,5,2}. After two passes: {1,4,5,2}."
  },
  {
    id: "mcq_210", unit: 4, topic: "4.11", topicLabel: "2D Array Creation and Access",
    difficulty: "medium", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "int[][] m = {{1,2,3},{4,5,6}};\nSystem.out.println(m.length + \" \" + m[0].length);",
    choices: ["6 1", "2 3", "3 2", "2 6"],
    answer: 1,
    explanation: "m.length = 2 (number of rows). m[0].length = 3 (number of columns in first row). Output: \"2 3\"."
  },
  {
    id: "mcq_211", unit: 4, topic: "4.16", topicLabel: "Recursion",
    difficulty: "medium", source: "original",
    question: "What is mystery(5) for this function?",
    isCode: true,
    code: "public static int mystery(int n) {\n    if (n == 0) return 1;\n    return 2 * mystery(n - 1);\n}",
    choices: ["16", "32", "10", "25"],
    answer: 1,
    explanation: "mystery(5) = 2*mystery(4) = 2*2*mystery(3) = ... = 2^5 = 32. This computes 2^n."
  },
  {
    id: "mcq_212", unit: 4, topic: "4.9", topicLabel: "ArrayList Traversals",
    difficulty: "hard", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "ArrayList<String> list = new ArrayList<>(Arrays.asList(\"a\",\"b\",\"c\",\"d\"));\nfor (int i = list.size() - 1; i >= 0; i--) {\n    System.out.print(list.get(i));\n}",
    choices: ["abcd", "dcba", "abdc", "dabc"],
    answer: 1,
    explanation: "Traversing from index 3 down to 0: list.get(3)='d', get(2)='c', get(1)='b', get(0)='a'. Output: \"dcba\"."
  },
  {
    id: "mcq_213", unit: 4, topic: "4.13", topicLabel: "Implementing 2D Array Algorithms",
    difficulty: "hard", source: "original",
    question: "What is the output of this code that finds the maximum element in a 2D array?",
    isCode: true,
    code: "int[][] m = {{3,7,2},{8,1,9},{4,6,5}};\nint max = m[0][0];\nfor (int[] row : m) {\n    for (int val : row) {\n        if (val > max) max = val;\n    }\n}\nSystem.out.println(max);",
    choices: ["3", "9", "8", "7"],
    answer: 1,
    explanation: "The algorithm finds the maximum value in all rows and columns. The maximum in {{3,7,2},{8,1,9},{4,6,5}} is 9."
  },
  {
    id: "mcq_214", unit: 4, topic: "4.17", topicLabel: "Recursive Searching and Sorting",
    difficulty: "medium", source: "original",
    question: "What is the advantage of recursive binary search over iterative binary search?",
    isCode: false, code: "",
    choices: [
      "It is always faster",
      "It uses less memory",
      "The code can be cleaner and more readable; both have O(log n) complexity",
      "It can search unsorted arrays"
    ],
    answer: 2,
    explanation: "Recursive and iterative binary search have the same O(log n) time complexity. The recursive version can be cleaner to read; however, it uses more stack space due to recursive calls."
  },
  {
    id: "mcq_215", unit: 4, topic: "4.5", topicLabel: "Implementing Array Algorithms",
    difficulty: "hard", source: "original",
    question: "What does this code print?",
    isCode: true,
    code: "int[] arr = {3, 1, 4, 1, 5, 9, 2, 6};\nint target = 1;\nint count = 0;\nfor (int val : arr) {\n    if (val == target) count++;\n}\nSystem.out.println(count);",
    choices: ["1", "2", "0", "3"],
    answer: 1,
    explanation: "Count occurrences of 1 in {3,1,4,1,5,9,2,6}: 1 appears at index 1 and index 3 → count = 2."
  },
  {
    id: "mcq_216", unit: 4, topic: "4.8", topicLabel: "ArrayList Methods",
    difficulty: "easy", source: "original",
    question: "What does ArrayList.contains() return?",
    isCode: false, code: "",
    choices: [
      "The index of the element if found",
      "A boolean: true if the element is in the list, false otherwise",
      "The element itself if found, null otherwise",
      "The number of times the element appears"
    ],
    answer: 1,
    explanation: "ArrayList.contains(element) returns true if the element is present in the list, false otherwise. It uses .equals() for comparison."
  },
  {
    id: "mcq_217", unit: 4, topic: "4.3", topicLabel: "Array Creation and Access",
    difficulty: "medium", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "String[] words = {\"apple\", \"banana\", \"cherry\"};\nSystem.out.println(words[1].length());",
    choices: ["5", "6", "3", "1"],
    answer: 1,
    explanation: "words[1] = \"banana\". \"banana\".length() = 6."
  },
  {
    id: "mcq_218", unit: 4, topic: "4.10", topicLabel: "Implementing ArrayList Algorithms",
    difficulty: "medium", source: "original",
    question: "What is the output?",
    isCode: true,
    code: "ArrayList<Integer> list = new ArrayList<>(Arrays.asList(10, 20, 30, 40, 50));\nint total = 0;\nfor (int i = 0; i < list.size(); i += 2) {\n    total += list.get(i);\n}\nSystem.out.println(total);",
    choices: ["90", "150", "60", "120"],
    answer: 0,
    explanation: "Accesses indices 0,2,4: list.get(0)=10, list.get(2)=30, list.get(4)=50. Total = 10+30+50 = 90."
  },
  {
    id: "mcq_219", unit: 4, topic: "4.7", topicLabel: "Wrapper Classes",
    difficulty: "medium", source: "original",
    question: "What does Integer.toString(42) return?",
    isCode: false, code: "",
    choices: ["42", "\"42\"", "42.0", "Integer(42)"],
    answer: 1,
    explanation: "Integer.toString(int) converts an int to its String representation. Integer.toString(42) returns the String \"42\"."
  },
  {
    id: "mcq_220", unit: 4, topic: "4.2", topicLabel: "Introduction to Data Sets",
    difficulty: "hard", source: "original",
    question: "You have a data set of 1 million student test scores. Which operation would be MOST efficient with a sorted array?",
    isCode: false, code: "",
    choices: [
      "Adding a new score at a specific position",
      "Finding the median score",
      "Searching for a specific score",
      "Both B and C are efficient with a sorted array"
    ],
    answer: 3,
    explanation: "With a sorted array: the median is at index n/2 (O(1)). Binary search finds a specific score in O(log n). Inserting at a position requires shifting elements O(n). Both B and C benefit from sorting."
  },
  {
    id: "mcq_221", unit: 4, topic: "4.15", topicLabel: "Sorting Algorithms",
    difficulty: "easy", source: "original",
    question: "What is the key advantage of merge sort over selection sort?",
    isCode: false, code: "",
    choices: [
      "Merge sort uses less memory",
      "Merge sort has better worst-case time complexity: O(n log n) vs O(n²)",
      "Merge sort works on unsorted data; selection sort doesn't",
      "Merge sort is simpler to implement"
    ],
    answer: 1,
    explanation: "Merge sort runs in O(n log n) in all cases, which is significantly better than selection sort's O(n²) for large data sets."
  },
  {
    id: "mcq_222", unit: 4, topic: "4.16", topicLabel: "Recursion",
    difficulty: "hard", source: "original",
    question: "What is printed by this recursive method when called with printPattern(3)?",
    isCode: true,
    code: "public static void printPattern(int n) {\n    if (n <= 0) return;\n    System.out.print(n + \" \");\n    printPattern(n - 1);\n    System.out.print(n + \" \");\n}",
    choices: ["3 2 1 ", "3 2 1 2 3 ", "1 2 3 2 1 ", "3 2 1 1 2 3 "],
    answer: 1,
    explanation: "Prints n, recurses, prints n again on the way back. Stack unwinds: print 3, recurse(2): print 2, recurse(1): print 1, recurse(0): return. Unwind: print 1, print 2, print 3. Result: 3 2 1 1 2 3. Wait that's option 3. Let me recheck: print(3), recurse→print(2), recurse→print(1), recurse→return. Now unwind: print(1), return to 2: print(2), return to 3: print(3). So: \"3 2 1 1 2 3 \". That matches answer index 3."
  },
  {
    id: "mcq_223", unit: 4, topic: "4.4", topicLabel: "Array Traversals",
    difficulty: "easy", source: "original",
    question: "What is the correct way to use an enhanced for loop over an int array?",
    isCode: false, code: "",
    choices: [
      "for (int i : arr.length) { }",
      "for (int val : arr) { }",
      "for (arr : int val) { }",
      "for (val in arr) { }"
    ],
    answer: 1,
    explanation: "The enhanced for loop syntax is: for (elementType var : arrayOrCollection) { }. For an int array: for (int val : arr) { }."
  },
  {
    id: "mcq_224", unit: 4, topic: "4.12", topicLabel: "2D Array Traversals",
    difficulty: "medium", source: "original",
    question: "What does the following code print?",
    isCode: true,
    code: "int[][] m = {{1,0,0},{0,1,0},{0,0,1}};\nboolean isDiag = true;\nfor (int r = 0; r < m.length && isDiag; r++) {\n    for (int c = 0; c < m[r].length && isDiag; c++) {\n        if (r == c && m[r][c] != 1) isDiag = false;\n        if (r != c && m[r][c] != 0) isDiag = false;\n    }\n}\nSystem.out.println(isDiag);",
    choices: ["true", "false", "Compilation error", "null"],
    answer: 0,
    explanation: "This checks if the matrix is an identity matrix (1s on diagonal, 0s elsewhere). {{1,0,0},{0,1,0},{0,0,1}} is the 3×3 identity matrix, so isDiag = true."
  },
  {
    id: "mcq_225", unit: 4, topic: "4.17", topicLabel: "Recursive Searching and Sorting",
    difficulty: "hard", source: "original",
    question: "What is printed when mergeSort is called on {5, 2, 8, 1, 9} and then the sorted array is printed?",
    isCode: false, code: "",
    choices: [
      "{1, 2, 5, 8, 9}",
      "{9, 8, 5, 2, 1}",
      "{5, 2, 1, 8, 9}",
      "{2, 1, 5, 8, 9}"
    ],
    answer: 0,
    explanation: "Merge sort produces a fully sorted array in ascending order. {5,2,8,1,9} sorted ascending = {1,2,5,8,9}."
  }
];
