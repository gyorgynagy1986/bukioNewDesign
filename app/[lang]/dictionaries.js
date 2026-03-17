
export const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  hu: () => import("./dictionaries/hu.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  de: () => import("./dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  return dictionaries[locale]
    ? await dictionaries[locale]()
    : await dictionaries["hu"]();
};

export const dictionariesFun = {
  en: () =>
    import("./dictionaries/funkciok/en.json").then((module) => module.default),
  hu: () =>
    import("./dictionaries/funkciok/hu.json").then((module) => module.default),
  es: () =>
    import("./dictionaries/funkciok/es.json").then((module) => module.default),
  de: () =>
    import("./dictionaries/funkciok/de.json").then((module) => module.default),
};

export const getDictionaryFunctions = async (locale) => {
  return dictionariesFun[locale]
    ? await dictionariesFun[locale]()
    : await dictionariesFun["hu"]();
};