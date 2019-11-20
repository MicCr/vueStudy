const viewsLazyload = (name) => (resolve) => require([`${name}`], resolve)

export {
  viewsLazyload
}
