import '../index.css';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Страница не найдена',
  description: 'К сожалению, такой страницы не существует',
};

export default function SlugNotFound() {
  return (
    <main className="grid place-items-center h-screen bg-gray-50 text-center p-4 font-sans">
      <div>
        <h1 className="text-8xl font-extrabold text-gray-900 mb-4 uppercase tracking-widest">
          404
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Упс… Похоже, здесь ничего нет
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}
