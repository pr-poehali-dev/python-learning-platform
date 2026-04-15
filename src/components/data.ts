export type Section = "home" | "courses" | "lessons" | "practice" | "about";

export const courses = [
  {
    id: 1,
    title: "Python с нуля",
    level: "Начинающий",
    lessons: 24,
    duration: "12 часов",
    color: "#4F46E5",
    topics: ["Переменные", "Условия", "Циклы", "Функции"],
  },
  {
    id: 2,
    title: "Алгоритмы и структуры данных",
    level: "Средний",
    lessons: 18,
    duration: "9 часов",
    color: "#0891B2",
    topics: ["Списки", "Словари", "Стек", "Сортировки"],
  },
  {
    id: 3,
    title: "Веб-разработка с Flask",
    level: "Продвинутый",
    lessons: 20,
    duration: "10 часов",
    color: "#059669",
    topics: ["REST API", "Маршруты", "Шаблоны", "БД"],
  },
];

export const lessons = [
  {
    id: 1,
    course: "Python с нуля",
    title: "Переменные и типы данных",
    done: true,
    code: `# Переменные в Python
name = "Анна"
age = 25
height = 1.68
is_student = True

print(f"Привет, {"{name}"}!")
print(f"Возраст: {"{age}"} лет")`,
  },
  {
    id: 2,
    course: "Python с нуля",
    title: "Условные операторы",
    done: true,
    code: `# if / elif / else
temperature = 22

if temperature > 30:
    print("Жарко!")
elif temperature > 20:
    print("Тепло и приятно")
else:
    print("Прохладно")`,
  },
  {
    id: 3,
    course: "Python с нуля",
    title: "Циклы: for и while",
    done: false,
    code: `# Цикл for
fruits = ["яблоко", "банан", "вишня"]

for fruit in fruits:
    print(f"Фрукт: {"{fruit}"}")

# Цикл while
count = 0
while count < 5:
    print(count)
    count += 1`,
  },
  {
    id: 4,
    course: "Python с нуля",
    title: "Функции",
    done: false,
    code: `# Создание функций
def greet(name, greeting="Привет"):
    return f"{"{greeting}"}, {"{name}"}!"

print(greet("Мир"))
print(greet("Python", "Здравствуй"))`,
  },
];

export const quizQuestions = [
  {
    id: 1,
    question: "Какой тип данных у переменной x = 3.14?",
    options: ["int", "float", "str", "bool"],
    correct: 1,
    explanation: "3.14 — это число с плавающей точкой, тип float.",
  },
  {
    id: 2,
    question: "Что выведет print(type(True))?",
    options: ["<class 'str'>", "<class 'int'>", "<class 'bool'>", "<class 'float'>"],
    correct: 2,
    explanation: "True и False — логические значения типа bool.",
  },
  {
    id: 3,
    question: "Как правильно создать список в Python?",
    options: ["list = (1, 2, 3)", "list = {1, 2, 3}", "list = [1, 2, 3]", "list = <1, 2, 3>"],
    correct: 2,
    explanation: "Список в Python создаётся с помощью квадратных скобок [ ].",
  },
];

export const practiceTests = [
  { input: "[1, 2, 3]", expected: "6", passed: null as boolean | null },
  { input: "[10, 20, 30]", expected: "60", passed: null as boolean | null },
  { input: "[]", expected: "0", passed: null as boolean | null },
];

export const practiceExample = `numbers = [1, 2, 3, 4, 5]
result = calculate_sum(numbers)
print(result)  # 15`;

export const practiceSolution = `def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

numbers = [1, 2, 3, 4, 5]
print(calculate_sum(numbers))  # 15`;
