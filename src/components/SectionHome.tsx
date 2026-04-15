import { Section } from "@/components/data";
import Icon from "@/components/ui/icon";

interface Props {
  setActiveSection: (s: Section) => void;
}

export default function SectionHome({ setActiveSection }: Props) {
  return (
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
  );
}
