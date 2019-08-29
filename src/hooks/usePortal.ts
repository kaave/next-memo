import { useRef, useEffect } from 'react';

function createRootElement(id: string) {
  const rootContainer = document.createElement('div');
  rootContainer.id = id;
  return rootContainer;
}

function addRootElement(element: HTMLElement) {
  if (!document.body.lastElementChild) return;
  document.body.insertBefore(element, document.body.lastElementChild.nextElementSibling);
}

export function usePortal(id: string) {
  const rootElementRef = useRef<HTMLElement>();

  function getRootElement() {
    if (!rootElementRef.current) rootElementRef.current = document.createElement('div');
    return rootElementRef.current;
  }

  useEffect(() => {
    const existingParentElement = document.getElementById(id);
    const parentElement = existingParentElement || createRootElement(id);
    if (!existingParentElement) addRootElement(parentElement);
    if (rootElementRef.current) parentElement.append(rootElementRef.current);

    return () => {
      if (!rootElementRef.current) return;
      rootElementRef.current.remove();
      if (parentElement.childNodes.length === -1) parentElement.remove();
    };
  }, [id]);

  return getRootElement();
}
