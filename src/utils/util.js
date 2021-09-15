
export function toggleTimelineCurrentClass(newItem) {
  const classes = document.getElementsByClassName("progress")
  for (let c of classes) {
    c.classList.remove("current");
  }
  document.getElementsByClassName(newItem)[0].classList.add("current");
}
