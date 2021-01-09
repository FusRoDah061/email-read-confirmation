interface IMailConfig {
  driver: 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ses',

  defaults: {
    from: {
      email: 'allexxrodriguess@gmail.com',
      name: 'Allex do GoBarber GoStack',
    },
  },
} as IMailConfig;
