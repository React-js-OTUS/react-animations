import { useRef } from "react";
import { motion } from "framer-motion";

interface ChangeHeightMotionProps {
  children: React.ReactNode; // Контент, который будет обёрнут анимацией изменения высоты
  reanimate: string | number; // Ключ, при изменении которого будет заново проигрываться анимация
  initialHeight?: number | string; // Начальная высота (по умолчанию 0)
  duration?: number; // Длительность анимации
  ease?: any; // Функция сглаживания (easing)
  easeWithSpring?: boolean; // Включить ли "пружинную" анимацию (по умолчанию true)
  delay?: number; // Задержка перед началом анимации
}

// Компонент, оборачивающий children и анимирующий изменение высоты блока
const ChangeHeightMotion = ({
  children,
  reanimate,
  initialHeight = 0,
  duration = 0.5,
  ease = "linear",
  easeWithSpring = true,
  delay = 0,
}: ChangeHeightMotionProps) => {
  // Ссылка на DOM-элемент motion.div
  const motionElemRef = useRef<HTMLDivElement>(null);

  // Сохраняем последнюю зафиксированную высоту между рендерами
  const initialHeightRef = useRef<number | string>(initialHeight);

  return (
    <motion.div
      key={reanimate} // Ключ гарантирует, что анимация будет проигрываться при изменении reanimate
      ref={motionElemRef} // Присваиваем ref для доступа к DOM-элементу
      initial={{ height: initialHeightRef.current }} // Начальная высота анимации
      animate={{ height: "auto" }} // Анимируем до полной высоты содержимого
      onAnimationComplete={() => {
        // После завершения анимации фиксируем новую высоту как стартовую
        if (motionElemRef.current)
          initialHeightRef.current = getComputedStyle(
            motionElemRef.current
          ).height;
      }}
      transition={{
        // Настройки анимации
        duration, // Длительность
        ease, // Тип easing-функции
        type: easeWithSpring ? "spring" : "tween", // Тип анимации: "пружина" или "плавная"
        delay, // Задержка перед запуском
      }}
    >
      {children} {/* Вставляем переданные внутрь компонента элементы */}
    </motion.div>
  );
};

export default ChangeHeightMotion;
