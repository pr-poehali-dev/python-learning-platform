import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "courses" | "lessons" | "practice" | "about";

const courses = [
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

const lessons = [
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

const quizQuestions = [
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

const practiceTests = [
  { input: "[1, 2, 3]", expected: "6", passed: null as boolean | null },
  { input: "[10, 20, 30]", expected: "60", passed: null as boolean | null },
  { input: "[]", expected: "0", passed: null as boolean | null },
];

const practiceExample = `numbers = [1, 2, 3, 4, 5]
result = calculate_sum(numbers)
print(result)  # 15`;

const practiceSolution = `def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

numbers = [1, 2, 3, 4, 5]
print(calculate_sum(numbers))  # 15`;

export default function Index() {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem("pylearn_user"));
  const [loginInput, setLoginInput] = useState("");
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [activeLesson, setActiveLesson] = useState(lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(() => {
    const saved = localStorage.getItem("pylearn_completed");
    return saved ? new Set(JSON.parse(saved)) : new Set<number>();
  });
  const [quizCurrent, setQuizCurrent] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([null, null, null]);
  const [quizDone, setQuizDone] = useState(false);
  const [practiceCode, setPracticeCode] = useState("");
  const [testResults, setTestResults] = useState(practiceTests);
  const [checked, setChecked] = useState(false);

  const [lessonQuizAnswer, setLessonQuizAnswer] = useState<number | null>(null);

  const markLessonDone = (lessonId: number) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.add(lessonId);
      localStorage.setItem("pylearn_completed", JSON.stringify([...next]));
      return next;
    });
  };

  const handleLogin = () => {
    const name = loginInput.trim();
    if (!name) return;
    localStorage.setItem("pylearn_user", name);
    setUser(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("pylearn_user");
    setUser(null);
    setLoginInput("");
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (quizAnswers[quizCurrent] !== null) return;
    const newAnswers = [...quizAnswers];
    newAnswers[quizCurrent] = optionIdx;
    setQuizAnswers(newAnswers);
  };

  const correctCount = quizAnswers.filter((a, i) => a === quizQuestions[i]?.correct).length;

  const runTests = () => {
    const hasDef = practiceCode.includes("def calculate_sum");
    const hasLoop = practiceCode.includes("for") || practiceCode.includes("sum");
    const hasReturn = practiceCode.includes("return");
    const results = testResults.map((t) => ({ ...t, passed: hasDef && hasLoop && hasReturn }));
    setTestResults(results);
    setChecked(true);
  };

  const navItems: { key: Section; label: string; icon: string }[] = [
    { key: "home", label: "Главная", icon: "House" },
    { key: "courses", label: "Курсы", icon: "BookOpen" },
    { key: "lessons", label: "Уроки", icon: "FileCode" },
    { key: "practice", label: "Практика", icon: "Terminal" },
    { key: "about", label: "О создателе", icon: "User" },
  ];

  const lessonQuizIdx = Math.min(activeLesson.id - 1, quizQuestions.length - 1);
  const currentLessonQ = quizQuestions[lessonQuizIdx];

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-indigo-600 font-mono font-bold text-3xl tracking-tight">
              py<span className="text-gray-900">learn</span>
            </span>
            <p className="text-gray-400 text-sm mt-2">Введи своё имя, чтобы начать</p>
          </div>
          <div className="border border-gray-100 rounded-xl p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
            <input
              type="text"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Например: Тимур"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all mb-4"
              autoFocus
            />
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-ibm">
      {/* Nav */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <span className="text-indigo-600 font-mono font-bold text-lg tracking-tight">
              py<span className="text-gray-900">learn</span>
            </span>
            <span className="text-gray-300 text-xs font-mono ml-1">v1.0</span>
          </div>
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  activeSection === item.key
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon name={item.icon as string} size={15} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden sm:inline font-medium">{user}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Icon name="LogOut" size={14} />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* HOME */}
        {activeSection === "home" && (
          <div className="animate-fade-in">
            <div className="flex flex-col items-start gap-6 mb-16 pt-6">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-mono px-3 py-1.5 rounded-full border border-indigo-100">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse inline-block" />
                Учи Python шаг за шагом
              </div>
              <h1 className="text-5xl font-bold text-gray-950 leading-tight tracking-tight max-w-2xl">
                Программируй.<br />
                <span className="text-indigo-600">Проверяй.</span> Расти.
              </h1>
              <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
                Платформа для изучения Python с интерактивными уроками, автопроверкой кода и тестами.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveSection("courses")}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
                >
                  Начать обучение
                </button>
                <button
                  onClick={() => setActiveSection("practice")}
                  className="border border-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Попробовать задачу
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-16">
              {[
                { value: "3", label: "курса", sub: "от новичка до про" },
                { value: "62", label: "урока", sub: "с примерами кода" },
                { value: "120+", label: "задач", sub: "с автопроверкой" },
              ].map((s) => (
                <div key={s.label} className="border border-gray-100 rounded-xl p-6">
                  <div className="text-3xl font-bold text-gray-950 font-mono">{s.value}</div>
                  <div className="text-gray-900 font-medium mt-1">{s.label}</div>
                  <div className="text-gray-400 text-sm mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="mb-16">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Как это работает</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: "BookOpen", title: "Изучай теорию", desc: "Каждый урок — чёткое объяснение с примерами кода. Никакой воды." },
                  { icon: "Terminal", title: "Пиши код", desc: "Решай задачи прямо в браузере. Система проверит код автоматически." },
                  { icon: "CheckCircle", title: "Проходи тесты", desc: "Тесты после каждой темы помогают закрепить знания и найти пробелы." },
                ].map((f) => (
                  <div key={f.title} className="p-6 border border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all group">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                      <Icon name={f.icon as string} size={20} className="text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-950 rounded-xl overflow-hidden border border-gray-800">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="font-mono text-xs text-gray-500 ml-3">hello_python.py</span>
              </div>
              <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
                <span className="text-gray-500"># Твой первый шаг в Python{"\n"}</span>
                <span className="text-purple-400">def </span>
                <span className="text-blue-400">introduce</span>
                <span className="text-gray-300">(name, level):{"\n"}</span>
                <span className="text-gray-300">    </span>
                <span className="text-purple-400">print</span>
                <span className="text-gray-300">(</span>
                <span className="text-green-400">f"Привет, </span>
                <span className="text-yellow-300">{"{{name}}"}</span>
                <span className="text-green-400">!"</span>
                <span className="text-gray-300">){"\n"}</span>
                <span className="text-gray-300">    </span>
                <span className="text-purple-400">print</span>
                <span className="text-gray-300">(</span>
                <span className="text-green-400">f"Уровень: </span>
                <span className="text-yellow-300">{"{{level}}"}</span>
                <span className="text-green-400">"</span>
                <span className="text-gray-300">){"\n\n"}</span>
                <span className="text-gray-300">introduce(</span>
                <span className="text-green-400">"Студент"</span>
                <span className="text-gray-300">, </span>
                <span className="text-green-400">"Начинающий"</span>
                <span className="text-gray-300">){"\n"}</span>
                <span className="text-gray-500"># Привет, Студент!{"\n"}</span>
                <span className="text-gray-500"># Уровень: Начинающий</span>
              </pre>
            </div>
          </div>
        )}

        {/* COURSES */}
        {activeSection === "courses" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-950 tracking-tight">Курсы</h1>
              <p className="text-gray-500 mt-2">Выбери уровень и начни учиться прямо сейчас</p>
            </div>
            <div className="grid gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border border-gray-100 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all group cursor-pointer"
                  onClick={() => setActiveSection("lessons")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="text-xs font-medium px-2.5 py-1 rounded-full border"
                          style={{ color: course.color, borderColor: course.color + "40", backgroundColor: course.color + "10" }}
                        >
                          {course.level}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">{course.lessons} уроков · {course.duration}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-950 mb-3">{course.title}</h2>
                      <div className="flex flex-wrap gap-2">
                        {course.topics.map((t) => (
                          <span key={t} className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-md border border-gray-100 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all">
                      <Icon name="ArrowRight" size={16} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                  </div>
                  <div className="mt-5 pt-5 border-t border-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Прогресс</span>
                      <span className="text-xs font-mono text-gray-500">{course.id === 1 ? completedLessons.size : "0"}/{course.lessons}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: course.id === 1 ? `${(completedLessons.size / course.lessons) * 100}%` : "0%", backgroundColor: course.color }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LESSONS */}
        {activeSection === "lessons" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-950 tracking-tight">Уроки</h1>
              <p className="text-gray-500 mt-2">Python с нуля · Урок {activeLesson.id} из {lessons.length}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => { setActiveLesson(lesson); setLessonQuizAnswer(null); }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      activeLesson.id === lesson.id
                        ? "border-indigo-200 bg-indigo-50"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        completedLessons.has(lesson.id) ? "bg-emerald-100" : activeLesson.id === lesson.id ? "bg-indigo-100" : "bg-gray-100"
                      }`}>
                        {completedLessons.has(lesson.id) ? (
                          <Icon name="Check" size={12} className="text-emerald-600" />
                        ) : (
                          <span className="text-xs font-mono text-gray-400">{lesson.id}</span>
                        )}
                      </div>
                      <div>
                        <div className={`text-sm font-medium leading-tight ${activeLesson.id === lesson.id ? "text-indigo-900" : "text-gray-700"}`}>
                          {lesson.title}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{lesson.course}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="border border-gray-100 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-gray-950 mb-1">{activeLesson.title}</h2>
                  <p className="text-gray-500 text-sm mb-4">{activeLesson.course}</p>
                  <div className="bg-gray-950 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-800">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      <span className="font-mono text-xs text-gray-500 ml-2">example.py</span>
                    </div>
                    <pre className="p-5 text-sm font-mono text-gray-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                      {activeLesson.code}
                    </pre>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="HelpCircle" size={16} className="text-indigo-500" />
                    <span className="font-semibold text-gray-900 text-sm">Быстрый тест по уроку</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-4">{currentLessonQ.question}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {currentLessonQ.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => { if (lessonQuizAnswer === null) setLessonQuizAnswer(i); }}
                        className={`text-left p-3 rounded-lg border text-sm font-mono transition-all ${
                          lessonQuizAnswer === i
                            ? i === currentLessonQ.correct
                              ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                              : "border-red-300 bg-red-50 text-red-800"
                            : lessonQuizAnswer !== null && i === currentLessonQ.correct
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 text-gray-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {lessonQuizAnswer !== null && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <p className="text-xs text-blue-700"><strong>Объяснение:</strong> {currentLessonQ.explanation}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const idx = lessons.findIndex(l => l.id === activeLesson.id);
                      if (idx > 0) { setActiveLesson(lessons[idx - 1]); setLessonQuizAnswer(null); }
                    }}
                    disabled={activeLesson.id === lessons[0].id}
                    className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Назад
                  </button>
                  <button
                    onClick={() => {
                      markLessonDone(activeLesson.id);
                      const idx = lessons.findIndex(l => l.id === activeLesson.id);
                      if (idx < lessons.length - 1) {
                        setActiveLesson(lessons[idx + 1]);
                        setLessonQuizAnswer(null);
                      } else {
                        setActiveSection("practice");
                      }
                    }}
                    className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    {activeLesson.id === lessons[lessons.length - 1].id ? "К практике →" : "Следующий →"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRACTICE */}
        {activeSection === "practice" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-950 tracking-tight">Практика</h1>
              <p className="text-gray-500 mt-2">Решай задачи — система проверит автоматически</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-gray-100 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-full font-medium">Задача #1</span>
                    <span className="text-xs text-gray-400">Функции · Циклы</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-950 mb-3">Напишите функцию для подсчёта суммы</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Создайте функцию <code className="bg-gray-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono">calculate_sum</code>, которая принимает список чисел и возвращает их сумму.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="text-xs text-gray-400 font-mono mb-2">Пример использования:</div>
                    <pre className="text-sm font-mono text-gray-700 leading-relaxed whitespace-pre-wrap">{practiceExample}</pre>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="FlaskConical" size={15} className="text-gray-500" />
                    <span className="font-semibold text-gray-900 text-sm">Автотесты</span>
                  </div>
                  <div className="space-y-2">
                    {testResults.map((test, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 rounded-lg border text-xs font-mono transition-all ${
                          test.passed === null
                            ? "border-gray-100 bg-gray-50 text-gray-600"
                            : test.passed
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-red-200 bg-red-50 text-red-700"
                        }`}
                      >
                        <span>calculate_sum({test.input}) → {test.expected}</span>
                        <span>{test.passed === null ? "·" : test.passed ? "✓ пройден" : "✗ ошибка"}</span>
                      </div>
                    ))}
                  </div>
                  {checked && (
                    <div className={`mt-3 p-3 rounded-lg border text-xs ${
                      testResults.every(t => t.passed)
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-amber-50 border-amber-200 text-amber-700"
                    }`}>
                      {testResults.every(t => t.passed)
                        ? "🎉 Все тесты пройдены! Отличная работа."
                        : "Некоторые тесты не прошли. Проверь логику функции."}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gray-950 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      <span className="font-mono text-xs text-gray-500 ml-2">solution.py</span>
                    </div>
                    <button
                      onClick={() => setPracticeCode(practiceSolution)}
                      className="text-xs text-gray-500 hover:text-gray-300 transition-colors font-mono"
                    >
                      показать решение
                    </button>
                  </div>
                  <div className="bg-gray-950">
                    <textarea
                      value={practiceCode}
                      onChange={(e) => {
                        setPracticeCode(e.target.value);
                        setChecked(false);
                        setTestResults(practiceTests.map(t => ({ ...t, passed: null })));
                      }}
                      placeholder={"def calculate_sum(numbers):\n    # Твой код здесь\n    pass"}
                      className="w-full h-72 p-5 bg-transparent text-gray-300 font-mono text-sm resize-none outline-none leading-relaxed placeholder-gray-700"
                      spellCheck={false}
                    />
                  </div>
                </div>

                <button
                  onClick={runTests}
                  disabled={!practiceCode.trim()}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Icon name="Play" size={16} />
                  Проверить решение
                </button>

                <div className="border border-gray-100 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Brain" size={15} className="text-indigo-500" />
                    <span className="font-semibold text-gray-900 text-sm">Тест для закрепления</span>
                  </div>

                  {!quizDone ? (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-400 font-mono">Вопрос {quizCurrent + 1} / {quizQuestions.length}</span>
                        <div className="flex gap-1">
                          {quizQuestions.map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${
                              i === quizCurrent ? "bg-indigo-500" : quizAnswers[i] !== null ? "bg-gray-300" : "bg-gray-100"
                            }`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-800 text-sm font-medium mb-4">{quizQuestions[quizCurrent].question}</p>
                      <div className="space-y-2">
                        {quizQuestions[quizCurrent].options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuizAnswer(i)}
                            className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                              quizAnswers[quizCurrent] === i
                                ? i === quizQuestions[quizCurrent].correct
                                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                                  : "border-red-300 bg-red-50 text-red-800"
                                : quizAnswers[quizCurrent] !== null && i === quizQuestions[quizCurrent].correct
                                ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                                : "border-gray-100 hover:border-indigo-200 text-gray-700"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {quizAnswers[quizCurrent] !== null && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-gray-500 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                            {quizQuestions[quizCurrent].explanation}
                          </p>
                          {quizCurrent < quizQuestions.length - 1 ? (
                            <button
                              onClick={() => setQuizCurrent(c => c + 1)}
                              className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                            >
                              Следующий вопрос →
                            </button>
                          ) : (
                            <button
                              onClick={() => setQuizDone(true)}
                              className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                            >
                              Завершить тест
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-4xl font-bold text-gray-950 font-mono mb-1">{correctCount}/{quizQuestions.length}</div>
                      <p className="text-gray-500 text-sm mb-1">правильных ответов</p>
                      <p className="text-sm font-medium text-indigo-600 mb-4">
                        {correctCount === quizQuestions.length ? "Отлично! Тема усвоена." : "Повтори материал и попробуй снова."}
                      </p>
                      <button
                        onClick={() => { setQuizDone(false); setQuizCurrent(0); setQuizAnswers([null, null, null]); }}
                        className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                      >
                        Пройти заново
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <div className="animate-fade-in max-w-2xl mx-auto pt-6">
            {/* Avatar + name */}
            <div className="flex flex-col items-center text-center mb-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center mb-5 border-4 border-white shadow-md">
                <span className="text-4xl">👨‍💻</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-950 tracking-tight mb-1">Тимур Габдрахимов</h1>
              <p className="text-indigo-600 font-mono text-sm mb-3">Ученик 10б класса · Лицей № 1</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Icon name="MapPin" size={14} />
                <span>Салават, Россия</span>
              </div>
            </div>

            {/* Contacts */}
            <div className="border border-gray-100 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Контакты</h2>
              <div className="space-y-3">
                {[
                  { icon: "Mail", label: "Email", value: "sikertag@gmail.com" },
                  { icon: "MessageCircle", label: "Telegram", value: "@sikeronee" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon as string} size={14} className="text-gray-500" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">{c.label}</div>
                      <div className="text-sm text-gray-800 font-mono">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}