// app/[lang]/funkciok/asztalterkep/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asztaltérkép & Foglaláskezelés | FoglaljOnline',
  description: 'Modern asztaltérkép nézet, napi exportálás, minden eszközön elérhető foglaláskezelés részletes információkkal.',
};

export default function AsztalTerkepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return  children;
}