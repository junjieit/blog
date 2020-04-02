// https://stackoverflow.com/questions/43638454/webpack-typescript-image-import

declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.md" {
  const value: any;
  export default value;
}