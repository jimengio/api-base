declare module "*.edn" {
  const value: {
    locales: {
      [k: string]: {
        zhCN: string;
        enUS: string;
      };
    };
  };
  export default value;
}
