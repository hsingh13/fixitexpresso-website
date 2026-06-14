(function() {
    var styles = '' +
        '.sidebar-nav-wrap{position:fixed;top:0;left:0;z-index:1600;}' +
        '.sidebar-hamburger{position:fixed;top:20px;left:20px;width:40px;height:30px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;background:rgba(44,62,80,0.9);padding:8px;border-radius:8px;transition:all 0.3s ease;box-shadow:0 4px 15px rgba(0,0,0,0.2);box-sizing:content-box;z-index:1700;}' +
        '.sidebar-hamburger:hover{background:rgba(44,62,80,1);transform:scale(1.05);}' +
        '.sidebar-hamburger span{width:100%;height:3px;background:#fff;border-radius:2px;transition:all 0.3s ease;display:block;}' +
        '.sidebar-hamburger.active span:nth-child(1){transform:rotate(45deg) translate(6px,6px);}' +
        '.sidebar-hamburger.active span:nth-child(2){opacity:0;}' +
        '.sidebar-hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(8px,-8px);}' +
        '.sidebar-menu{position:fixed;top:0;left:-300px;width:280px;height:100vh;background:linear-gradient(135deg,#2c3e50 0%,#34495e 100%);transition:left 0.3s ease;padding-top:80px;box-shadow:2px 0 10px rgba(0,0,0,0.3);overflow-y:auto;z-index:1500;}' +
        '.sidebar-menu.active{left:0;}' +
        '.sidebar-menu ul{list-style:none;padding:0;margin:0;}' +
        '.sidebar-menu li{border-bottom:1px solid rgba(255,255,255,0.1);}' +
        '.sidebar-menu a{display:block;color:#fff;text-decoration:none;padding:18px 30px;font-weight:500;font-size:16px;font-family:Arial,Helvetica,sans-serif;transition:all 0.3s ease;position:relative;white-space:nowrap;}' +
        '.sidebar-menu a:hover{background:rgba(255,255,255,0.1);padding-left:40px;color:#3498db;}' +
        '.sidebar-menu a.current{background:rgba(52,152,219,0.15);color:#3498db;}' +
        '.sidebar-menu a::before{content:"";position:absolute;left:0;top:0;height:100%;width:4px;background:#3498db;transform:scaleY(0);transition:transform 0.3s ease;}' +
        '.sidebar-menu a:hover::before,.sidebar-menu a.current::before{transform:scaleY(1);}' +
        '.sidebar-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1400;opacity:0;visibility:hidden;transition:all 0.3s ease;}' +
        '.sidebar-overlay.active{opacity:1;visibility:visible;}' +
        '@media (max-width:768px){' +
            '.sidebar-hamburger{top:15px;left:15px;width:35px;height:26px;padding:6px;}' +
            '.sidebar-menu{width:250px;left:-250px;padding-top:70px;}' +
            '.sidebar-menu a{padding:16px 25px;font-size:15px;}' +
        '}' +
        '@media (max-width:480px){' +
            '.sidebar-hamburger{top:10px;left:10px;width:32px;height:24px;padding:5px;}' +
            '.sidebar-hamburger span{height:2px;}' +
            '.sidebar-menu{width:220px;left:-220px;padding-top:60px;}' +
            '.sidebar-menu a{padding:14px 20px;font-size:14px;}' +
        '}';

    var styleEl = document.createElement('style');
    styleEl.setAttribute('data-sidebar-nav', '');
    styleEl.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleEl);

    var links = [
        { href: 'index.html', label: 'Home' },
        { href: 'common-turbochef-problems.html', label: 'Common TurboChef Problems' },
        { href: 'common-merrychef-problems.html', label: 'Common MerryChef Problems' },
        { href: 'reviews.html', label: 'Reviews' },
        { href: 'faq.html', label: 'FAQ' },
        { href: 'contact.html', label: 'Contact' }
    ];

    var path = window.location.pathname.split('/').pop() || 'index.html';

    var ul = document.createElement('ul');
    for (var i = 0; i < links.length; i++) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = links[i].href;
        a.textContent = links[i].label;
        if (links[i].href === path) a.className = 'current';
        li.appendChild(a);
        ul.appendChild(li);
    }

    var wrap = document.createElement('div');
    wrap.className = 'sidebar-nav-wrap';

    var hamburger = document.createElement('div');
    hamburger.className = 'sidebar-hamburger';
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    hamburger.setAttribute('tabindex', '0');
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    var menu = document.createElement('nav');
    menu.className = 'sidebar-menu';
    menu.setAttribute('aria-label', 'Main navigation');
    menu.appendChild(ul);

    var overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';

    function toggle() {
        var open = !menu.classList.contains('active');
        menu.classList.toggle('active', open);
        hamburger.classList.toggle('active', open);
        overlay.classList.toggle('active', open);
        hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    }

    function close() {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
    }

    hamburger.addEventListener('click', toggle);
    hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') close();
    });

    function mount() {
        wrap.appendChild(hamburger);
        wrap.appendChild(menu);
        document.body.appendChild(wrap);
        document.body.appendChild(overlay);
    }

    if (document.body) {
        mount();
    } else {
        document.addEventListener('DOMContentLoaded', mount);
    }
})();
