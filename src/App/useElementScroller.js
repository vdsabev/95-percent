import { useLayoutEffect, useRef, useState } from 'react'

const useElementScroller = ({ previousElementRef, nextElementRef }) => {
  const [count, setCount] = useState(0)
  const previousCountRef = useRef(count)
  useLayoutEffect(() => {
    const element = (count > previousCountRef.current
      ? nextElementRef
      : previousElementRef
    ).current
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    previousCountRef.current = count
  }, [count, previousElementRef, nextElementRef])

  return {
    scrollToPrevious() {
      setCount((state) => state - 1)
    },
    scrollToNext() {
      setCount((state) => state + 1)
    },
  }
}

export default useElementScroller
