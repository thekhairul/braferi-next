import { useEffect, useRef } from "react";

function InfiniteLoader({ options = {}, onIntersect }) {
  const observer = useRef(null);

  useEffect(() => {
    const observerInstance = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    }, options);

    observerInstance.observe(observer.current);

    return () => {
      observerInstance.disconnect();
    };
  }, [options, onIntersect]);
  return <div ref={observer}></div>;
}

export default InfiniteLoader;
