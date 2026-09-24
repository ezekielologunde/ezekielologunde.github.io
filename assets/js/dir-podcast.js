/* Directory data and search for podcast.html (moved out of the page for the CSP). */
(function () {
    const podcasts = [
        {
            name: "The Dr. Zero Trust Podcast",
            description: "Dr. Chase Cunningham breaks down Zero Trust architecture and the future of cybersecurity strategy.",
            apple: "https://podcasts.apple.com/us/podcast/drzerotrust/id1570251081",
            spotify: "https://open.spotify.com/show/5YrSai2Q9UGATh8GXgzA5K",
            tags: ["Zero Trust", "Strategy"]
        },
        {
            name: "Threat Vector",
            description: "Palo Alto Networks' deep dive into real threats, smart defenses, and future trends with industry leaders.",
            apple: "https://podcasts.apple.com/us/podcast/threat-vector-by-palo-alto-networks/id1725324656",
            spotify: "https://open.spotify.com/show/3gvMUOv9QDQGFaA87fuSEz",
            tags: ["Palo Alto Networks", "Threat Intel"]
        },
        {
            name: "Data Security Decoded",
            description: "Actionable insights to reduce data security risk and improve resilience, featuring Rubrik Zero Labs.",
            apple: "https://podcasts.apple.com/us/podcast/data-security-decoded/id1738264274",
            spotify: "https://open.spotify.com/show/3bLXLVq9nSoj3xtrNh0Br5",
            tags: ["Data Security", "Rubrik"]
        },
        {
            name: "#CyberChats",
            description: "Educating all ages about personal data care and highlighting positive figures in cybersecurity.",
            apple: "https://podcasts.apple.com/us/podcast/cyberchats/id1671622288",
            spotify: "https://open.spotify.com/show/2ZMszup9Qr9P5AuvJiM5vu",
            tags: ["Education", "Awareness"]
        },
        {
            name: "Zero Trust Thirty",
            description: "Unique perspectives on the technologies shaping the world of Zero Trust security.",
            apple: "https://podcasts.apple.com/us/podcast/zero-trust-thirty/id1597779601",
            spotify: "https://open.spotify.com/show/0brWoMaIcBZiFmTQWNK62K",
            tags: ["Zero Trust", "Appgate"]
        },
        {
            name: "The FAIK Files",
            description: "Exploring the intersection of AI and humanity, specifically deepfakes and digital deception.",
            apple: "https://podcasts.apple.com/us/podcast/the-faik-files/id1771521321",
            spotify: "https://open.spotify.com/show/7CGEktxUQAbgwQaWB922Ip",
            tags: ["AI", "Deepfakes"]
        },
        {
            name: "Only Malware in the Building",
            description: "Solving monthly cyber mysteries with intelligence analysts and former FBI investigators.",
            apple: "https://podcasts.apple.com/us/podcast/only-malware-in-the-building/id1749644761",
            spotify: "https://open.spotify.com/show/6Lxwond2BICpOmtpL3i0kM",
            tags: ["Malware", "FBI", "Forensics"]
        },
        {
            name: "Unixcyber Guy",
            description: "Real-world insights into cybersecurity careers and industry experience.",
            apple: "https://podcasts.apple.com/au/podcast/unixguy-cyber-security-career/id1830928775",
            spotify: "https://open.spotify.com/show/676BEZwcsufFf620HdzbUo",
            tags: ["Career", "Unix"]
        },
        {
            name: "WT360: Market From All Angles",
            description: "Focusing on cybersecurity trends and the federal government market (GovCon).",
            apple: "https://podcasts.apple.com/us/podcast/wt-360-the-market-from-all-angles/id1449676413",
            spotify: "https://open.spotify.com/show/0oY3l5ApUzgdZKHYoct1rJ",
            tags: ["GovCon", "Federal IT"]
        },
        {
            name: "Tech Career Blueprint",
            description: "Roadmaps for moving from entry-level to senior positions in tech and cybersecurity.",
            apple: "https://podcasts.apple.com/us/podcast/tech-career-blueprint-podcast-presented-by-master-i/id1690081331",
            spotify: "https://open.spotify.com/show/7kaJodHquryFw5YDw0BShj",
            tags: ["Career Roadmap", "Certifications"]
        }
    ];

    const grid = document.getElementById('podcastGrid');
    const searchBox = document.getElementById('podcastSearch');
    const countEl = document.getElementById('podcastCount');

    function renderPodcasts(filter = "") {
        grid.innerHTML = '';

        const filtered = podcasts.filter(p =>
            p.name.toLowerCase().includes(filter.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
        );

        countEl.textContent = filtered.length + ' podcast' + (filtered.length === 1 ? '' : 's');

        if (!filtered.length) {
            grid.innerHTML = '<p class="eo-dir-empty">No podcasts match your search.</p>';
            return;
        }

        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'eo-card eo-pod-card';
            card.innerHTML = `
                <div>
                    <div class="eo-pod-card__tags">${p.tags.map(t => `<span class="eo-tag">${t}</span>`).join('')}</div>
                    <h3 class="eo-pod-card__name">${p.name}</h3>
                    <p class="eo-pod-card__desc">${p.description}</p>
                </div>
                <div class="eo-pod-card__links">
                    <a class="eo-link" href="${p.apple}" target="_blank" rel="noopener noreferrer">Apple Podcasts</a>
                    <a class="eo-link eo-link--primary" href="${p.spotify}" target="_blank" rel="noopener noreferrer">Spotify</a>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    searchBox.addEventListener('input', (e) => renderPodcasts(e.target.value));

    renderPodcasts();
})();
