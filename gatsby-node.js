const readingTime = require(`reading-time`);

function slugify(title) {
    let slug = title.replace(/[ .,_/]/g, "-").toLowerCase();
    slug = slug.replace(/['#`!?]/g, "");
    slug = slug.replace(/å/g, "aa");
    slug = slug.replace(/æ/g, "ae");
    slug = slug.replace(/ø/g, "o");

    // Removed duplicate '-'
    for (let i = 0; i < slug.length; i++) {
        if (slug[i] === "-") {
            let j = i;
            while (slug[j] === "-") {
                j++;
            }
            slug = slug.substring(0, i + 1) + slug.substring(j, slug.length);
        }
    }
    return slug;
}

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `Mdx`) {
        createNodeField({
            node, name: `timeToRead`, value: readingTime(node.body)
        });
        createNodeField({
            node, name: `slug`, value: slugify(node.frontmatter.title)
        });
    }
};
