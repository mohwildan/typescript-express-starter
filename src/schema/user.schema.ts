import { z } from 'zod';

export class UserSchema {
  public post = z.object({
    body: z.object({
      name: z.string({
        required_error: 'Tidak Boleh Kosong',
      }),
      email: z.string({
        required_error: 'Tidak Boleh Kosong',
      }),
    }),
  });
}
