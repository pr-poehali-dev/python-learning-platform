import { useState } from "react";
import { quizQuestions, practiceTests, practiceExample, practiceSolution, Section } from "@/components/data";
import Icon from "@/components/ui/icon";

interface Props {
  activeSection: Section;
}

export default function SectionPractice({ activeSection }: Props) {
  const [quizCurrent, setQuizCurrent] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([null, null, null]);
  const [quizDone, setQuizDone] = useState(false);
  const [practiceCode, setPracticeCode] = useState("");
  const [testResults, setTestResults] = useState(practiceTests);
  const [checked, setChecked] = useState(false);

  const correctCount = quizAnswers.filter((a, i) => a === quizQuestions[i]?.correct).length;

  const handleQuizAnswer = (optionIdx: number) => {
    if (quizAnswers[quizCurrent] !== null) return;
    const newAnswers = [...quizAnswers];
    newAnswers[quizCurrent] = optionIdx;
    setQuizAnswers(newAnswers);
  };

  const runTests = () => {
    const hasDef = practiceCode.includes("def calculate_sum");
    const hasLoop = practiceCode.includes("for") || practiceCode.includes("sum");
    const hasReturn = practiceCode.includes("return");
    const results = testResults.map((t) => ({ ...t, passed: hasDef && hasLoop && hasReturn }));
    setTestResults(results);
    setChecked(true);
  };

  if (activeSection === "about") {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto pt-6">
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
    );
  }

  return (
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
  );
}
