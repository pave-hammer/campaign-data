exports.up = function(knex, Promise) {
  // Create a table
  return knex.schema.createTable('data', table => {
    table.increments()
    table.string('name').notNullable().defaultsTo('')
    table.text('description').notNullable().defaultsTo('')
    table.string('affiliations').notNullable().defaultsTo('')
  })

  // ...and another
  .createTable('ranks', table => {
    table.increments()
    table.integer('org_id').notNullable().references('id').inTable('data').index()
    table.string('name').notNullable().defaultsTo('')
    table.text('description').notNullable().defaultsTo('')
  })

  // Then query the table...
  .then(function() {
    // Deletes ALL existing entries
    return knex('data').del()
      .then(function () {
        return knex('data').insert([
          {id: 1, name: "The Carinhall", description: "Fifty years before the war between gods came to it's conclusion, The Carinhall was established, appropriately named after the founding hunter Dahn Carin, and has become the epicenter for temporary contracted work and hunting of the fiercest beasts known. Any citizen wishing work to be done, whether it be dangerous beast or transporting goods, can come to The Carinhall and offer reward for services rendered. Carinhall Members receive access to special missions hosting significantly more dangerous prey. Members can be identified by a magical branding on the shoulders, the symbol of the Lyall. Contracts are magically bound to the hunter who accepted the contract and any other Carinhall member that poaches a bound contract is subject to expulsion from the guild and/or death. Two massive tree trunks fifteen feet in diameter make the pillars of the Grand Archway that leads to the main hall. Immediately after walking in, you'll notice a fire pit directly in the center of the hall, surrounded by massive stone slabs resting on boulders forming a three-quarter circular table around the twenty foot tall blaze. Smoke billows into the open air through a vent hole in the ceiling some one hundred and fifty feet up. Carinhall members, triumphant from the hunt, will host feasts at this table for any wishing to celebrate."},
          {id: 2, name: "Infinite Arcanum", description: "Overview and History: All of the realms greatest mages fought during the War between Gods. They saw the incursion of demons, devils, and lich firsthand and were rightly terrified that the spawn of the Betrayer Gods could ever return to the realm. It was clear the celestial gate did not wholly prevent the supernatural from infringing upon the world. These mages of X'yllisan are charged with preventing future incursions and trying to avoid the many mistakes made during the war. Considering this, Erimel Ervanion, a High Elven Assemblyman who is well studied within the Lyceum and a well-respected arcanist, called to the realm’s most trusted and capable mages, and together they formed a private society called the Infinite Arcanum in AA-990. The chief priority of these powerful arcane specialists is to maintain the “Truth of Magic,” a strict code enacted to never again allow the rampant misuse of magic that was seen in the war. General members are referred to as “Guides,” while the higher circle of members who deal in judgment and oversight are called “Makers.” Membership is largely kept secret unless out of necessity, though the existence of the order is relatively common knowledge. Anyone found to be practicing magic is logged and checked up on routinely, as misuse of magic is grounds for arrest, judgment by the Makers, and punishment outside of the local law. Even so, their reach and oversight are not without limits, and many dark and terrible dealings still manage to go unseen."},
          {id: 3, name: "The Alabaster Lyceum", description: "The imposing white buildings at the center of Tirgonde that stands before you is home to the largest gathering of written forms of knowledge in the land. Many, from all walks of life, call the Lyceum home and learn everything they can of history, politics, and business. Some users of the arcane rely on their patron deity for power; others still develop their arcane skill by seeking admission to the Alabaster Lyceum, where they can study the theory and apllication of magic in a controlled environment."}
        ]);
      });
  })

  // ...and using the insert id, insert into the other table.
  .then(function(rows) {
    // Deletes ALL existing entries
    return knex('ranks').del()
      .then(function () {
        return knex('ranks').insert([
          {id: 1, org_id: 1, name: "The Gerolf", description: "The Grandmaster. There is only one, the title, respect, and authority is given to anyone that can bring in a trophy from a hunt that is equal to or greater than the current leaders most prestigious trophy. The Gerolf and the Challenger will then be given a hunt each to complete on their own. They are given 3 days to complete the hunt. Should both succeed, they will fight in hand to hand combat until only one stands. If one falls at any point in time, the survivor wins. If both fail, the most senior Lyall takes over until unseated."},
          {id: 2, org_id: 1, name: "Lyall", description: "Full members of the Carinhall. Lyalls have access to Rank SS, Rank S, Rank A, Rank B, and Rank C contracts going through the guild with no restriction. Lyalls are responsible for maintaining the Hall, it's facilities and services along with other administrative tasks. These are usually reserved for the Lyalls that are not fit for combat, but have not outlived their usefulness and are generally very well respected. Lyalls on active hunting status will sponsor and mentor one Wolf and two Initiate."},
          {id: 3, org_id: 1, name: "Wolf", description: "Title given to a teams most senior Initiate. An Wolf is usually just as capable as the Lyall, reaching the advanced stages of training. They are primarily responsible for any additional or corrective training any Initiates may need. An Wolf has access to Rank B and C contracts. If a Wolf takes a higher ranking hunt, they may include all, any, or none of their Initiates, magically binding them to the contract as well. A Wolf may only become a Lyall if their Lyall either becomes the Gerolf, dies, or transfers to an inactive status. Additionally, if a Wolf is able to provide proof of worthy and successful hunt, the Gerolf may promote that Wolf to Lyall."},
          {id: 4, org_id: 1, name: "Initiate", description: "Initiate are still given the guild brand though they are only allowed to complete Rank C contracts. In order to become an Initiate, a prospective member must prove proficiency with hunting in general. For example, if a person were to bring the hide of a recently killed bear, can prove they were the one responsible for the kill, they will be presented to the Gerolf for approval. If the Gerolf believes a person to be capable, they will be assigned to a Lyall that will oversee an official guild hunt. Should the aspiring Initiate succeed in completing the task given, they will be ceremoniously branded and welcomed as an officially and permanently assigned to a Lyall."},
          {id: 5, org_id: 2, name: "Arch Maker", description: "No data available"},
          {id: 6, org_id: 2, name: "Maker", description: "No data available"},
          {id: 7, org_id: 2, name: "Guide", description: "No data available"},
        ]);
      });
  })

  // Query both of the rows.
  .then(function() {
    return knex('data')
      .join('ranks', 'data.id', 'ranks.org_id')
      .select('data.name as name', 'ranks.name as rank', 'ranks.description as description');
  })

  // .map over the results
  .map(function(row) {
    console.log(row);
  })

  // Finally, add a .catch handler for the promise chain
  .catch(function(e) {
    console.error(e);
  }); 
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ranks').dropTable('data');
};