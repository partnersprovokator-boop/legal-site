"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!phone) {
      alert("Введите телефон");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          city,
          question: service || "Заявка с сайта",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setName("");
        setPhone("");
        setCity("");
        setService("");
      } else {
        alert("Ошибка отправки");
      }
    } catch {
      alert("Ошибка соединения");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 pb-28">
      <header className="border-b bg-white/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Юридическая помощь</h1>
            <p className="text-sm text-slate-500">
              Консультации и сопровождение для частных лиц и бизнеса
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+78006006435" className="text-lg font-semibold">
              8 (800) 600-64-35
            </a>

            <a href="#lead" className="bg-black text-white px-5 py-3 rounded-2xl">
              Бесплатная консультация
            </a>
          </div>
        </div>
      </header>

      <section
        id="lead"
        className="relative overflow-hidden min-h-[680px] flex items-center py-16 scroll-mt-24"
      >
        <img
          src="/hero-law.jpg"
          alt="Юридическая помощь"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="inline-block bg-white/80 border border-slate-200 rounded-full px-4 py-2 text-sm mb-6 shadow-sm">
              Профессиональные юридические услуги
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Юридическая защита
              <span className="block">для людей и бизнеса</span>
            </h2>

            <p className="text-xl text-slate-700 mb-8 leading-relaxed max-w-2xl">
              Помогаем решать судебные споры, семейные, жилищные, земельные,
              автомобильные и другие юридические вопросы — профессионально,
              быстро и с полным сопровождением.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#lead"
                className="bg-black text-white px-8 py-4 rounded-2xl text-lg"
              >
                Получить консультацию
              </a>

              <a
                href="tel:+78006006435"
                className="bg-white border border-slate-300 px-8 py-4 rounded-2xl text-lg"
              >
                Позвонить сейчас
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-xl">
              <div className="bg-white/85 rounded-2xl p-4 shadow-sm">
                <div className="text-3xl font-bold">10+ лет</div>
                <div className="text-slate-500">Практики</div>
              </div>

              <div className="bg-white/85 rounded-2xl p-4 shadow-sm">
                <div className="text-3xl font-bold">2500+</div>
                <div className="text-slate-500">Клиентов</div>
              </div>

              <div className="bg-white/85 rounded-2xl p-4 shadow-sm">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-slate-500">Поддержка</div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 rounded-3xl p-8 shadow-xl border border-slate-100">
            <h3 className="text-3xl font-bold mb-6">
              Получите консультацию юриста
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 rounded-2xl px-5 py-4 text-lg"
              />

              <input
                type="tel"
                placeholder="+7XXXXXXXXXX"
                value={phone}
                onChange={(e) => {
                  let digits = e.target.value.replace(/\D/g, "");

                  if (digits.startsWith("8") || digits.startsWith("7")) {
                    digits = digits.slice(1);
                  }

                  digits = digits.slice(0, 10);
                  setPhone(digits ? "+7" + digits : "");
                }}
                className="w-full border border-slate-300 rounded-2xl px-5 py-4 text-lg"
              />

              <input
                type="text"
                placeholder="Ваш город"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-slate-300 rounded-2xl px-5 py-4 text-lg"
              />

              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full border border-slate-300 rounded-2xl px-5 py-4 text-lg"
              >
                <option value="">Выберите ситуацию</option>
                <option>Нужна консультация</option>
                <option>Судебный спор</option>
                <option>Проблема с банком / долгами</option>
                <option>Семейный вопрос</option>
                <option>Недвижимость / жильё</option>
                <option>ДТП</option>
                <option>Работа / трудовой спор</option>
                <option>Наследство</option>
                <option>Миграция</option>
                <option>Другое</option>
              </select>

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl px-5 py-4 text-base">
                  Заявка отправлена! Юрист свяжется с вами в ближайшее время.
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold"
              >
                {loading ? "Отправка..." : "Оставить заявку"}
              </button>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16">
            Почему нам доверяют
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="text-3xl font-bold mb-2">10+ лет</div>
              <h4 className="text-xl font-semibold mb-2">Опытные юристы</h4>
              <p className="text-slate-600">
                Работаем только с проверенными специалистами с практикой от 5 лет.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="text-3xl font-bold mb-2">Россия</div>
              <h4 className="text-xl font-semibold mb-2">По всей стране</h4>
              <p className="text-slate-600">
                Подбираем юриста именно из вашего региона под конкретную задачу.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="text-3xl font-bold mb-2">5–10 мин</div>
              <h4 className="text-xl font-semibold mb-2">Быстрый отклик</h4>
              <p className="text-slate-600">
                Свяжемся с вами максимально быстро после заявки.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h3 className="text-4xl font-bold mb-4">Основные направления</h3>
            <p className="text-xl text-slate-600">
              Выберите услугу, под которую будем вести трафик
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
              <img
                src="/court.jpg"
                alt="Судебные споры"
                className="w-full h-56 object-cover"
              />
              <div className="p-8">
                <h4 className="text-2xl font-semibold mb-4">Судебные споры</h4>
                <p className="text-slate-600">
                  Представительство в суде, претензии, иски и защита интересов.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
              <img
                src="/family.jpg"
                alt="Семейное право"
                className="w-full h-56 object-cover"
              />
              <div className="p-8">
                <h4 className="text-2xl font-semibold mb-4">Семейное право</h4>
                <p className="text-slate-600">
                  Разводы, алименты, раздел имущества и споры о детях.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
              <img
                src="/business.jpg"
                alt="Бизнес и договоры"
                className="w-full h-56 object-cover"
              />
              <div className="p-8">
                <h4 className="text-2xl font-semibold mb-4">Бизнес и договоры</h4>
                <p className="text-slate-600">
                  Договоры, корпоративные вопросы и сопровождение компаний.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <img
            src="/consultation.jpg"
            alt="Работа юриста с клиентом"
            className="rounded-3xl shadow-lg w-full h-[520px] object-cover"
          />

          <div>
            <h3 className="text-4xl font-bold mb-6">Как проходит работа</h3>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-3xl p-6">
                <div className="text-sm text-slate-500 mb-2">Шаг 1</div>
                <h4 className="text-2xl font-semibold mb-2">Разбор ситуации</h4>
                <p className="text-slate-600">
                  Выясняем задачу, документы, риски и возможные сценарии.
                </p>
              </div>

              <div className="bg-slate-50 rounded-3xl p-6">
                <div className="text-sm text-slate-500 mb-2">Шаг 2</div>
                <h4 className="text-2xl font-semibold mb-2">План действий</h4>
                <p className="text-slate-600">
                  Готовим стратегию, документы, претензии или судебные материалы.
                </p>
              </div>

              <div className="bg-slate-50 rounded-3xl p-6">
                <div className="text-sm text-slate-500 mb-2">Шаг 3</div>
                <h4 className="text-2xl font-semibold mb-2">Сопровождение до результата</h4>
                <p className="text-slate-600">
                  Представляем интересы клиента и держим связь на каждом этапе.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-5xl font-bold mb-6">
            Нужна консультация юриста?
          </h3>
          <p className="text-xl text-slate-300 mb-10">
            Оставьте телефон — специалист свяжется с вами и уточнит детали.
          </p>

          <a
            href="#lead"
            className="inline-block bg-white text-black px-8 py-4 rounded-2xl text-lg font-semibold"
          >
            Оставить заявку
          </a>
        </div>
      </section>

      <div className="fixed bottom-4 left-0 right-0 z-50 px-4 md:hidden">
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur border border-slate-200 rounded-2xl shadow-xl p-3 flex gap-3">
          <a
            href="tel:+78006006435"
            className="flex-1 bg-black text-white text-center py-3 rounded-xl font-semibold active:scale-95 transition"
          >
            Позвонить
          </a>

          <a
            href="#lead"
            className="flex-1 bg-slate-100 text-slate-900 text-center py-3 rounded-xl font-semibold border border-slate-200 active:scale-95 transition"
          >
            Заявка
          </a>
        </div>
      </div>
    </div>
  );
}