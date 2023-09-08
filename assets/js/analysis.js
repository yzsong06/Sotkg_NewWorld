// RTheme v3 - analysis.js(统计脚本)
// 注：此脚本仅用于模板用途

function initAnalytics() {
    // 可选Umami/百度统计
    // 使用哪个，取消注释哪个，并修改相关配置信息

    umamiAnalytics();
    // baiduAnalysis();
}

function umamiAnalytics() {
    if (docCookies.getItem('settingEnableUmamiAnalytics') == 'false') {
        return false;
    }
    (function () {
        addEvent(getUmamiEventList());
        var umami = document.createElement('script');
        // 如果使用Umami，将下方848f2596-81ce-4c69-a91c-5c78ad85915b替换为你的site id
        umami.setAttribute('data-website-id', '06be3bd3-bdaf-4c6f-af8e-2115863261e2');
        if (docCookies.getItem('settingEnableUmamiCache') == 'true') {
            umami.setAttribute('data-cache', 'true');
        }
        // 更改下方src为你的umami统计脚本位置
        umami.src = 'https://umami.sotkg.cn/script.js';
        var an = document.getElementsByTagName('script')[0];
        an.parentNode.insertBefore(umami, an);
    })();
}

function baiduAnalysis() {
    if (docCookies.getItem('settingEnableBaiduTongji') == 'true') {
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement('script');
            // 修改以下src为你的baidu统计脚本中的路径
            hm.src = 'https://hm.baidu.com/hm.js?dbfc04c30a6804002416a339a4023685';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }
}

function addEvent(list) {
    if (docCookies.getItem('settingEnableUmamiEvents') == 'false') {
        return false;
    }
    list.forEach((item) => {
        document.querySelector(item[0]).setAttribute('data-umami-event', item[1]);
    });
}

function getUmamiEventList() {
    return [
        ['#avatar',
            'header-头像'],
        ['#toggle',
            'ui-菜单按钮'],
        ['#infobar-toggle',
            'ui-信息栏按钮'],
        ['#icon-about',
            'footer-关于'],
        ['#icon-github',
            'footer-Github'],
        ['#icon-rss',
            'footer-RSS'],
        ['#icons-right',
            'footer-消息栏'],
        ['#email',
            'menu-邮箱'],
        ['#icon-swap',
            'menu-切换服务器'],
        ['#icon-color',
            'menu-切换颜色'],
        ['#icon-music',
            'menu-音乐栏'],
        ['#icon-fullscreen',
            'menu-全屏'],
        ['#icon-setting',
            'menu-设置'],
        ['#icon-share',
            'menu-分享'],
    ];
}

function getRealTimeVisitors(mode = 'return') {
    // Umami 实时访客API，按需接入
    // 接入后，注释下方的return false
    // return false


    let site = 'https://umami.sotkg.cn';

    // 你的共享链接Token
    let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3ZWJzaXRlSWQiOiIwNmJlM2JkMy1iZGFmLTRjNmYtYWY4ZS0yMTE1ODYzMjYxZTIiLCJpYXQiOjE2OTQxNTY1MTl9.Zv0NfZEuMV4B2Js8jy5JIiBGY4cC5ukb8byKG4Oxq7g';

    // 你的站点idAPI
    let apiURL = site + '/api/websites/06be3bd3-bdaf-4c6f-af8e-2115863261e2/active';
    fetch(apiURL, {
        headers: {
            'x-umami-share-token': token,
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (isLayoutMenuOpen() && mode == 'switch') {
            return switchMessageBarContent(structureOnlineVistor(data[0].x));
        }
        if (mode == 'return') {
            return data[0].x;
        }
    });
}

function getPageVisitors(url = window.location.pathname) {
    return new Promise((resolve, reject) => {
        let apiURL = `https://umami.api.sotkg.cn/pageview?url=${url}`;
        fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            resolve(data);
        });
    }).catch((err) => {
        throw err;
    });
}

function loadUptime() {
    // Uptime API， 可自行部署，仓库: https://github.com/RavelloH/uptime-api-route
    if (docCookies.getItem('settingEnableUptime') == 'false') {
        return false;
    }
    if (typeof uptimeData == 'undefined') {
        return new Promise((resolve, reject) => {
            let site = 'https://uptime.api.sotkg.cn';
            fetch(site, {})
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
                uptimeData = data;
            });
        }).catch((err) => {
            throw err;
        });
    } else {
        return Promise.resolve(uptimeData);
    }
}