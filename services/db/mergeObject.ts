export default function mergeObject<type>(
  baseObject: type,
  newObject: Partial<type>
): type {
  const finalObject = { ...baseObject, ...newObject };

  for (const key in finalObject) {
    finalObject[key] = finalObject[key] || baseObject[key];
  }
  return finalObject;
}
