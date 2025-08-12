import { useEffect, useRef, useState } from "react";
import "./index.css";

// Компонент принимает список элементов и отображает их с анимацией при появлении в области видимости
const AnimatedList = ({ items }: any) => {
  // Состояние для хранения индексов элементов, которые в данный момент видимы на экране
  const [visibleItems, setVisibleItems] = useState(new Set<number>());

  // Хранилище ссылок на <li> элементы, чтобы их можно было отслеживать через IntersectionObserver
  // useRef здесь работает как "контейнер", хранящий ссылки на элементы, без повторной отрисовки.
  const listRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // Создаем новый IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // Перебираем каждый наблюдаемый элемент
        entries.forEach((entry) => {
          // Получаем индекс элемента из data-атрибута
          const index = Number((entry.target as HTMLElement).dataset.index);

          if (entry.isIntersecting) {
            // Если элемент стал видим, добавляем его индекс в множество (в сете удобно хранить уникальные индексы видимых элементов)
            setVisibleItems((prevVisibleItems) => {
              const newSet = new Set(prevVisibleItems);
              newSet.add(index);
              return newSet;
            });
          } else {
            // Если элемент вышел из зоны видимости, удаляем его индекс из множества
            setVisibleItems((prevVisibleItems) => {
              const newSet = new Set(prevVisibleItems);
              newSet.delete(index);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1 } // 10% элемента должно быть видно, чтобы он считался "видимым"
    );

    // Подключаем observer ко всем <li> элементам, на которые есть ссылки
    listRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    // При размонтировании компонента отключаем observer
    return () => {
      listRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [items]); // Эффект будет перезапущен, если изменится массив items

  return (
    <ul>
      {items.map((item: any, index: number) => (
        <li
          key={index}
          data-index={index} // Сохраняем индекс в data-атрибуте для последующего доступа в observer
          ref={(el) => {
            // Сохраняем ссылку на DOM-элемент в массиве ссылок
            listRef.current[index] = el;
          }}
          className={`list-item ${visibleItems.has(index) ? "visible" : ""}`} // visible, если элемент находится в области видимости
        >
          {visibleItems.has(index) && item}
          {/* Отображаем содержимое только если элемент видим */}
        </li>
      ))}
    </ul>
  );
};

export default AnimatedList;
