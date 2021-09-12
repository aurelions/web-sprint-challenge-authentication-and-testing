exports.seed = function(knex) {
      // Deletes ALL existing entries
      return knex('users').del()
        .then(function () {
          // Inserts seed entries
          return knex('users').insert([
            {username: 'ryan', password: 'password'},
            {username: 'ryan1', password: 'drowssap'},
            {username: 'ryan2', password: 'password1234'},
          ]);
        });
    };