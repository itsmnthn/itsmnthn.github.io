const INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
const IDLE_FALLBACK_MS = 6_000;

type IdleWindow = Window & {
  cancelIdleCallback?: (handle: number) => void;
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
};

export default defineNuxtPlugin(() => {
  const { initialize } = useGtag();

  let idleCallbackId: number | undefined;
  let initialized = false;
  let timeoutId: number | undefined;

  const idleWindow = window as IdleWindow;

  const triggerInitialize = () => {
    if (initialized) {
      return;
    }

    initialized = true;
    teardown();
    initialize();
  };

  const teardown = () => {
    for (const eventName of INTERACTION_EVENTS) {
      window.removeEventListener(eventName, triggerInitialize);
    }

    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
      timeoutId = undefined;
    }

    if (idleCallbackId !== undefined && typeof idleWindow.cancelIdleCallback === "function") {
      idleWindow.cancelIdleCallback(idleCallbackId);
      idleCallbackId = undefined;
    }
  };

  for (const eventName of INTERACTION_EVENTS) {
    window.addEventListener(eventName, triggerInitialize, {
      once: true,
      passive: true,
    });
  }

  if (typeof idleWindow.requestIdleCallback === "function") {
    idleCallbackId = idleWindow.requestIdleCallback(triggerInitialize, {
      timeout: IDLE_FALLBACK_MS,
    });
  }

  timeoutId = window.setTimeout(triggerInitialize, IDLE_FALLBACK_MS);
});
