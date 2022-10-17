let output;
  
const setOutput = (rows) => {
    output = rows;
    console.log("output", output);
}
     let filter=req.body;
     console.log(filter);

     let query =
     "SELECT * FROM pets WHERE " +
     "pet IN (" + filter.pet.map(pet => `'${pet}'`).join() + ") " +
     "AND species IN (" + filter.species.map(species => `'${species}'`).join() + ") " +
     "AND sex IN (" + filter.sex.map(sex => `'${sex}'`).join() + ")" +
     "AND age IN (" + filter.age.map(age => `'${age}'`).join() + ")" +
     "AND breed IN (" + filter.breed.map(breed => `'${breed}'`).join() + ")" +
     "AND size IN (" + filter.size.map(size => `'${size}'`).join() + ")" +
     "AND temperment IN (" + filter.temperment.map(temperment => `'${temperment}'`).join() + ")" +
     "AND color IN (" + filter.color.map(color => `'${color}'`).join() + ")" +
     "AND other IN (" + filter.other.map(other => `'${other}'`).join() + ")";

     db.query(query, (err, rows) => {
      if (err) {
          console.log("internal error", err);
          return;
      }
      setOutput(rows);
  });
