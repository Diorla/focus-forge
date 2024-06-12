interface JsonObject {
  [key: string]: any;
  updatedAt?: number;
}

function getLatest(json1: JsonObject, json2: JsonObject): boolean {
  const date1 = new Date(json1["updatedAt"] || 0);
  const date2 = new Date(json2["updatedAt"] || 0);
  return date1 >= date2;
}

export default function mergeObj<type>(
  json1: type & JsonObject,
  json2: type & JsonObject
): JsonObject & type {
  const merged: JsonObject = {};

  const allKeys = new Set([...Object.keys(json1), ...Object.keys(json2)]);

  allKeys.forEach((key) => {
    if (key in json1 && key in json2) {
      if (
        typeof json1[key] === "object" &&
        !Array.isArray(json1[key]) &&
        typeof json2[key] === "object" &&
        !Array.isArray(json2[key])
      ) {
        // recursion for nested object
        merged[key] = mergeObj(json1[key], json2[key]);
      } else if (Array.isArray(json1[key]) && Array.isArray(json2[key])) {
        // merge two arrays
        merged[key] = Array.from(new Set([...json1[key], ...json2[key]]));
      } else {
        // select the latest key
        merged[key] = getLatest(json1, json2) ? json1[key] : json2[key];
      }
    } else if (key in json1) {
      // key is missing in json2
      merged[key] = json1[key];
    } else {
      // key is missing in json1
      merged[key] = json2[key];
    }
  });

  return merged as JsonObject & type;
}
