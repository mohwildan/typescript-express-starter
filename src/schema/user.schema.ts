import { z } from 'zod';

export class UserSchema {
  message = 'Tidak Boleh Kosong';

  public post = z.object({
    body: z.object({
      name: z.string({
        required_error: this.message,
      }),
      email: z.string({
        required_error: this.message,
      }),
    }),
  });
}
