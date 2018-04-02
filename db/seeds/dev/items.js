exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(() => {
      return Promise.all([
        knex('items').insert({
            item: 'sample item 1',
            not_packed: true
            }, 'id')
        .then(() => console.log('seeding complete'))
        .catch(error => console.log(`error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`error seeding data: ${error}`));
};
