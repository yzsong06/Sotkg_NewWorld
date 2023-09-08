const Feed = require('feed').Feed;
const fs = require('fs');

const dataFilePath = '../assets/data/search.json';
const storagePath = '../feed/';
const siteDomain = 'https://sotkg.cn';
const authorINFO = {
    name: '一只鬆',
    email: 'yzsong06@outlook.com',
    link: 'https://sotkg.cn/',
};

function HTMLDecode(str) {
    var s = '';
    if (str.length == 0) return '';
    s = str.replace(/&amp;/g, '&');
    s = s.replace(/&lt;/g, '<');
    s = s.replace(/&gt;/g, '>');
    s = s.replace(/&nbsp;/g, ' ');
    s = s.replace(/&#39;/g, "'");
    s = s.replace(/&quot;/g, '"');
    s = s.replace(/<br\/>/g, '\n');
    return s;
}

const feed = new Feed({
    title: "Sotkg's Blog / 一只鬆の小站",
    description: 'RSS - 博客文章订阅更新',
    id: 'http://sotkg.cn/',
    link: 'http://sotkg.cn/',
    language: 'zh',
    image: 'https://sotkg.cn/assets/images/avatar.jpg',
    favicon: 'https://sotkg.cn/favicon.ico',
    copyright: `Copyright © 2022 - ${new Date().getFullYear()} Yzsong06. All rights reserved.`,
    generator: 'https://github.com/RavelloH/local-feed-generation',
    feedLinks: {
        json: 'https://sotkg.cn/feed/feed.json',
        atom: 'https://sotkg.cn/feed/atom.xml',
        rss: 'https://sotkg.cn/feed/rss.xml',
    },
    author: authorINFO,
});

const posts = fs.readFileSync(dataFilePath, 'utf-8');
JSON.parse(posts).forEach((post) => {
    feed.addItem({
        title: post.name,
        id: post.url,
        link: siteDomain + post.url,
        content: HTMLDecode(post.context),
        author: authorINFO,
        date: new Date(post.time),
        titleList: post.title,
        tag: post.tag,
        category: post.class,
        classification: post.class,
        image: post.img[0] ? siteDomain + post.img[0] : null,
    });
});

fs.writeFileSync(storagePath + 'rss.xml', feed.rss2());
fs.writeFileSync(storagePath + 'atom.xml', feed.atom1());
fs.writeFileSync(storagePath + 'feed.json', feed.json1());
