module.exports = docs => {
  const resourceReducer = (obj, item) => {
    if (!obj[item.kind]) {
      obj[item.kind] = {};
    }

    obj[item.kind][item.metadata.name] = item;

    if (item.spec.resourcetemplates) {
      const { resourcetemplates } = item.spec;
      const subResources = resourcetemplates
        .filter(item => item.kind !== "undefined")
        .reduce(resourceReducer, {});

      return Object.assign({}, obj, subResources);
    }
    return obj;
  };

  return docs
    .filter(item => item.kind !== "undefined")
    .reduce(resourceReducer, {});
};
