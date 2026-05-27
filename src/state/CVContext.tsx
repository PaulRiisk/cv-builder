// provides the CV document and dispatch to the whole app
// state and dispatch are split into two contexts so components that only
// dispatch don't re-render when the doc changes

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type { CVDocument } from "../types";
import { createDefaultDocument } from "../defaults";
import { cvReducer, type Action } from "./reducer";
import { loadFromLocalStorage, saveToLocalStorage } from "./persistence";

type Dispatch = (action: Action) => void;

const CVStateContext = createContext<CVDocument | null>(null);
const CVDispatchContext = createContext<Dispatch | null>(null);

// hydrate from localStorage if available, otherwise start fresh
function initDocument(): CVDocument {
  return loadFromLocalStorage() ?? createDefaultDocument();
}

export function CVProvider({ children }: { children: ReactNode }) {
  const [doc, dispatch] = useReducer(cvReducer, undefined, initDocument);

  // debounce-save the doc on every change so we don't hammer localStorage
  const saveTimer = useRef<number | null>(null);
  useEffect(() => {
    if (saveTimer.current !== null) {
      window.clearTimeout(saveTimer.current);
    }
    saveTimer.current = window.setTimeout(() => {
      saveToLocalStorage(doc);
    }, 300);
    return () => {
      if (saveTimer.current !== null) {
        window.clearTimeout(saveTimer.current);
      }
    };
  }, [doc]);

  return (
    <CVStateContext.Provider value={doc}>
      <CVDispatchContext.Provider value={dispatch}>
        {children}
      </CVDispatchContext.Provider>
    </CVStateContext.Provider>
  );
}

// hooks throw if used outside the provider so we fail loud, not silent
export function useCV(): CVDocument {
  const ctx = useContext(CVStateContext);
  if (!ctx) throw new Error("useCV must be used inside <CVProvider>");
  return ctx;
}

export function useCVDispatch(): Dispatch {
  const ctx = useContext(CVDispatchContext);
  if (!ctx) throw new Error("useCVDispatch must be used inside <CVProvider>");
  return ctx;
}
