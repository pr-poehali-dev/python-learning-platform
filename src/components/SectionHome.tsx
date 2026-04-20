import { courses, lessonsByCourse, Section } from "@/components/data";
import Icon from "@/components/ui/icon";

interface Props {
  setActiveSection: (s: Section) => void;
  setActiveCourseId: (id: number) => void;
  completedLessons: Set<number>;
}

export default function SectionHome({ setActiveSection, setActiveCourseId, completedLessons }: Props) {
  const totalLessons = Object.values(lessonsByCourse).flat().length;
  const totalCompleted = Object.values(lessonsByCourse).flat().filter(l => completedLessons.has(l.id)).length;

  const openCourse = (courseId: number) => {
    setActiveCourseId(courseId);
    setActiveSection("lessons");
  };

  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <div className="flex flex-col items-start gap-6 mb-14 pt-6">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-mono px-3 py-1.5 rounded-full border border-indigo-100">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse inline-block" />
          3 курса · {totalLessons} уроков · 3 задачи
        </div>
        <h1 className="text-5xl font-bold text-gray-950 leading-tight tracking-tight max-w-2xl">
          Программируй.<br />
          <span className="text-indigo-600">Проверяй.</span> Расти.
        </h1>
        <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
          Платформа для изучения Python — от переменных до Flask API. Интерактивные уроки, автопроверка кода и тесты.
        </p>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setActiveSection("courses")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
          >
            Все курсы
          </button>
          <button
            onClick={() => setActiveSection("practice")}
            className="border border-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Практика
          </button>
        </div>
      </div>

      {/* Progress bar (if started) */}
      {totalCompleted > 0 && (
        <div className="mb-10 p-5 border border-indigo-100 bg-indigo-50/60 rounded-xl flex items-center gap-5">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <Icon name="TrendingUp" size={18} className="text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-gray-900">Твой прогресс</span>
              <span className="text-sm font-mono text-indigo-600">{totalCompleted} / {totalLessons} уроков</span>
            </div>
            <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all"
                style={{ width: `${(totalCompleted / totalLessons) * 100}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setActiveSection("lessons")}
            className="flex-shrink-0 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Продолжить →
          </button>
        </div>
      )}

      {/* Courses preview */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Курсы</h2>
          <button
            onClick={() => setActiveSection("courses")}
            className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
          >
            Все курсы →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => {
            const cl = lessonsByCourse[course.id] ?? [];
            const done = cl.filter(l => completedLessons.has(l.id)).length;
            return (
              <button
                key={course.id}
                onClick={() => openCourse(course.id)}
                className="text-left p-5 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all group"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: course.color + "18" }}
                >
                  <Icon
                    name={course.id === 1 ? "Code" : course.id === 2 ? "GitBranch" : "Globe"}
                    size={18}
                    style={{ color: course.color }}
                  />
                </div>
                <div
                  className="text-xs font-medium px-2 py-0.5 rounded-full border inline-block mb-2"
                  style={{ color: course.color, borderColor: course.color + "40", backgroundColor: course.color + "10" }}
                >
                  {course.level}
                </div>
                <h3 className="font-semibold text-gray-950 mb-1 text-sm leading-snug">{course.title}</h3>
                <p className="text-xs text-gray-400 mb-3">{cl.length} уроков · {course.duration}</p>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: cl.length ? `${(done / cl.length) * 100}%` : "0%", backgroundColor: course.color }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs text-gray-400 font-mono">{done}/{cl.length}</span>
                  <Icon name="ArrowRight" size={13} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Path */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Путь обучения</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "01", icon: "BookOpen", color: "text-indigo-600", bg: "bg-indigo-50", title: "Изучай теорию", desc: "Каждый урок — чёткое объяснение с примерами кода. Никакой воды." },
            { step: "02", icon: "Terminal", color: "text-cyan-600", bg: "bg-cyan-50", title: "Пиши и проверяй", desc: "Решай задачи прямо в браузере — система проверит автоматически." },
            { step: "03", icon: "Brain", color: "text-emerald-600", bg: "bg-emerald-50", title: "Закрепляй тестами", desc: "Тест после каждой темы помогает найти пробелы и закрепить знания." },
          ].map((f) => (
            <div key={f.step} className="p-6 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all group relative overflow-hidden">
              <span className="absolute top-4 right-5 text-4xl font-bold font-mono text-gray-50 select-none">{f.step}</span>
              <div className={`w-10 h-10 ${f.bg} rounded-lg flex items-center justify-center mb-4`}>
                <Icon name={f.icon as string} size={20} className={f.color} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Code demo */}
      <div className="bg-gray-950 rounded-xl overflow-hidden border border-gray-800">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="font-mono text-xs text-gray-500 ml-3">hello_python.py</span>
          <span className="ml-auto text-xs text-gray-600 font-mono">Начинающий · Урок 1</span>
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
  );
}
