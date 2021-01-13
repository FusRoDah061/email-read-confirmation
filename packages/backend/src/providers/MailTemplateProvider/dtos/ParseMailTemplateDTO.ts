interface TemplateVariables {
  [key: string]: string | number | undefined;
}

export default interface ParseMailTemplateDTO {
  file: string;
  variables: TemplateVariables;
}
