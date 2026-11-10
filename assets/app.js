(function() {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            var isOpen = mobileMenu.classList.toggle('open');
            hamburger.textContent = isOpen ? '\u2715' : '\u2630';
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        mobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                hamburger.textContent = '\u2630';
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    var themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        var sunPath = 'M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4l1.4-1.4m10-10 1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z';
        var moonPath = 'M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5z';

        function currentTheme() {
            return document.documentElement.dataset.theme
                || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }

        function paint() {
            var dark = currentTheme() === 'dark';
            themeToggle.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="' + (dark ? sunPath : moonPath) + '"/></svg>';
            themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
        }

        themeToggle.addEventListener('click', function() {
            var next = currentTheme() === 'dark' ? 'light' : 'dark';
            document.documentElement.dataset.theme = next;
            try { localStorage.setItem('theme', next); } catch (e) {}
            paint();
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
            if (!document.documentElement.dataset.theme) paint();
        });

        paint();
    }

    var navLinks = document.querySelectorAll('.nav-links a');
    var sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        if (!sections.length) return;
        var current = '';
        sections.forEach(function(section) {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(function(link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
        var revealElements = document.querySelectorAll('.reveal');
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(function(el) { observer.observe(el); });
    } else {
        document.querySelectorAll('.reveal').forEach(function(el) {
            el.classList.add('visible');
        });
    }

    updateActiveNav();
})();
