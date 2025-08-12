import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import AnimatedList from "./components/AnimatedList";

const getText = (i: number) =>
  [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis ut felis ut feugiat. Aliquam mattis velit quis nulla faucibus bibendum. Vestibulum finibus tincidunt mollis. Vestibulum ac dui ullamcorper, tempus odio porttitor, vehicula dolor. Donec quis velit sit amet purus consequat volutpat. Mauris laoreet posuere sodales. Nulla odio dolor, accumsan iaculis ornare sit amet, varius vel dui. Quisque nec nulla sed lectus congue consequat. Ut lacinia pretium lectus et interdum. Donec orci purus, sollicitudin in bibendum nec, sodales at urna. Ut ac est porta, luctus urna in, suscipit nibh. Quisque pretium cursus tellus id placerat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at sem vel nibh sodales ullamcorper vel bibendum justo. Maecenas vel justo porta, volutpat sapien ut, pretium metus. Nulla condimentum mi velit, feugiat lacinia dui pellentesque vel. Vivamus quis vulputate quam, sit amet tempor ante. Donec condimentum magna sit amet tellus tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin elementum ligula fermentum vehicula aliquet. Vivamus non elit finibus, lobortis nunc nec, mattis quam. Etiam sit amet pellentesque neque, quis ornare nibh. Proin vitae tortor vestibulum, efficitur metus ac, elementum odio. Suspendisse nisl nisl, volutpat ac turpis at, semper eleifend nunc. In vitae ultrices justo, sit amet rhoncus justo.\nProin euismod diam a tincidunt feugiat. Sed mollis purus vel dolor dignissim posuere. Aliquam viverra neque justo, ut mattis ante finibus ut. Nunc ac erat ante. Curabitur porttitor nisl in sapien fermentum, feugiat accumsan urna pulvinar. Ut at egestas sapien. Sed feugiat nibh nisi. Duis congue et dui non dignissim. Cras a convallis quam.",
    "Proin euismod diam a tincidunt feugiat. Sed mollis purus vel dolor dignissim posuere. Aliquam viverra neque justo, ut mattis ante finibus ut. Nunc ac erat ante. Curabitur porttitor nisl in sapien fermentum, feugiat accumsan urna pulvinar. Ut at egestas sapien. Sed feugiat nibh nisi. Duis congue et dui non dignissim. Cras a convallis quam.",
  ][i] ?? "";

const App = () => {
  const [activeIdx, setActiveIdx] = useState(-1);
  const text = getText(activeIdx);
  const items = Array.from({ length: 120 }, (_, index) => `Item ${index + 1}`);

  return (
    <>
      <div className="app">
        <div className="wrap">
          {activeIdx !== -1 && <Card text={text} idx={activeIdx} />}
          <button
            className={activeIdx !== -1 ? "has-margin" : ""}
            onClick={() => setActiveIdx((prev) => (prev < 2 ? prev + 1 : 0))}
          >
            {activeIdx === -1 ? "Start" : "Next"}
          </button>
        </div>
      </div>

      <>
        <h1>Intersection Observer API in React</h1>
        <p>Scroll down to see the animations......</p>
        <AnimatedList items={items} />
      </>
    </>
  );
};

export default App;

// import AnimatedList from "./components/AnimatedList";
// // import AnimatedList from "./components/animatedList";

// const App = () => {
//   const items = Array.from({ length: 120 }, (_, index) => `Item ${index + 1}`);
//   return (
//     <div>
//       <h1>Intersection Observer API in React</h1>
//       <p>Scroll down to see the animations......</p>
//       <AnimatedList items={items} />
//     </div>
//   );
// };

// export default App;
