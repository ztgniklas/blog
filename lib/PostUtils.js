import fs from "fs";
import path from "path";
import matter from "gray-matter";
import md5 from "md5";
import {remark} from "remark";
import html from 'remark-html';
import {JSDOM} from 'jsdom';

const postsDirectory = path.join(process.cwd(), "public/posts");

export async function getSortedPostsData() {
    // Get file names under /posts
    let fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = await Promise.all(fileNames.filter(fileName => !fs.statSync(postsDirectory + '/' + fileName).isDirectory()).map(async (fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, "");
        return await getPostData(id);
    }));
    // Sort posts by date
    return allPostsData.sort(({date: a}, {date: b}) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents, {excerpt_separator: '<!--more-->'});

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    let contentHtml = processedContent.toString();
    contentHtml = addPathToImage(contentHtml, id);
    const processedExcerpt = await remark()
        .use(html)
        .process(matterResult.excerpt);
    const excerptHtml = processedExcerpt.toString();
    // Combine the data with the id
    return {
        id,
        contentHtml: contentHtml,
        excerptHtml: excerptHtml,
        ...matterResult.data
    };
}

function stringToHTML(str) {
    return new JSDOM(str).window.document.body;
};

function addPathToImage(html, path) {
    let doc = stringToHTML(html);
    let imgs = doc.getElementsByTagName('img');
    for (let img of imgs) {
        if (!img.attributes.src) {
            continue;
        }
        let src = img.attributes.src.value;
        img.setAttribute('src', path + '/' + src);
    }
    return doc.innerHTML;
}
