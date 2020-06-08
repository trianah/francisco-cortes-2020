window.log = () => {}; // eslint-disable-line no-multi-assign
// eslint-disable-next-line no-unused-expressions
if (process.env.NODE_ENV === "development") {
  window.log = console.log; // eslint-disable-line
}
