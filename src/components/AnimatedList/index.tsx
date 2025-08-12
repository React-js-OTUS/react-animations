import { useEffect, useRef, useState } from "react";
import "./index.css";

const AnimatedList = ({ items }: any) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const listRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting) {
            setVisibleItems(
              (prevVisibleItems) => new Set(prevVisibleItems.add(index))
            );
          } else {
            setVisibleItems((prevVisibleItems) => {
              const newVisibleItems = new Set(prevVisibleItems);
              newVisibleItems.delete(index);
              return newVisibleItems;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    listRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      listRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [items]);

  return (
    <ul>
      {items.map((item: any, index: any) => (
        <li
          key={index}
          data-index={index}
          ref={(el) => {
            listRef.current[index] = el;
          }}
          className={`list-item ${
            visibleItems.has(index as any) ? "visible" : ""
          }`}
        >
          {visibleItems.has(index) && item}
        </li>
      ))}
    </ul>
  );
};

export default AnimatedList;
