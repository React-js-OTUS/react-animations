// Находим все изображения с классом .lazy-image, которые нужно лениво загрузить
const lazyImages = document.querySelectorAll(".lazy-image");

/**
 * Колбэк-функция, которая вызывается каждый раз, когда
 * один из отслеживаемых элементов пересекает границу области видимости (viewport или root)
 *
 * @param {IntersectionObserverEntry[]} entries - массив объектов с данными о пересечении
 * @param {IntersectionObserver} observer - сам наблюдатель (для управления подписками)
 */
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    // Проверяем, находится ли элемент в зоне видимости
    if (entry.isIntersecting) {
      console.log("Пользователь почти докрутил до картинки!");

      // Загружаем изображение, подставляя настоящий src из data-src
      entry.target.src = entry.target.dataset.src;

      // Прекращаем наблюдение за этим элементом, он нам больше не нужен
      observer.unobserve(entry.target);
    }
  });
};

/**
 * Настройки IntersectionObserver:
 *
 * - root: Элемент, внутри которого происходит наблюдение (по умолчанию это viewport).
 * - rootMargin: Отступы от root'а, задаются в синтаксисе как у CSS margin.
 *               Используются, чтобы "заранее" поймать элемент до его появления.
 * - threshold: Порог видимости — от 0 до 1.
 *              0 — достаточно одного пикселя, чтобы сработал,
 *              1 — элемент должен полностью оказаться в зоне видимости.
 */
const options = {
  root: null, // window — область просмотра по умолчанию
  rootMargin: "0px 0px 75px 0px", // добавим снизу "подушку", чтобы заранее подгружать картинки
  threshold: 0, // срабатывает, как только элемент появляется в области видимости
};

// Создаём экземпляр наблюдателя с заданными настройками
const observer = new IntersectionObserver(callback, options);

// Подключаем наблюдение ко всем найденным изображениям
lazyImages.forEach((image) => observer.observe(image));
