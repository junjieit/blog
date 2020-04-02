export interface directory {
  id: string;
  level: number;
  text: string;
  childrens?: directory[];
}