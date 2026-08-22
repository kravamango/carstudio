const fs = require('fs');
const path = require('path');

const carsPath = path.join(__dirname, '../frontend/data/cars.json');
const cars = JSON.parse(fs.readFileSync(carsPath, 'utf-8'));

async function fetchPhoto(brand, model, gen) {
  const query = encodeURIComponent(brand + ' ' + gen);
  const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + query + '&prop=pageimages&format=json&pithumbsize=500&redirects=1&origin=*';

  try {
    const res = await fetch(url);
    const json = await res.json();
    const pages = json.query?.pages;
    const page = pages ? Object.values(pages)[0] : null;

    if (page?.thumbnail?.source) {
      return page.thumbnail.source;
    }
    return null;
  } catch (error) {
    console.log('Ошибка запроса:', error.message);
    return null;
  }
}

async function main() {
  let updated = 0;
  let skipped = 0;

  for (const car of cars) {
    for (const model of car.models) {
      if (!model.generations) continue;

      for (const gen of model.generations) {
        if (gen.photo) continue;

        const photo = await fetchPhoto(car.brand, model.name, gen.gen);
        if (photo) {
          gen.photo = photo;
          updated++;
          console.log('✅ ' + car.brand + ' ' + model.name + ' ' + gen.gen);
        } else {
          skipped++;
          console.log('❌ ' + car.brand + ' ' + model.name + ' ' + gen.gen);
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }

  fs.writeFileSync(carsPath, JSON.stringify(cars, null, 2), 'utf-8');
  console.log('\nГотово! Обновлено: ' + updated + ', без фото: ' + skipped);
}

main();
