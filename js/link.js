const raw = `
	i|1l9zml-evY56A5Axnh3aZIzWSBiqZcOuN
i|1JzMqQhvizY82MB8JhINmTyMgz7WNp5cc
i|17nP3yGfj9iThQTqK6v4a5KIUSppvi4XI
i|1JDW4KdLH34RV2-H2LoqJ_fRGeNhHb8oM
i|1lFAP3zDo-cUmF3V54pdbNsAb1h6VVxAg
i|1n5vP2DcKDlv7dBuiSXMN2RkqxKsNWFH9
i|16aw6zwNQFHSWDWz16RhL5m_FiwNX7rKn
i|1vp2g6oS_l4ghPefKwnOCHm4Fq0a5pQ-E
i|1L8bEqyg5pbQkZ4Avj1NH0Pmy2Zy5aDhJ
i|195BYY7yb6akQEyt5FiP8hnY5jwUJV8Ci
i|12DkyNPDzDHk45Ti_m75_c9tgPAgczKyY
i|1HsE9TB9rzw3-QWLopsCeG2ToacFqzDR4
i|1cpcm6psdqDgxyampnpV3v3XUYmHxpLuI
i|1or6Tx8BjvVGRCj0EwPhIYuPI4sXJBaLt
i|1UxHCo1widzkJEy7JDbRSYZeogYkkIpoM
i|1dBGhkAlMBCNLb_tI85YExqgACAGzattC
i|1OPg5PdTemGqSAoGb2LStxp0gbIdfleXr
i|1ZtQp7jIeG1MZ2NyD3BXAQT3KB5TOKCBW
i|1GllJFJf3vNayPlAuNEXibOsnRoDSHXeJ
i|1a1QVk32nybcPEXOTJWhrPqPLFQg6EoRK
i|10Tmw9BoKSFxTtSNnjTGv__ffwLXDqg9-
i|1mESoC9nMNzLQLMq3bbglALHlBwsjHn-W
i|1pfWLGj_iGzci8IB0nctsPJm_nF36n9i7
i|1VXWVs48LnZX44-9y4BhRFjGJ2zW-sRph
i|1EZ7L7zNU6KEEcaaS5udtPCnyeKv9seRF
i|1dTkS--56B9RjR_HvDEyD7ddnBTUYyAMq
i|1JNrrPxbVMLE4Ejww5lrxcZafhayyh9Wj
`;

const ids = raw
.trim()
.split("\n")
.map(i => i.trim());

const imageExtensions = ["img", "photo", "image"]; // fallback keywords

const links = ids.map(id => {

    // If you label videos with "vid:" prefix
    if (id.startsWith("v")) {
        const clean = id.replace("v|", "");
        return `vid:https://drive.google.com/file/d/${clean}/preview`;
    }
    const clean2 = id.replace("i|", "");
    // default assume image
    return `img:https://lh3.googleusercontent.com/d/${clean2}`;

});

console.log(links.join("\n"));