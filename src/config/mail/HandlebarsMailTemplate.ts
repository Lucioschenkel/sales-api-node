import handlebars from 'handlebars';
import { promises as fs } from 'fs';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.readFile(file, 'utf8');
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
