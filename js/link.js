const raw = `

`;

const ids = raw.trim().split("\n");

const links = ids.map(id => 
`https://lh3.googleusercontent.com/d/${id}`
);

console.log(links.join("\n"));