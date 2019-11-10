const viewsLazyload = (name) => (resolve) => require([`views/${name}`], resolve)

export {
  viewsLazyload
}