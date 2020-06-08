const view = {
  // apply only if clicked link contains `.cta`
  // custom: ({ current, next, trigger }) => trigger.classList && trigger.classList.contains('cta'),

  // do leave and enter concurrently
  sync: false,

  // available hooks…
  beforeAppear(props) {
    log("Before Appear:", props);
  },
  appear(props) {
    log("Appear:", props);
  },
  afterAppear(props) {
    log("After Appear:", props);
  },
  beforeLeave(props) {
    log("Before Leave:", props);
  },
  leave(props) {
    log("Leave:", props);
  },
  afterLeave(props) {
    log("After Leave:", props);
  },
  beforeEnter(props) {
    log("Before Enter:", props);
  },
  enter(props) {
    log("Enter:", props);
  },
  afterEnter(props) {
    log("After Enter:", props);
  }
};

export default [
  {
    name: "barba",
    ...view
  }
];
