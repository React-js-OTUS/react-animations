import { useRef } from "react";
import { motion } from "framer-motion";

interface ChangeHeightMotionProps {
  children: React.ReactNode;
  reanimate: string | number;
  //По дефолту, motion компонент проигрывает анимации только при маунте компонента.
  // Чтобы компонент реанимировался, нужно в него передать переменную, при изменении
  // которой он будет снова проигрывать анимацию
  initialHeight?: number | string;
  duration?: number;
  ease?: any;
  easeWithSpring?: boolean;
  delay?: number;
}

const ChangeHeightMotion = ({
  children,
  reanimate,
  initialHeight = 0, // Добавим возможность передавать начальную высоту блока и сделаем ее 0 по дефолту.
  duration = 0.5,
  ease = "linear",
  easeWithSpring = true,
  delay = 0,
}: ChangeHeightMotionProps) => {
  const motionElemRef = useRef<HTMLDivElement>(null);
  const initialHeightRef = useRef<number | string>(initialHeight);

  return (
    <motion.div
      key={reanimate}
      ref={motionElemRef}
      initial={{ height: initialHeightRef.current }} // Параметр initial содержит состояние начала анимации,
      animate={{ height: "auto" }} // а параметр animate - конца (Конечное значение высоты выставим auto - по величине контента)
      onAnimationComplete={() => {
        // Как отработает animate, запоминаем новое начальное значение отсчета высоты:
        if (motionElemRef.current) {
          initialHeightRef.current = getComputedStyle(
            motionElemRef.current
          ).height;
        }
      }}
      transition={{
        // За настройку анимации отвечает параметр transition
        // Имена и логика свойств transition коррелируют с именами css свойства transition: duration, ease, delay
        duration,
        ease,
        type: easeWithSpring ? "spring" : "tween",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ChangeHeightMotion;
