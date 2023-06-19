import fs from "fs"

function socket(socket, io, dir) {

    socket.on('get_post', (data) => {
        
        const file = fs.readFileSync(`${dir}/Public/Posts/${data.post}.json`, {encoding: 'utf8'});
        const post = JSON.parse(file);

        io.to(socket.id).emit("get_post", post);
        
    });

    socket.on("related_posts", (data) => {

        const files = fs.readdirSync(dir + '/Public/Posts');
        const arr = [];

        files.forEach(file => {
            const f = fs.readFileSync(`${dir}/Public/Posts/${file}`, {encoding: 'utf8'});
            console.log(f)
            const data = JSON.parse(f)

            arr.push({
                title: data.title,
                thumbnail: data.image,
                author: data.credits.author.name,
                url: data.url
            });

        });

        io.to(socket.id).emit("related_posts", arr);

    });

    socket.on("load_home", () => {
        const users = [
            {
                name: "Mueed",
                url: "/users/Mueed",
                posts: [
                    "america-unveils-revolutionary-plan-to-replace-fast-food-with-fast-healthcare",
                    "china-unveils-ambitious-plan-to-harness-suns-power-with-giant-sunglasses",
                    "googoo-gaga",
                    "new-study-shows-positive-effects-of-exercise-on-mental-health"
                ]
            },
            {
                name: "Mueed2",
                url: "/users/Mueed2",
                posts: [
                    "america-unveils-revolutionary-plan-to-replace-fast-food-with-fast-healthcare",
                    "china-unveils-ambitious-plan-to-harness-suns-power-with-giant-sunglasses",
                ]
            }
        ]
        io.to(socket.id).emit("load_home", users);
    });

    socket.on("latest", () => {
        const files = fs.readdirSync(dir + "/Public/Posts");
        const obj = {};

        files.forEach(f => {

            const post = JSON.parse(fs.readFileSync(`${dir}/Public/Posts/${f}`));

            obj[post.timeInMs] = {
                title: post.title,
                author: post.credits.author.name,
                thumbnail: post.image || post.thumbnail,
                url: post.url,
                headings: Object.keys(post.content)
            };

        });

        io.to(socket.id).emit("latest", obj)
    })

}



export default socket