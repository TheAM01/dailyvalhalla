function buildPost(socket) {

    const urx = new URL(window.location.href);
    const post = (urx.pathname.split('/')[2]);

    socket.emit('get_post', {url: window.location.href, post: post});

    socket.on('get_post', response => {
        // console.log(response.content);
        let contentHeads = [];
        let anchors = [];

        let date = document.getElementById("date");
        let title = document.getElementById("title");
        let author = document.getElementById("author");
        let thumbnail = document.getElementById("thumbnail");

        const anchorCollectionDiv = document.getElementById("anchor_collection");
        const contentDiv = document.getElementById("content");

        date.innerHTML = response.time
        title.innerHTML = response.title;
        author.innerHTML = response.credits.author.name;
        author.setAttribute("href", response.credits.author.url);
        thumbnail.setAttribute("src", response.image);

        const content = response.content;
        const headings = Object.keys(content);
        
        headings.forEach((h, n) => {

            const heading = document.createElement("div");
            heading.setAttribute("class", "content_heading");
            heading.setAttribute("id", `${n+1}`);
            heading.innerHTML = h;

            const postContent = document.createElement("div");
            postContent.setAttribute("id",`post_content_${n+1}`);
            postContent.innerHTML = content[h];

            const anchor = document.createElement("a");
            anchor.setAttribute("class", "heading_anchor")
            anchor.setAttribute("href", `#${n+1}`);
            anchor.innerHTML = h;

            contentHeads.push(heading);
            contentHeads.push(postContent);
            anchors.push(anchor);


        })

        contentHeads.forEach(e => {
            contentDiv.appendChild(e);
        });

        anchors.forEach(e => {
            anchorCollectionDiv.appendChild(e);
        })

    })
}

//  <a class="related_posts" href="#">
    //  <img src="https://images.unsplash.com/photo-1599009434802-ca1dd09895e7?w=500&q=60" alt="" class="related_posts_thumbnail">
    //  <span class="related_posts_title">Innovative Technology Offers Hope for Treating Chronic Pain</span>
    //  <span class="related_posts_author">Abdul</span>
//  </a>

function getRelatedPosts(socket) {
    socket.emit("related_posts");
    socket.on("related_posts", (data) => {

        const related = document.getElementById("related");

        data.forEach(i => {
            const anchor = document.createElement("a");
            anchor.setAttribute("class", "related_posts");
            anchor.setAttribute("href", i.url);

            const img = document.createElement("img");
            img.setAttribute("src", i.thumbnail);
            img.setAttribute("class", "related_posts_thumbnail");
            img.setAttribute("alt", "phase");

            const title = document.createElement("span");
            title.setAttribute("class", "related_posts_title");
            title.innerHTML = i.title;

            const author = document.createElement("span");
            author.setAttribute("class", "related_posts_author");
            author.innerHTML = i.author;

            anchor.appendChild(img);
            anchor.appendChild(title);
            anchor.appendChild(author);

            related.appendChild(anchor)

        })
    })
}

function addNewHeading() {
    
    const form = document.getElementById("content_groups");

    const am = document.getElementsByClassName("heading_content_group").length;

    const div = document.createElement("div");
    div.setAttribute("class", "heading_content_group");

    const heading = document.createElement("input");
    heading.setAttribute("type", "text");
    heading.setAttribute("id", `post_content_heading_${am + 1}`);
    heading.setAttribute("name", `heading_${am+1}`);
    heading.setAttribute("placeholder", "Heading");
    heading.setAttribute("class", "std_input input_heading")


    const content = document.createElement("input");
    content.setAttribute("type", "text");
    content.setAttribute("id", `post_content_content_${am + 1}`);
    content.setAttribute("name", `content_${am+1}`);
    content.setAttribute("placeholder", "Content");
    content.setAttribute("class", "std_input input_content")

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", "remove_field");
    button.setAttribute("onclick", "removeHeading(this)");
    button.innerHTML = "x"

    div.appendChild(heading);
    div.appendChild(content);
    div.appendChild(button)

    form.appendChild(div);

}

function removeHeading(element) {
    const className = element.parentElement.className;

    const elements = document.getElementsByClassName(className);
    const remover = elements[elements.length-1]
    remover.remove()
}