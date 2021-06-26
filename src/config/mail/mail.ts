interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: process.env.FROM_EMAIL || 'contato@apivendas.com',
      name: process.env.FROM_NAME || '[API Vendas] Contato',
    },
  },
} as IMailConfig;
