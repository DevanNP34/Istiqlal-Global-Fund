const raw = `
	i|1VKyqLkpC2iWSeao_unNF3LEAd6d9vfU5
`;

const ids = raw
.trim()
.split("\n")
.map(i => i.trim());

const imageExtensions = ["img", "photo", "image"]; 

const links = ids.map(id => {

    // videos
    if (id.startsWith("v")) {
        const clean = id.replace("v|", "");
        return `vid:https://drive.google.com/file/d/${clean}/preview`;
    }
    // default assume image
    const clean2 = id.replace("i|", "");
    return `img:https://lh3.googleusercontent.com/d/${clean2}`;

});

console.log(links.join("\n"));