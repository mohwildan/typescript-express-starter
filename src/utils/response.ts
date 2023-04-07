import { Response } from 'express';
import { isJsonString, malform } from './helper';

export class ResponseData {
  /* Response failed */
  public failed = async (
    value: any,
    messages: string,
    res: Response
  ): Promise<any> => {
    let parse: any, data: any;

    try {
      const isJson = isJsonString(value);
      if (value && isJson) {
        parse = JSON.parse(value);
        value = await malform(
          '{' + parse[0].path.slice(1) + ':' + parse[0].message + '}'
        );
      }

      data = {
        status: 400,
        validation: value || {},
        data: {},
        message: messages,
      };
    } catch (error) {
      console.log(error);
    }
    res.statusCode = 400;
    res.send(data);
  };

  /* Response Success */
  public success = async (
    values: any,
    messages: string,
    res: Response
  ): Promise<any> => {
    let data: any;

    try {
      data = {
        status: 200,
        validation: {},
        data: values || {},
        message: messages,
      };
    } catch (error) {
      console.log(error);
    }

    res.statusCode = 200;
    res.send(data);
  };
}
