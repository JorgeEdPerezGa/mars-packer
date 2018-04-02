module.exports = {
  development: {
      client: 'pg',
      connection: 'postgres://localhost/mars_packer',
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds/dev'
      },
      useNullAsDefault: true
    },
    test: {
        client: 'pg',
        connection: 'postgres://localhost/mars_packer_test',
        migrations: {
          directory: './db/migrations'
        },
        seeds: {
          directory: './db/seeds/test'
        },
        useNullAsDefault: true
      }
};