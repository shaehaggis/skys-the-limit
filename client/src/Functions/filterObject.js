export function filterObject(object) {
    let filteredObject = object.filter((item) => item.checked);
    filteredObject.forEach((object) => {
      delete object["checked"];
    });
  
    return filteredObject;
};