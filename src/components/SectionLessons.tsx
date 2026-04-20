import { useState } from "react";
import { courses, lessonsByCourse, quizQuestions, Section, Lesson } from "@/components/data";
import Icon from "@/components/ui/icon";

interface Props {
  activeSection: Section;
  completedLessons: Set<number>;
  markLessonDone: (id: number) => void;
  setActiveSection: (s: Section) => void;
  activeCourseId: number;
  setActiveCourseId: (id: number) => void;
}

export default function SectionLessons({
  activeSection,
  completedLessons,
  markLessonDone,
  setActiveSection,
  activeCourseId,
  setActiveCourseId,
}: Props) {
  const courseLessons = lessonsByCourse[activeCourseId] ?? [];
  const [activeLesson, setActiveLesson] = useState<Lesson>(courseLessons[0]);
  const [lessonQuizAnswer, setLessonQuizAnswer] = useState<number | null>(null);

  const currentQ = quizQuestions.find(q => q.lessonId === activeLesson?.id) ?? quizQuestions[0];
  const activeCourse = courses.find(c => c.id === activeCourseId)!;

  const switchLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setLessonQuizAnswer(null);
  };

  const switchCourse = (courseId: number) => {
    setActiveCourseId(courseId);
    const first = lessonsByCourse[courseId]?.[0];
    if (first) { setActiveLesson(first); setLessonQuizAnswer(null); }
    setActiveSection("lessons");
  };

  if (activeSection === "courses") {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-950 tracking-tight">Курсы</h1>
          <p className="text-gray-500 mt-2">Выбери уровень и начни учиться прямо сейчас</p>
        </div>
        <div className="grid gap-6">
          {courses.map((course) => {
            const cl = lessonsByCourse[course.id] ?? [];
            const done = cl.filter(l => completedLessons.has(l.id)).length;
            return (
              <div
                key={course.id}
                className="border border-gray-100 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all group cursor-pointer"
                onClick={() => switchCourse(course.id)}
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
                      <span className="text-xs text-gray-400 font-mono">{cl.length} уроков · {course.duration}</span>
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
                    <span className="text-xs font-mono text-gray-500">{done}/{cl.length}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: cl.length ? `${(done / cl.length) * 100}%` : "0%", backgroundColor: course.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-950 tracking-tight">Уроки</h1>
          <p className="text-gray-500 mt-1">{activeCourse.title}</p>
        </div>
        <div className="flex gap-2">
          {courses.map(c => (
            <button
              key={c.id}
              onClick={() => switchCourse(c.id)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                c.id === activeCourseId
                  ? "text-white border-transparent"
                  : "text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
              style={c.id === activeCourseId ? { backgroundColor: c.color, borderColor: c.color } : {}}
            >
              {c.level}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          {courseLessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => switchLesson(lesson)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeLesson?.id === lesson.id
                  ? "border-indigo-200 bg-indigo-50"
                  : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  completedLessons.has(lesson.id) ? "bg-emerald-100" : activeLesson?.id === lesson.id ? "bg-indigo-100" : "bg-gray-100"
                }`}>
                  {completedLessons.has(lesson.id) ? (
                    <Icon name="Check" size={12} className="text-emerald-600" />
                  ) : (
                    <span className="text-xs font-mono text-gray-400">{courseLessons.indexOf(lesson) + 1}</span>
                  )}
                </div>
                <div>
                  <div className={`text-sm font-medium leading-tight ${activeLesson?.id === lesson.id ? "text-indigo-900" : "text-gray-700"}`}>
                    {lesson.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{lesson.course}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {activeLesson && (
            <>
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
                <p className="text-gray-700 text-sm mb-4">{currentQ.question}</p>
                <div className="grid grid-cols-2 gap-2">
                  {currentQ.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => { if (lessonQuizAnswer === null) setLessonQuizAnswer(i); }}
                      className={`text-left p-3 rounded-lg border text-sm font-mono transition-all ${
                        lessonQuizAnswer === i
                          ? i === currentQ.correct
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : "border-red-300 bg-red-50 text-red-800"
                          : lessonQuizAnswer !== null && i === currentQ.correct
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
                    <p className="text-xs text-blue-700"><strong>Объяснение:</strong> {currentQ.explanation}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const idx = courseLessons.findIndex(l => l.id === activeLesson.id);
                    if (idx > 0) switchLesson(courseLessons[idx - 1]);
                  }}
                  disabled={activeLesson.id === courseLessons[0]?.id}
                  className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Назад
                </button>
                <button
                  onClick={() => {
                    markLessonDone(activeLesson.id);
                    const idx = courseLessons.findIndex(l => l.id === activeLesson.id);
                    if (idx < courseLessons.length - 1) {
                      switchLesson(courseLessons[idx + 1]);
                    }
                  }}
                  disabled={activeLesson.id === courseLessons[courseLessons.length - 1]?.id && completedLessons.has(activeLesson.id)}
                  className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-40"
                >
                  {activeLesson.id === courseLessons[courseLessons.length - 1]?.id
                    ? completedLessons.has(activeLesson.id) ? "✓ Курс завершён" : "Завершить курс ✓"
                    : "Следующий →"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
