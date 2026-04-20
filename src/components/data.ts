export type Section = "home" | "courses" | "lessons" | "practice" | "about";

export const courses = [
  {
    id: 1,
    title: "Python с нуля",
    level: "Начинающий",
    lessons: 6,
    duration: "3 часа",
    color: "#4F46E5",
    topics: ["Переменные", "Условия", "Циклы", "Функции", "Списки", "Строки"],
  },
  {
    id: 2,
    title: "Алгоритмы и структуры данных",
    level: "Средний",
    lessons: 5,
    duration: "2.5 часа",
    color: "#0891B2",
    topics: ["Словари", "Множества", "Стек", "Рекурсия", "Сортировки"],
  },
  {
    id: 3,
    title: "Веб-разработка с Flask",
    level: "Продвинутый",
    lessons: 5,
    duration: "3 часа",
    color: "#059669",
    topics: ["REST API", "Маршруты", "JSON", "Методы HTTP", "Ошибки"],
  },
];

export type Lesson = {
  id: number;
  courseId: number;
  course: string;
  title: string;
  done: boolean;
  code: string;
};

export const lessonsByCourse: Record<number, Lesson[]> = {
  1: [
    {
      id: 101,
      courseId: 1,
      course: "Python с нуля",
      title: "Переменные и типы данных",
      done: false,
      code: `# Переменные в Python
name = "Анна"
age = 25
height = 1.68
is_student = True

print(f"Привет, {"{name}"}!")
print(f"Возраст: {"{age}"} лет")
print(type(age))    # <class 'int'>
print(type(height)) # <class 'float'>`,
    },
    {
      id: 102,
      courseId: 1,
      course: "Python с нуля",
      title: "Условные операторы",
      done: false,
      code: `# if / elif / else
temperature = 22

if temperature > 30:
    print("Жарко!")
elif temperature > 20:
    print("Тепло и приятно")
else:
    print("Прохладно")

# Тернарный оператор
status = "тепло" if temperature > 20 else "холодно"
print(status)`,
    },
    {
      id: 103,
      courseId: 1,
      course: "Python с нуля",
      title: "Циклы: for и while",
      done: false,
      code: `# Цикл for
fruits = ["яблоко", "банан", "вишня"]
for fruit in fruits:
    print(f"Фрукт: {"{fruit}"}")

# range()
for i in range(5):
    print(i)  # 0 1 2 3 4

# Цикл while
count = 0
while count < 3:
    print(count)
    count += 1`,
    },
    {
      id: 104,
      courseId: 1,
      course: "Python с нуля",
      title: "Функции",
      done: false,
      code: `# Создание функций
def greet(name, greeting="Привет"):
    return f"{"{greeting}"}, {"{name}"}!"

print(greet("Мир"))
print(greet("Python", "Здравствуй"))

# Функция с несколькими возвращаемыми значениями
def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([3, 1, 4, 1, 5])
print(lo, hi)  # 1 5`,
    },
    {
      id: 105,
      courseId: 1,
      course: "Python с нуля",
      title: "Списки и операции с ними",
      done: false,
      code: `# Списки
nums = [3, 1, 4, 1, 5, 9, 2]

nums.append(6)       # добавить в конец
nums.sort()          # сортировка
print(nums)

# Срезы
print(nums[0:3])     # первые 3
print(nums[-1])      # последний

# List comprehension
squares = [x**2 for x in range(6)]
print(squares)  # [0, 1, 4, 9, 16, 25]`,
    },
    {
      id: 106,
      courseId: 1,
      course: "Python с нуля",
      title: "Строки и методы строк",
      done: false,
      code: `# Строки
s = "  Hello, Python!  "

print(s.strip())          # убрать пробелы
print(s.lower())          # нижний регистр
print(s.upper())          # верхний регистр
print(s.replace("Python", "World"))
print(s.split(","))       # разбить по разделителю

# f-строки
name = "Тимур"
score = 95
print(f"Студент {"{name}"} набрал {"{score}"}%")`,
    },
  ],
  2: [
    {
      id: 201,
      courseId: 2,
      course: "Алгоритмы и структуры данных",
      title: "Словари (dict)",
      done: false,
      code: `# Словарь — ключ: значение
student = {
    "name": "Тимур",
    "age": 16,
    "grade": "10б"
}

print(student["name"])          # Тимур
student["score"] = 95           # добавить ключ
print(student.get("city", "?")) # безопасное получение

# Перебор
for key, val in student.items():
    print(f"{"{key}"}: {"{val}"}")`,
    },
    {
      id: 202,
      courseId: 2,
      course: "Алгоритмы и структуры данных",
      title: "Множества (set)",
      done: false,
      code: `# Множество — уникальные элементы
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)  # объединение: {1,2,3,4,5,6}
print(a & b)  # пересечение: {3,4}
print(a - b)  # разность: {1,2}

# Удаление дублей из списка
nums = [1, 2, 2, 3, 3, 3]
unique = list(set(nums))
print(unique)  # [1, 2, 3]`,
    },
    {
      id: 203,
      courseId: 2,
      course: "Алгоритмы и структуры данных",
      title: "Стек и очередь",
      done: false,
      code: `# Стек (LIFO) — через список
stack = []
stack.append("a")
stack.append("b")
stack.append("c")
print(stack.pop())  # c (последний)

# Очередь (FIFO) — через deque
from collections import deque
queue = deque()
queue.append("first")
queue.append("second")
print(queue.popleft())  # first`,
    },
    {
      id: 204,
      courseId: 2,
      course: "Алгоритмы и структуры данных",
      title: "Рекурсия",
      done: false,
      code: `# Рекурсия — функция вызывает сама себя
def factorial(n):
    if n <= 1:        # базовый случай
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120

# Числа Фибоначчи
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

print([fib(i) for i in range(8)])`,
    },
    {
      id: 205,
      courseId: 2,
      course: "Алгоритмы и структуры данных",
      title: "Алгоритмы сортировки",
      done: false,
      code: `# Пузырьковая сортировка
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

print(bubble_sort([64, 34, 25, 12, 22]))

# Встроенная сортировка Python
data = [3, 1, 4, 1, 5]
print(sorted(data))            # новый список
print(sorted(data, reverse=True))  # обратный порядок`,
    },
  ],
  3: [
    {
      id: 301,
      courseId: 3,
      course: "Веб-разработка с Flask",
      title: "Первое Flask-приложение",
      done: false,
      code: `from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Привет, мир!"

@app.route("/hello/<name>")
def hello(name):
    return f"Привет, {"{name}"}!"

if __name__ == "__main__":
    app.run(debug=True)
# GET /         → "Привет, мир!"
# GET /hello/Тимур → "Привет, Тимур!"`,
    },
    {
      id: 302,
      courseId: 3,
      course: "Веб-разработка с Flask",
      title: "Возврат JSON (REST API)",
      done: false,
      code: `from flask import Flask, jsonify

app = Flask(__name__)

students = [
    {"id": 1, "name": "Тимур", "grade": 95},
    {"id": 2, "name": "Анна",  "grade": 88},
]

@app.route("/api/students")
def get_students():
    return jsonify(students)

@app.route("/api/students/<int:student_id>")
def get_student(student_id):
    s = next((s for s in students if s["id"] == student_id), None)
    if s is None:
        return jsonify({"error": "не найден"}), 404
    return jsonify(s)`,
    },
    {
      id: 303,
      courseId: 3,
      course: "Веб-разработка с Flask",
      title: "Методы POST и GET",
      done: false,
      code: `from flask import Flask, request, jsonify

app = Flask(__name__)
items = []

@app.route("/api/items", methods=["GET"])
def get_items():
    return jsonify(items)

@app.route("/api/items", methods=["POST"])
def add_item():
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "нет поля name"}), 400
    items.append({"id": len(items)+1, "name": data["name"]})
    return jsonify(items[-1]), 201`,
    },
    {
      id: 304,
      courseId: 3,
      course: "Веб-разработка с Flask",
      title: "Обработка ошибок",
      done: false,
      code: `from flask import Flask, jsonify

app = Flask(__name__)

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "не найдено", "code": 404}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "ошибка сервера"}), 500

@app.route("/risky")
def risky():
    try:
        result = 10 / 0
        return jsonify({"result": result})
    except ZeroDivisionError:
        return jsonify({"error": "деление на ноль"}), 400`,
    },
    {
      id: 305,
      courseId: 3,
      course: "Веб-разработка с Flask",
      title: "Работа с параметрами запроса",
      done: false,
      code: `from flask import Flask, request, jsonify

app = Flask(__name__)

data = [{"id": i, "val": i*10} for i in range(1, 11)]

@app.route("/api/data")
def get_data():
    # GET /api/data?limit=3&offset=0
    limit  = int(request.args.get("limit", 5))
    offset = int(request.args.get("offset", 0))
    return jsonify(data[offset:offset+limit])

@app.route("/api/search")
def search():
    q = request.args.get("q", "")
    # фильтрация по строке запроса
    return jsonify([d for d in data if q in str(d["val"])])`,
    },
  ],
};

export type QuizQuestion = {
  id: number;
  courseId: number;
  lessonId: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  // Курс 1
  { id: 1, courseId: 1, lessonId: 101, question: "Какой тип данных у переменной x = 3.14?", options: ["int", "float", "str", "bool"], correct: 1, explanation: "3.14 — число с плавающей точкой, тип float." },
  { id: 2, courseId: 1, lessonId: 102, question: "Что выполнится, если условие if False?", options: ["Код внутри if", "Код в else", "Ошибка", "Ничего"], correct: 1, explanation: "При False выполняется ветка else (если она есть), блок if пропускается." },
  { id: 3, courseId: 1, lessonId: 103, question: "Что выведет range(3)?", options: ["[1,2,3]", "[0,1,2,3]", "[0,1,2]", "[1,2]"], correct: 2, explanation: "range(3) генерирует числа 0, 1, 2 — три элемента начиная с 0." },
  { id: 4, courseId: 1, lessonId: 104, question: "Как объявить функцию в Python?", options: ["function f():", "def f():", "func f():", "fun f():"], correct: 1, explanation: "Функции объявляются ключевым словом def." },
  { id: 5, courseId: 1, lessonId: 105, question: "Как добавить элемент в список?", options: ["list.add(x)", "list.push(x)", "list.append(x)", "list.insert(x)"], correct: 2, explanation: "Метод append() добавляет элемент в конец списка." },
  { id: 6, courseId: 1, lessonId: 106, question: "Какой метод удаляет пробелы по краям строки?", options: ["trim()", "strip()", "clean()", "cut()"], correct: 1, explanation: "strip() убирает пробелы (и символы переноса строки) с обоих концов." },
  // Курс 2
  { id: 7, courseId: 2, lessonId: 201, question: "Как получить значение из словаря безопасно (без KeyError)?", options: ["dict[key]", "dict.get(key)", "dict.fetch(key)", "dict.value(key)"], correct: 1, explanation: "Метод get() возвращает None (или default) если ключа нет, вместо исключения." },
  { id: 8, courseId: 2, lessonId: 202, question: "Что хранит множество (set)?", options: ["Пары ключ-значение", "Уникальные элементы", "Упорядоченные элементы", "Дубликаты"], correct: 1, explanation: "Set хранит только уникальные элементы, автоматически удаляя дубликаты." },
  { id: 9, courseId: 2, lessonId: 203, question: "Какой порядок извлечения у стека (stack)?", options: ["FIFO", "LIFO", "Случайный", "По приоритету"], correct: 1, explanation: "Стек работает по принципу LIFO — последним вошёл, первым вышел." },
  { id: 10, courseId: 2, lessonId: 204, question: "Что обязательно в рекурсивной функции?", options: ["Цикл for", "Базовый случай", "Список аргументов", "Импорт модуля"], correct: 1, explanation: "Базовый случай останавливает рекурсию, без него функция уйдёт в бесконечный цикл." },
  { id: 11, courseId: 2, lessonId: 205, question: "Сложность пузырьковой сортировки?", options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"], correct: 2, explanation: "Пузырьковая сортировка использует два вложенных цикла — сложность O(n²)." },
  // Курс 3
  { id: 12, courseId: 3, lessonId: 301, question: "Какой декоратор Flask задаёт маршрут?", options: ["@app.url()", "@app.route()", "@app.path()", "@app.get()"], correct: 1, explanation: "Декоратор @app.route() связывает URL с функцией-обработчиком." },
  { id: 13, courseId: 3, lessonId: 302, question: "Что возвращает jsonify()?", options: ["Строку", "Словарь Python", "HTTP-ответ с JSON", "Список"], correct: 2, explanation: "jsonify() создаёт Response с Content-Type application/json." },
  { id: 14, courseId: 3, lessonId: 303, question: "Каким методом читают тело POST-запроса в Flask?", options: ["request.body()", "request.get_json()", "request.data()", "request.json"], correct: 1, explanation: "request.get_json() парсит JSON из тела запроса и возвращает словарь." },
  { id: 15, courseId: 3, lessonId: 304, question: "Какой HTTP-статус означает 'ресурс не найден'?", options: ["200", "201", "400", "404"], correct: 3, explanation: "404 Not Found — сервер не нашёл запрошенный ресурс." },
  { id: 16, courseId: 3, lessonId: 305, question: "Как прочитать параметр запроса ?limit=5 во Flask?", options: ["request.param('limit')", "request.args.get('limit')", "request.query('limit')", "request.get('limit')"], correct: 1, explanation: "Параметры строки запроса (query string) доступны через request.args." },
];

// ── Практика ──────────────────────────────────────────────────────────────────

export type PracticeTask = {
  id: number;
  title: string;
  tags: string[];
  description: string;
  funcName: string;
  example: string;
  solution: string;
  tests: { input: string; expected: string; passed: boolean | null }[];
  validate: (code: string) => boolean;
};

export const practiceTasks: PracticeTask[] = [
  {
    id: 1,
    title: "Сумма списка",
    tags: ["Функции", "Циклы"],
    description: `Создайте функцию <code class="bg-gray-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono">calculate_sum</code>, которая принимает список чисел и возвращает их сумму.`,
    funcName: "calculate_sum",
    example: `numbers = [1, 2, 3, 4, 5]
print(calculate_sum(numbers))  # 15`,
    solution: `def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

numbers = [1, 2, 3, 4, 5]
print(calculate_sum(numbers))  # 15`,
    tests: [
      { input: "[1, 2, 3]", expected: "6", passed: null },
      { input: "[10, 20, 30]", expected: "60", passed: null },
      { input: "[]", expected: "0", passed: null },
    ],
    validate: (code) =>
      code.includes("def calculate_sum") &&
      (code.includes("for") || code.includes("sum")) &&
      code.includes("return"),
  },
  {
    id: 2,
    title: "Палиндром",
    tags: ["Строки", "Условия"],
    description: `Напишите функцию <code class="bg-gray-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono">is_palindrome</code>, которая возвращает <span class="font-mono">True</span>, если строка читается одинаково в обоих направлениях, иначе <span class="font-mono">False</span>.`,
    funcName: "is_palindrome",
    example: `print(is_palindrome("kayak"))  # True
print(is_palindrome("hello"))  # False
print(is_palindrome("racecar")) # True`,
    solution: `def is_palindrome(s):
    s = s.lower()
    return s == s[::-1]

print(is_palindrome("kayak"))   # True
print(is_palindrome("hello"))   # False`,
    tests: [
      { input: '"kayak"', expected: "True", passed: null },
      { input: '"hello"', expected: "False", passed: null },
      { input: '"racecar"', expected: "True", passed: null },
    ],
    validate: (code) =>
      code.includes("def is_palindrome") &&
      (code.includes("[::-1]") || code.includes("reversed") || code.includes("==")) &&
      code.includes("return"),
  },
  {
    id: 3,
    title: "Подсчёт слов",
    tags: ["Словари", "Строки"],
    description: `Создайте функцию <code class="bg-gray-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono">word_count</code>, которая принимает строку и возвращает словарь с количеством вхождений каждого слова.`,
    funcName: "word_count",
    example: `text = "apple banana apple cherry banana apple"
print(word_count(text))
# {'apple': 3, 'banana': 2, 'cherry': 1}`,
    solution: `def word_count(text):
    counts = {}
    for word in text.split():
        counts[word] = counts.get(word, 0) + 1
    return counts

text = "apple banana apple cherry"
print(word_count(text))`,
    tests: [
      { input: '"apple banana apple"', expected: "{'apple': 2, 'banana': 1}", passed: null },
      { input: '"one two three"', expected: "{'one': 1, 'two': 1, 'three': 1}", passed: null },
      { input: '""', expected: "{}", passed: null },
    ],
    validate: (code) =>
      code.includes("def word_count") &&
      (code.includes("split") || code.includes("for")) &&
      code.includes("return"),
  },
];
