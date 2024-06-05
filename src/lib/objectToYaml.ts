// utils/objectToYaml.js
import yaml from "js-yaml";

export function objectToYaml(obj: { [key: string]: number | string }) {
  try {
    if (Object.keys(obj).length < 1) return;
    const newObj: { [key: string]: number | string | string[] } = {};

    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      newObj[i + 1] =
        typeof obj[keys[i]] == "number" ? String.fromCharCode(65 + (obj[keys[i]] as number)) : (obj[keys[i]] as string);
    }
    // newObj[2] = ["A", "B", "C"];
    const yamlData = yaml.dump(newObj);

    return yamlData;
  } catch (e) {
    console.error("Error converting object to YAML:", e);
    return null;
  }
}
