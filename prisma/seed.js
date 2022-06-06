const client = require("./client");
const { faker } = require("@faker-js/faker")

const generateUsers = (count) => {
    var id = 1;
    var users = new Array(count);
    for (var i = 0; i < count; i++) {
        users[i] = { id: id++, email: faker.internet.email(), nom: faker.name.findName(), password: faker.internet.password(), role: i % 2 == 0 ? "AUTHOR" : "ADMIN" }
    }
    return users
}

const generateArticles = (count, userMax) => {
    var id = 1;
    var articles = new Array(count);
    for (var i = 0; i < count; i++) {
        articles[i] = {
            id: id++,
            authorId: faker.datatype.number({
                'min': 1,
                'max': userMax
            }),
            contenu: faker.random.words(70),
            titre: faker.random.words(20),
            image: faker.image.animals()
        }
    }
    return articles;
}

async function seed() {
    console.log("deleting tables content")
    await client.utilisateur.deleteMany();
    await client.article.deleteMany();
    console.log("done.")
    const users = generateUsers(100)
    const articles = generateArticles(1000, 100);
    console.log("seeding users")
    await client.utilisateur.createMany({ data: users })
    console.log("done.")
    console.log("seeding articles")
    await client.article.createMany({ data: articles })
    console.log("done.")

}

seed()
    .catch((e) => {
        console.log(e);
    })
    .finally(async () => {
        await client.$disconnect();
    });