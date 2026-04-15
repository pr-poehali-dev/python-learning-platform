import { useState } from "react";
import { Section } from "@/components/data";
import Icon from "@/components/ui/icon";
import SectionHome from "@/components/SectionHome";
import SectionLessons from "@/components/SectionLessons";
import SectionPractice from "@/components/SectionPractice";

export default function Index() {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem("pylearn_user"));
  const [loginInput, setLoginInput] = useState("");
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(() => {
    const saved = localStorage.getItem("pylearn_completed");
    return saved ? new Set(JSON.parse(saved)) : new Set<number>();
  });

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

  const navItems: { key: Section; label: string; icon: string }[] = [
    { key: "home", label: "Главная", icon: "House" },
    { key: "courses", label: "Курсы", icon: "BookOpen" },
    { key: "lessons", label: "Уроки", icon: "FileCode" },
    { key: "practice", label: "Практика", icon: "Terminal" },
    { key: "about", label: "О создателе", icon: "User" },
  ];

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
        {activeSection === "home" && (
          <SectionHome setActiveSection={setActiveSection} />
        )}

        {(activeSection === "courses" || activeSection === "lessons") && (
          <SectionLessons
            activeSection={activeSection}
            completedLessons={completedLessons}
            markLessonDone={markLessonDone}
            setActiveSection={setActiveSection}
          />
        )}

        {(activeSection === "practice" || activeSection === "about") && (
          <SectionPractice activeSection={activeSection} />
        )}
      </main>
    </div>
  );
}
