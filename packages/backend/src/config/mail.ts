interface MailConfig {
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
  smtp: {
    host?: string;
    port?: number;
    user?: string;
    password?: string;
  };
}

export default {
  defaults: {
    from: {
      email: 'allexxrodriguess@gmail.com',
      name: 'Allex Rodrigues',
    },
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  }
} as MailConfig;
