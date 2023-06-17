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

}

export default socket